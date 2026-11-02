// ───────────── EDIT ME ─────────────
export const CONFIG = {
  title: "The Museum of Us",
  subtitle: "A Monthsary Exhibition",
  startDate: "2025-09-03", // the day it all began (YYYY-MM-DD)
  letter:
    "To the one who makes my life feel like a masterpiece. I know how much you love museums, so I built this little one just for you, and I truly hope you like it. I’m sorry for leaving you hanging for two weeks, and for the days in between. I never wanted to add to your stress. But knowing you and being with you makes me want to risk it all for us. I hope you never get tired of me, and I’ll keep doing my best to show that I deserve your love. Here’s to 1 year and 2 months of love. Thank you for being the best partner and a blessing in disguise. Please let me earn your trust, and when we have a small misunderstanding, don’t push me away. I want to fix it with you before you sleep. I can’t wait to see you and be with you again in December. Please don’t be shy or hold back. I want to know even more about you, so let me love you.",
  signature: "— Kelvin",
};

// Put your song at: public/audio/paraluman.mp3
// Then set the chorus start/end (in seconds) so only the chorus loops.
export const AUDIO = {
  src: "/audio/paraluman.mp3",
  chorusStart: 58,
  chorusEnd: 88,
  volume: 0.55,
};

// Visitor looks
const hairBlack = "#1b1411";
const hairBrown = "#3a2519";

export const ROOMS = [
  {
    id: "I",
    name: "Room I",
    title: "Golden Hour",
    theme: "green",
    floor: "parquet",
    statement:
      "This is where we first met, and where I started growing fond of you. These two photos are from those first sunny, simple days together.",
    bays: [
      {
        art: {
          src: "/images/mirror.jpg",
          ratio: "portrait",
          title: "Mirror, Mirror",
          year: "2026",
          medium: "Mirror selfie",
          note: "Two smiles in one reflection. The happiest thing in the whole picture is us, because I’m always really happy when I’m with you.",
        },
        visitors: [
          { x: "22%", b: 6, coat: "#8a3b3b", pants: "#26262f", hair: hairBlack, skin: "#d9a982" },
          { x: "68%", b: 16, coat: "#d9c9a3", dress: true, longHair: true, hair: hairBrown, skin: "#e3b896", bag: "#7a4a2a" },
        ],
      },
      {
        art: {
          src: "/images/brick.jpg",
          ratio: "portrait",
          title: "Smiles",
          year: "2026",
          medium: "Close-up selfie",
          note: "Cheek to cheek, because you’re my forever chick.",
        },
        visitors: [
          { x: "34%", b: 4, coat: "#3f5f8a", pants: "#d8d2c4", hair: hairBlack, skin: "#d4a07a", hat: "#2c2c2c" },
          { x: "52%", b: 20, coat: "#b86a4a", dress: true, hair: "#150f0c", skin: "#e0b08a" },
          { x: "78%", b: 8, coat: "#2f6f5a", pants: "#23232c", hair: "#5a3a22", skin: "#cf9a74", longHair: true },
        ],
      },
    ],
    walkers: [
      { dir: "R", dur: 52, delay: -10, b: 8, coat: "#6d4c8f", pants: "#25252d", hair: hairBlack, skin: "#d9a982" },
      { dir: "L", dur: 64, delay: -36, b: 20, coat: "#c9a24b", dress: true, longHair: true, hair: hairBrown, skin: "#e3b896" },
    ],
  },
  {
    id: "II",
    name: "Room II",
    title: "The Photobooth Years",
    theme: "navy",
    floor: "marble",
    statement:
      "Behind a blue curtain, two strangers to the camera became partners in crime. Here hang the loudest, silliest and most tender frames in the collection.",
    bays: [
      {
        art: {
          src: "/images/embrace.jpg",
          ratio: "landscape",
          title: "The Embrace",
          year: "2026",
          medium: "ELYU Photobooth",
          note: "I hold you close and never want to let go, because my heart is completely yours.",
        },
        visitors: [
          { x: "26%", b: 6, coat: "#7a2e3b", pants: "#26262f", hair: hairBlack, skin: "#d9a982" },
          { x: "40%", b: 14, coat: "#e5dcc6", dress: true, longHair: true, hair: hairBrown, skin: "#e3b896", bag: "#3b3b3b" },
          { x: "78%", b: 4, coat: "#4a6a52", pants: "#c9c2b0", hair: "#2a1a10", skin: "#cc9770", hat: "#8a5a3a" },
        ],
      },
      {
        art: {
          src: "/images/rocknroll.jpg",
          ratio: "landscape",
          title: "Sign Language of Love",
          year: "2026",
          medium: "ELYU Photobooth",
          note: "Keep rocking my world, love. I’m entirely yours, for infinity and beyond.",
        },
        visitors: [
          { x: "20%", b: 10, coat: "#b8824a", dress: true, hair: "#150f0c", skin: "#dcae88" },
          { x: "58%", b: 4, coat: "#2b4a7a", pants: "#23232c", hair: hairBlack, skin: "#d4a07a" },
          { x: "70%", b: 18, coat: "#8a3b6a", pants: "#2a2a33", hair: hairBrown, skin: "#e0b08a", longHair: true, bag: "#e8d9a8" },
        ],
      },
    ],
    walkers: [
      { dir: "L", dur: 58, delay: -20, b: 10, coat: "#2f8a7a", pants: "#25252d", hair: hairBlack, skin: "#cf9a74", hat: "#222" },
      { dir: "R", dur: 70, delay: -46, b: 22, coat: "#a34a4a", dress: true, longHair: true, hair: hairBlack, skin: "#e3b896" },
    ],
  },
];

// People gathered outside the entrance
export const OUTSIDE = {
  standing: [
    { x: "10%", coat: "#8a3b3b", pants: "#26262f", hair: hairBlack, skin: "#d9a982" },
    { x: "24%", coat: "#d9c9a3", dress: true, longHair: true, hair: hairBrown, skin: "#e3b896", bag: "#7a4a2a" },
    { x: "74%", coat: "#3f5f8a", pants: "#d8d2c4", hair: hairBlack, skin: "#d4a07a", hat: "#2c2c2c" },
    { x: "84%", coat: "#b86a4a", dress: true, hair: "#150f0c", skin: "#e0b08a" },
  ],
  walkers: [
    { dir: "R", dur: 38, delay: -8, coat: "#6d4c8f", pants: "#25252d", hair: hairBlack, skin: "#d9a982" },
    { dir: "L", dur: 46, delay: -24, coat: "#2f8a7a", dress: true, longHair: true, hair: hairBrown, skin: "#e3b896" },
  ],
};
