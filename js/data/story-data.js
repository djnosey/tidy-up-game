// ─── Story Data ────────────────────────────────────────────────────
// Narrative constants for transitions: opening story, level intros, boss intros.
// Pure data — no rendering logic.

export const OPENING_STORY = [
    { speaker: null, text: "The family has just arrived home from a week in Barcelona..." },
    { speaker: null, text: "Steve unlocks the front door. A wave of dust rolls out." },
    { speaker: 'Hara', text: "¡Dios mío! What happened to our house?!" },
    { speaker: 'Steve', text: "I... may have forgotten to close the windows before we left." },
    { speaker: 'Hara', text: "There are ANTS in the kitchen. MOTHS in the wardrobe. Is that a PIGEON on the terrace?!" },
    { speaker: 'Derek', text: "Cool! My toys are everywhere!" },
    { speaker: 'Juno', text: "There's something growing in the fridge..." },
    { speaker: 'Hara', text: "Nobody is sleeping until this house is SPOTLESS. ¡Vamos!" },
];

export const LEVEL_INTROS = [
    {
        room: 'THE LIVING ROOM',
        color: '#D4C4A8',
        floorColor: '#8B7355',
        speaker: 'Hara',
        line: "Start with the living room! I can't even see the sofa under all this mess!",
        detail: "Cushions everywhere, remote controls lost, and is that Roomba... still running?",
    },
    {
        room: 'THE KITCHEN',
        color: '#F0E8D8',
        floorColor: '#E8E0D0',
        speaker: 'Hara',
        line: "The kitchen next! Something in the fridge is making noises!",
        detail: "Dirty plates stacked high, ants marching across the counter, and a suspicious green glow from the fridge...",
    },
    {
        room: 'THE BATHROOM',
        color: '#E8F0F0',
        floorColor: '#B8D0D8',
        speaker: 'Hara',
        line: "Now the bathroom! I'm afraid to look behind the shower curtain...",
        detail: "Wet towels on the floor, rubber ducks multiplying, and the washing machine sounds... angry.",
    },
    {
        room: "THE KIDS' ROOM",
        color: '#F5E8D0',
        floorColor: '#C4A882',
        speaker: 'Hara',
        line: "Derek! Juno! Your room is a WAR ZONE! Fix it — NOW!",
        detail: "LEGO landmines, rogue toy soldiers, and the toy box is overflowing with attitude.",
    },
    {
        room: "THE PARENTS' ROOM",
        color: '#E8E0D8',
        floorColor: '#A0886B',
        speaker: 'Hara',
        line: "Even OUR bedroom is a disaster! How did moths get into the wardrobe?!",
        detail: "Laundry mountains, alarm clocks with a mind of their own, and something shifting inside the wardrobe...",
    },
    {
        room: 'THE TERRACE',
        color: '#87CEEB',
        floorColor: '#C4A070',
        speaker: 'Hara',
        line: "Last room — the terrace! Watch out for that barbecue, Steve left it uncleaned ALL SUMMER!",
        detail: "Wasps everywhere, pigeons nesting in the plants, and the BBQ is... smoking on its own?!",
    },
];

export const BOSS_INTROS = [
    {
        name: 'MEGA ROOMBA',
        subtitle: 'The Dust Devil',
        color: '#555555',
        glowColor: '#00FF00',
        text: "You've tidied most of the living room — but the Roomba has gone ROGUE. It's sucking up everything in sight, including the stuff you just cleaned!",
        tip: "Shoot it 3 times to overload its motor!",
        bossConfig: { label: 'MEGA ROOMBA', color: '#555555', width: 96, height: 50 },
    },
    {
        name: 'FRIDGE BEAST',
        subtitle: 'The Forgotten Leftovers',
        color: '#4477AA',
        glowColor: '#00FFAA',
        text: "The kitchen's looking better... but nobody's opened this fridge since before the holiday. Whatever's inside has evolved. It has DOORS now. And it's not happy about the cleaning.",
        tip: "Shoot the doors open, then stomp!",
        bossConfig: { label: 'FRIDGE BEAST', color: '#4477AA', width: 130, height: 90 },
    },
    {
        name: 'WASHING MACHINE',
        subtitle: 'The Spin Cycle of Doom',
        color: '#AAAACC',
        glowColor: '#4488FF',
        text: "The bathroom's nearly done — but someone overloaded the washing machine with every sock in the house. It's shaking, rattling, and flooding the floor. And it's looking at you funny.",
        tip: "Wait for the drain cycle!",
        bossConfig: { label: 'WASHING MACHINE', color: '#AAAACC', width: 120, height: 85 },
    },
    {
        name: 'TOY BOX TERROR',
        subtitle: 'Playtime Is Over',
        color: '#CD853F',
        glowColor: '#FFAA00',
        text: "The room's almost clean... but the Toy Box has had ENOUGH. Years of being stuffed full have given it sentience — and an army. It's calling in reinforcements from under the bed.",
        tip: "Shoot into the open lid, or stomp its minions!",
        bossConfig: { label: 'TOY BOX TERROR', color: '#CD853F', width: 100, height: 50 },
    },
    {
        name: 'WARDROBE MONSTER',
        subtitle: 'Fashion Nightmare',
        color: '#654321',
        glowColor: '#FF4444',
        text: "The bedroom's looking great — but the wardrobe has been sealed shut for months. Something inside has been feeding on forgotten scarves and odd socks. It TELEPORTS. It has TEETH.",
        tip: "Catch it during re-opening!",
        bossConfig: { label: 'WARDROBE MONSTER', color: '#654321', width: 100, height: 60 },
    },
    {
        name: 'BBQ DRAGON',
        subtitle: 'The Final Flame',
        color: '#8B2500',
        glowColor: '#FF6600',
        text: "The terrace is nearly spotless — but Steve's beloved barbecue hasn't been cleaned since last summer. Grease, coal, and rage have fused together into something ancient. Something that breathes FIRE.",
        tip: "Cool its heat counter with your shots!",
        bossConfig: { label: 'BBQ DRAGON', color: '#8B2500', width: 160, height: 80 },
    },
];
