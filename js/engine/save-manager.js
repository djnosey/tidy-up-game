const STORAGE_KEY = 'tidyUp_save';
const BLOB_API = 'https://jsonblob.com/api/jsonBlob';

function emptySave() {
    return { version: 2, characters: {}, blobId: null };
}

function ensureCharacter(data, name) {
    if (!data.characters[name]) {
        data.characters[name] = { levels: {} };
    }
    return data.characters[name];
}

export class SaveManager {
    constructor() {
        this.data = this.loadLocal();
    }

    // --- Local persistence ---

    loadLocal() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                // Migrate v1 (flat levels) to v2 (per-character)
                if (parsed.version === 1 && parsed.levels) {
                    const migrated = emptySave();
                    migrated.blobId = parsed.blobId || null;
                    // Put old scores under "Unknown" so they aren't lost
                    migrated.characters['Unknown'] = { levels: parsed.levels };
                    return migrated;
                }
                return parsed;
            }
        } catch (e) {
            console.warn('SaveManager: bad localStorage data, resetting', e);
        }
        return emptySave();
    }

    saveLocal() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        } catch (e) {
            console.warn('SaveManager: localStorage write failed', e);
        }
    }

    // --- Level score (per character) ---

    /** Save a level result for a character (only if better than previous best) */
    saveLevel(characterName, levelIndex, collected, total) {
        const charData = ensureCharacter(this.data, characterName);
        const key = String(levelIndex);
        const pct = total > 0 ? Math.round((collected / total) * 100) : 0;
        const stars = pct >= 90 ? 3 : pct >= 50 ? 2 : 1;

        const prev = charData.levels[key];
        if (!prev || pct > prev.best) {
            charData.levels[key] = { collected, total, stars, best: pct };
        }

        this.saveLocal();
        this.syncToCloud();
    }

    /** Get saved data for a character's level, or null */
    getLevel(characterName, levelIndex) {
        const charData = this.data.characters[characterName];
        if (!charData) return null;
        return charData.levels[String(levelIndex)] || null;
    }

    /** Get list of completed level indices for a character */
    getCompletedLevels(characterName) {
        const charData = this.data.characters[characterName];
        if (!charData) return [];
        return Object.keys(charData.levels).map(Number).sort((a, b) => a - b);
    }

    /** Overall tidy % for a character across all 6 rooms (unplayed = 0%) */
    getOverallPercent(characterName) {
        const charData = this.data.characters[characterName];
        if (!charData) return 0;
        let total = 0;
        for (let i = 0; i < 6; i++) {
            const lv = charData.levels[String(i)];
            if (lv) total += lv.best;
        }
        return Math.round(total / 6);
    }

    /** Get names of all characters that have save data */
    getSavedCharacters() {
        return Object.keys(this.data.characters);
    }

    // --- Cloud sync (jsonblob.com) ---

    async syncToCloud() {
        const payload = { ...this.data };
        delete payload.blobId;

        try {
            if (this.data.blobId) {
                await fetch(`${BLOB_API}/${this.data.blobId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                const res = await fetch(BLOB_API, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                const location = res.headers.get('Location');
                if (location) {
                    this.data.blobId = location.split('/').pop();
                    this.saveLocal();
                }
            }
        } catch (e) {
            console.warn('SaveManager: cloud sync failed (offline?)', e);
        }
    }

    /** Load save from a cloud save code (blob ID), merging with local */
    async loadFromCode(code) {
        try {
            const res = await fetch(`${BLOB_API}/${code}`);
            if (!res.ok) return false;
            const remote = await res.json();
            if (remote.characters) {
                for (const [charName, charData] of Object.entries(remote.characters)) {
                    const local = ensureCharacter(this.data, charName);
                    for (const [key, val] of Object.entries(charData.levels || {})) {
                        if (!local.levels[key] || val.best > local.levels[key].best) {
                            local.levels[key] = val;
                        }
                    }
                }
            }
            this.data.blobId = code;
            this.saveLocal();
            return true;
        } catch (e) {
            console.warn('SaveManager: failed to load save code', e);
            return false;
        }
    }

    getSaveCode() {
        return this.data.blobId || null;
    }

    clearAll() {
        this.data = emptySave();
        this.saveLocal();
    }
}
