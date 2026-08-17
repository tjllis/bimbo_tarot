export interface CardData {
  id: number;
  /** Roman numeral shown on the card face — the Fool keeps its traditional 0. */
  num: string;
  name: string;
  emoji: string;
  keywords: string[];
  general: string;
  situationship: string;
  currentEra: string;
  villainArc: string;
}

/** The three-card spread, in pick order. */
export const POSITIONS = [
  {
    key: "situationship" as const,
    label: "last situationship",
    share: "Last situationship",
  },
  { key: "currentEra" as const, label: "current era", share: "Current era" },
  { key: "villainArc" as const, label: "villain arc", share: "Villain Arc" },
];

export const CARDS: CardData[] = [
  {
    id: 0,
    num: "0",
    name: "The Main Character",
    emoji: "🌸",
    keywords: ["new era", "fearless", "chaotic good"],
    general:
      "Omg bestie, you are literally entering your main character era!!! The universe is obsessed with you rn. Grab your bag and slay!",
    situationship:
      "That situationship? You walked in with zero baggage and full confidence. Honestly, such a correct move, babe!",
    currentEra:
      "You are in your completely unbothered era! No overthinking, just living. This is your official glow-up origin story!",
    villainArc:
      "New number, new hair, strict boundaries. Nobody saw this drama coming, and honestly? That is the whole point, purr 💋",
  },
  {
    id: 1,
    num: "I",
    name: "She Who Manifests",
    emoji: "✨",
    keywords: ["manifesting", "that girl", "it's giving power"],
    general:
      "Everything you need is already in your Sephora bag, bestie. The only thing between you and your dream life is you actually doing it!",
    situationship:
      "You literally manifested this person into your life and now you're surprised they actually showed up??? Shook!",
    currentEra:
      "This is your 'that girl' era. Pilates, green juice, vision boards. You are building this luxury life with your own acrylic nails 💅",
    villainArc:
      "No more basic reactions—you are pure strategy now. Every single move is intentional. They'll only get it when it's too late.",
  },
  {
    id: 2,
    num: "II",
    name: "She Knows Things",
    emoji: "🔮",
    keywords: ["intuition", "mysterious", "she's onto you"],
    general:
      "Your intuition has been screaming for three weeks and you keep muting it! Unmute her. You know the truth. This is your sign!!!",
    situationship:
      "You knew the vibe from the moment they took 11 hours to text back. You knew and you stayed. Why do that to your skin?",
    currentEra:
      "Quiet girl era. You're not posting a single thing. Everyone thinks you're mysterious, but you're literally just tired, babes.",
    villainArc:
      "You see through everyone now. No need to scream it out loud—just smile iconically and let them think they're slick.",
  },
  {
    id: 3,
    num: "III",
    name: "That Luxurious Girl",
    emoji: "👸",
    keywords: ["abundance", "soft life", "she's eating well"],
    general:
      "The soft life is not a goal, it is a strict REQUIREMENT! You deserve the expensive perfume and the silk pillowcase, period.",
    situationship:
      "This connection is so warm and addictive, but call your besties! You've been a little absent from the main group chat.",
    currentEra:
      "Skin is clear, plants are alive, luxury dinners are served. Quickly document this aesthetic for the gram!!!",
    villainArc:
      "You are taking up space, eating well, and thriving loudly! Your pure success is the ultimate revenge, babe.",
  },
  {
    id: 4,
    num: "IV",
    name: "The CEO Era",
    emoji: "💅",
    keywords: [
      "boss behavior",
      "structure",
      "main character with a spreadsheet",
    ],
    general:
      "Make the budget, set the schedule, send the invoice! You are the CEO of your life, and last quarter was giving total flop.",
    situationship:
      "Someone in this dynamic has all the power and someone doesn't. Figure out if you're the boss or just an assistant.",
    currentEra:
      "Structure era! Early bedtimes, flawless Notes app, actually replying to emails. Total business-bitch slay!!!",
    villainArc:
      "Stop asking for permission and waiting to be chosen. You already chose yourself, and it's iconic.",
  },
  {
    id: 5,
    num: "V",
    name: "The Group Chat Oracle",
    emoji: "📱",
    keywords: ["tradition", "the girlies said so", "ask your friends"],
    general:
      "The girlies are trying to save your mental health! There is so much wisdom in your community that you're ignoring.",
    situationship:
      "Your friends have serious thoughts about this person. They sent the 'are you sure' warning. Listen to the group chat!",
    currentEra:
      "A season of pure sisterhood. Finding your real people, your true besties, and your ultimate dream circle.",
    villainArc:
      "You are literally leaving the toxic group chat. Done playing by rules that were never meant for queens 👑",
  },
  {
    id: 6,
    num: "VI",
    name: "The Situationship Card",
    emoji: "💋",
    keywords: ["choose", "it's complicated", "you know what you want"],
    general:
      "A choice is being made right now whether you like it or not. The universe needs you to pick a lane and stay in it.",
    situationship:
      "It's giving 'we aren't dating but don't talk to anyone else.' This talking stage has been going on for 4 months, trash!",
    currentEra:
      "Self-love era mixed with cute date eras. Do both with full commitment and zero overthinking!",
    villainArc:
      "I choose myself. Every single time. In every scenario. Other people's hurt feelings are not my business, purr 💋",
  },
  {
    id: 7,
    num: "VII",
    name: "She's Going Places",
    emoji: "🏎️",
    keywords: ["momentum", "main character driving away", "don't stop"],
    general:
      "You have insane momentum right now, which is so rare! Don't slow down to explain yourself. Music up and GO!",
    situationship:
      "Check the speedometer, babe. Make sure you and this crush are literally in the same car, not him hitchhiking on you.",
    currentEra:
      "Something is taking off! A project, a move, or a new version of you. Step on the gas with your prettiest shoes!",
    villainArc:
      "You just left. You moved on. They never believed you actually would, and then you did a total slay!",
  },
  {
    id: 8,
    num: "VIII",
    name: "Soft But Built Different",
    emoji: "🌺",
    keywords: ["inner strength", "she's gentle but try her", "quiet power"],
    general:
      "Your power comes from being so deeply secure that no drama can touch you. That is the most expensive flex.",
    situationship:
      "You have been way more patient with this person than they deserved. The limit is reached, show your boundaries, gurl!",
    currentEra:
      "Soft girl with a steel spine. You are sweet, warm, and completely unbothered by people trying to manipulate you.",
    villainArc:
      "They mistook your kindness for weakness? How embarrassing for them! Now they find out who the real queen is.",
  },
  {
    id: 9,
    num: "IX",
    name: "In Her Healing Era",
    emoji: "🕯️",
    keywords: ["rest era", "not posting", "doing the work"],
    general:
      "You're going inward. It's not a flop era, it's a healing era! Looks quiet outside, but you're doing important soul-spa work.",
    situationship:
      "You need to be completely alone right now. Not as a punishment, but as a luxury mental treatment, pupsi.",
    currentEra:
      "Quiet era. Reading, resting, going to therapy. This foundation makes your next chapter super-luxury!",
    villainArc:
      "You vanished and came back a total icon. Nobody recognized this new queen. The plan worked perfectly! 🧸",
  },
  {
    id: 10,
    num: "X",
    name: "The Plot Twist",
    emoji: "🎡",
    keywords: ["plot twist incoming", "fate said so", "buckle up"],
    general:
      "Something is changing and you did not see it coming! The wheel is spinning, get excited instead of scared!!!",
    situationship:
      "The dynamic is shifting fast, and it's totally out of your control. Karma is a real bitch, babe.",
    currentEra:
      "Things are moving faster than you can update your manicure. It's fine, we'll process it later over champagne!",
    villainArc:
      "Pure karmic drama! You just have to sit in the front row and look absolutely stunning while everything burns down.",
  },
  {
    id: 11,
    num: "XI",
    name: "She's Keeping Receipts",
    emoji: "⚖️",
    keywords: ["receipts ready", "accountability", "the truth will come out"],
    general:
      "Receipts are being reviewed and the truth is coming out! Make sure your actions match your high-status vibe.",
    situationship:
      "This unbalanced mess is getting corrected. Either you have the honest chat, or the universe crashes it for you.",
    currentEra:
      "Accountability era. Taking responsibility for what is yours and leaving everyone else's trash at the door.",
    villainArc:
      "I HAVE ALL THE SCREENSHOTS. You just show up with the facts and watch them have a minor panic attack.",
  },
  {
    id: 12,
    num: "XII",
    name: "Girl Just Wait",
    emoji: "⏸️",
    keywords: ["pause", "not yet bestie", "divine timing"],
    general:
      "This is not your moment to rush. I know it's annoying, but the timing is off. Staying cute on pause is a power move!",
    situationship:
      "DO NOT TEXT HIM. Put the phone in your bag. Go get your beauty sleep, your skin is more important than this trash text!",
    currentEra:
      "Behind the scenes, the universe is rearranging the entire world for your comfort. Trust the wait, sweetie.",
    villainArc:
      "You let them wonder. Your total silence was louder than any dramatic scene you could have made. Absolute slay!",
  },
  {
    id: 13,
    num: "XIII",
    name: "The Glow Up Card",
    emoji: "🦋",
    keywords: ["era ending", "transformation", "she's not coming back"],
    general:
      "What is dying needed to die! You cannot drag a tired, sad version of yourself into a new luxury chapter. Let her go!",
    situationship:
      "This chapter is closing. Cry about it, smudge your mascara (esthetically!), but staying there is a total no-no.",
    currentEra:
      "You are transforming in real-time. Who is this hot new girl? Honestly, she sounds absolutely incredible!!!",
    villainArc:
      "You let the old you die—the one who tolerated bad vibes and stayed quiet. A queen rules here now.",
  },
  {
    id: 14,
    num: "XIV",
    name: "Chill Out Bestie",
    emoji: "🫧",
    keywords: ["balance", "not too much", "maybe drink some water"],
    general:
      "You are doing way too much and the universe wants you to do less. Drink some water and go to the spa, pupsi.",
    situationship:
      "This connection thrives when you have zero thought moments about it. Relax, everything is going to be chic.",
    currentEra:
      "Balance era! A sustainable pace that lets you enjoy shopping while you casually build your empire.",
    villainArc:
      "Calculated behavior. You know exactly how much energy to give, when to be cold, and when to make your final move.",
  },
  {
    id: 15,
    num: "XV",
    name: "The Toxic Trait Card",
    emoji: "🖤",
    keywords: ["toxic behavior", "she knows it's bad", "addicted to the chaos"],
    general:
      "You know exactly what this trash is. You know it's bad for your skin, but you do it anyway. The door is open, leave!",
    situationship:
      "The toxic situationship you KNOW is a red flag, yet you're STILL there. Block his number forever, babe.",
    currentEra:
      "What bad patterns are you repeating? Name it and smash it to pieces with your long acrylic nails!",
    villainArc:
      "Yes, you are aware of your toxic traits and you play with them. You see the pattern and you disrupt it, iconic!",
  },
  {
    id: 16,
    num: "XVI",
    name: "The Flop Era (Not Optional)",
    emoji: "💥",
    keywords: [
      "everything falling apart",
      "plot twist",
      "the foundation was wrong anyway",
    ],
    general:
      "Everything is falling apart? Good, the foundation was cheap anyway. The universe is clearing the room for better luxury!",
    situationship:
      "An absolute explosion is coming to this relationship. Whatever was hidden is coming out, thank god!!!",
    currentEra:
      "Your official flop era has arrived, and it's mandatory. This is the breakdown right before the iconic breakthrough!",
    villainArc:
      "I burned it down myself before they could even think. I'm not sitting in the rubble, I'm standing next to it looking cute 💅",
  },
  {
    id: 17,
    num: "XVII",
    name: "Healing Era (For Real)",
    emoji: "⭐",
    keywords: ["hope", "she's healing", "things are getting better"],
    general:
      "Things are literally getting better! The hard drama is behind you, nothing but soft, warm, expensive vibes ahead.",
    situationship:
      "There is real hope here! Someone is actually showing up for you. Allow yourself to believe in this luxury match.",
    currentEra:
      "Your heart is lighter, you are lighter! You are finally remembering what an absolute icon you were before this mess.",
    villainArc:
      "You healed and became dangerous. This total self-knowledge is your greatest weapon against basic boys.",
  },
  {
    id: 18,
    num: "XVIII",
    name: "3AM Thoughts",
    emoji: "🌙",
    keywords: ["anxiety", "things are not as they seem", "maybe sleep on it"],
    general:
      "Your brain is inventing the worst fake scenarios at 3 AM. It's all a lie! Drink some chamomile tea and sleep, babe!",
    situationship:
      "You don't have the full picture. What is a real fact versus what did you completely make up in your pretty head?",
    currentEra:
      "A murky, blurry era. Do not trust a single thought that comes into your mind after midnight, it's a scam!",
    villainArc:
      "You gave absolutely nothing away. They have no idea what you're thinking, and the uncertainty is literally killing them.",
  },
  {
    id: 19,
    num: "XIX",
    name: "Hot Girl Era",
    emoji: "☀️",
    keywords: ["thriving", "main character summer", "she's eating"],
    general:
      "This is your HOT GIRL era and it is fully activated!!! You are exactly where you belong and it feels heavenly!",
    situationship:
      "They make you feel like an absolute queen. This might be the luxury match. No self-sabotage allowed!",
    currentEra:
      "Everything is clicking: the job, the friends, the skin, the aesthetic. Post it all, you earned this flex!",
    villainArc:
      "You won and everyone can see it. You are visibly, undeniably, totally happy. That IS the ultimate villain arc!",
  },
  {
    id: 20,
    num: "XX",
    name: "The Glow Up Reckoning",
    emoji: "📣",
    keywords: [
      "awakening",
      "she's different now",
      "the call is coming from inside",
    ],
    general:
      "Your inner self is screaming that it's time to level up to pure luxury. The old story simply does not match your vibe anymore!!!",
    situationship:
      "You finally see this person without your Dior rose-colored glasses. Clear vision. Now dump this trash.",
    currentEra:
      "Awakening era. Seeing everything differently. This clarity is a gift, even if it makes your pretty head spin sometimes.",
    villainArc:
      "You finally listened to myself. You woke up, put on your lip gloss, and changed the world to fit you. Iconic!",
  },
  {
    id: 21,
    num: "XXI",
    name: "She's That Girl",
    emoji: "🌍",
    keywords: ["completion", "she made it", "the era is complete"],
    general:
      "You did it, bestie! This major chapter is complete. Praise yourself, buy a diamond, and don't rush into the next goal yet!",
    situationship:
      "Everything has come full circle. You have all the answers and all the receipts in your bag. The puzzle is complete.",
    currentEra:
      "Everything you planted is finally blooming! Your hard work on yourself brought gorgeous results. Fully deserved, purr 💋",
    villainArc:
      "Your arc is finished. You became exactly the expensive bitch you wanted to be. And she is magnificent! ✨",
  },
];
