export const SIZES = [
  { label: "S", fits: "wrist 14–15.5 cm" },
  { label: "M", fits: "wrist 15.5–17 cm" },
  { label: "L", fits: "wrist 17–18.5 cm" },
];
export const ADJUSTABLE = [{ label: "Adjustable", fits: "wrist 14–19 cm (chain slider)" }];
export const NECKLACE = [{ label: "Adjustable", fits: "neck 36–44 cm (chain slider)" }];

const IMG = "/images/products/";
const photo = (file, alt) => ({ src: IMG + file, alt });
const NAME_RULE = { label: "Name on bracelet", max: 8 };

export const bracelets = [
  { id: "gs-001", name: "Black Crystal Trio", category: "Sets", material: "Crystal beads, gold-tone chain", price: 1800, stock: 5, personalize: null, sizes: ADJUSTABLE, description: "Three stacking bracelets joined by one adjustable chain.", images: [photo("black-3set-bracelet.jpg", "Three stacked black crystal bead bracelets with a gold chain and small black charms")] },
  { id: "gs-002", name: "Black Bead Charm Bracelet", category: "Beaded", material: "Glass beads, silver-tone charms", price: 900, stock: 12, personalize: null, sizes: ADJUSTABLE, description: "Dark glass beads with small silver charms.", images: [photo("black-bracelet.jpg", "Black and grey bead bracelet with silver charms beside pink roses")] },
  { id: "gs-003", name: "Sky Blue Crystal Trio", category: "Sets", material: "Crystal beads, gold-tone chain", price: 1700, stock: 6, personalize: null, sizes: ADJUSTABLE, description: "Light blue crystals in a stackable set of three.", images: [photo("blue-bracelet.jpg", "Three stacked sky-blue crystal bracelets joined by a gold chain with a blue charm")] },
  { id: "gs-004", name: "Blue Violet Daisy Bracelet", category: "Beaded", material: "Glass beads, gold-tone chain", price: 950, stock: 8, personalize: null, sizes: ADJUSTABLE, description: "Blue and violet beads finished with a daisy charm.", images: [photo("blue-purple-bracelet.jpg", "Blue and purple bead bracelet with cream beads and a blue daisy charm on a gold chain")] },
  { id: "gs-005", name: "Blue Violet Daisy Necklace", category: "Necklace", material: "Glass beads, gold-tone chain", price: 1300, stock: 3, personalize: null, sizes: NECKLACE, description: "The matching necklace for the Blue Violet Daisy bracelet.", images: [photo("blue-purple-necklace.jpg", "Blue and purple bead necklace with cream beads and a blue daisy pendant")] },
  { id: "gs-006", name: "Custom Name Bracelet (Black)", category: "Custom Name", material: "Glass beads, letter beads, stretch cord", price: 800, stock: 15, personalize: NAME_RULE, sizes: SIZES, description: "Black beads with your name in white letter beads.", images: [photo("custom-name-bracelet.jpg", "Black bead bracelet with white letter beads spelling DANIAL")] },
  { id: "gs-007", name: "Custom Name Bracelet (Pearl & Black)", category: "Custom Name", material: "Pearl beads, glass beads, letter beads", price: 1100, stock: 9, personalize: NAME_RULE, sizes: SIZES, description: "Pearl and black beads with your name spelled out.", images: [
    photo("custom-name-girls-bracelet.jpg", "Stack of pearl and black bead bracelets with letter beads spelling SAIRA and HONEY"),
    photo("saira.jpg", "Pearl and black bead bracelet with letter beads spelling SAIRA"),
    photo("honey.jpg", "Pearl and black bead bracelet with letter beads spelling HONEY"),
  ] },
  { id: "gs-008", name: "Pink Flower Crystal Bracelet", category: "Beaded", material: "Gemstone-chip beads, gold-tone chain", price: 1900, stock: 4, personalize: null, sizes: ADJUSTABLE, description: "Price is for one piece. Shown here as a stack and as a pair.", images: [
    photo("pyara-pink-flowers-wala-kara.jpg", "Three stacked peach and green gemstone-chip bangles with gold chain tassels on maroon fabric"),
    photo("flowers-wala-kara-duo.jpg", "Two handmade bangles of pale green and peach gemstone chips with gold chain tassels on maroon fabric"),
  ] },
  { id: "gs-009", name: "Friends Bracelet Trio", category: "Sets", material: "Glass beads, letter beads, stretch cord", price: 1600, stock: 6, personalize: null, sizes: SIZES, description: "Soft pink and white beads that spell FRIENDS.", images: [photo("friends-bracelet.jpg", "Three stacked pink and white bead bracelets with letter beads spelling FRIENDS")] },
  { id: "gs-010", name: "Maroon Crystal Bracelet", category: "Beaded", material: "Crystal beads, gold-tone chain", price: 1000, stock: 0, personalize: null, sizes: ADJUSTABLE, description: "Deep maroon crystals with gold tassels.", images: [photo("maroon-bracelet.jpg", "Maroon crystal bead bracelet with gold chain tassels")] },
  { id: "gs-011", name: "Pink Pearl Daisy Bracelet", category: "Beaded", material: "Pearl and stone beads, silver-tone chain", price: 950, stock: 8, personalize: null, sizes: ADJUSTABLE, description: "Pink stones and pearls with a flower charm.", images: [photo("pink-white-bracelet.jpg", "Pink, grey and pearl bead bracelet with a silver chain and flower charm")] },
  { id: "gs-013", name: "Ruby Red Crystal Trio", category: "Sets", material: "Crystal beads, gold-tone chain", price: 1700, stock: 7, personalize: null, sizes: ADJUSTABLE, description: "Rich red crystals in a stackable set of three.", images: [photo("red-bracelet.jpg", "Three stacked ruby-red crystal bracelets joined by a gold chain with a red charm")] },
  { id: "gs-014", name: "Red Gold Daisy Bracelet", category: "Beaded", material: "Glass beads, gold-tone chain", price: 1000, stock: 5, personalize: null, sizes: ADJUSTABLE, description: "Red and amber beads with a gold flower charm.", images: [photo("red-yellow-bracelet.jpg", "Red, amber and gold bead bracelet with a gold chain and red flower charm")] },
  { id: "gs-015", name: "Lime Sparkle Bracelet", category: "Beaded", material: "Crackle glass beads, gold-tone chain", price: 1100, stock: 9, personalize: null, sizes: ADJUSTABLE, description: "Bright crackle-glass beads that catch the light.", images: [photo("yellow-bracelet.jpg", "Yellow and green sparkle bead bracelet with gold chain tassels on red fabric")] },
  { id: "gs-016", name: "Lime Sparkle Necklace", category: "Necklace", material: "Crackle glass beads, gold-tone chain", price: 1400, stock: 4, personalize: null, sizes: NECKLACE, description: "A beaded necklace with a long gold chain drop.", images: [photo("lime-sparkle-necklace.jpg", "Yellow and green sparkle bead necklace with a long gold chain on red fabric")] },
  { id: "gs-017", name: "Red Gold Woven Cuff", category: "Beaded", material: "Seed beads, thread, clasp", price: 1200, stock: 6, personalize: null, sizes: SIZES, description: "A woven cuff in red and gold seed beads.", images: [photo("red-gold-bracelet.jpg", "Woven red and gold seed-bead cuff bracelet on red fabric")] },
  { id: "gs-018", name: "Yellow Green Woven Cuff", category: "Beaded", material: "Seed beads, thread, clasp", price: 1200, stock: 5, personalize: null, sizes: SIZES, description: "A woven cuff in gold and teal seed beads.", images: [photo("yellow-green-bracelet.jpg", "Woven gold and teal seed-bead cuff bracelet on dark red fabric")] },
  { id: "gs-019", name: "Custom Name Set", category: "Custom Name", material: "Crystal beads, letter beads, gold-tone chain, butterfly charm", price: 2400, stock: 6, personalize: NAME_RULE, sizes: SIZES, description: "Three crystal bracelets in your colour, one with your name in letter beads.",
    colors: [
      { label: "Blue", swatch: "#2f6fb0", images: [
        photo("custom-set-blue.jpg", "Three blue crystal bracelets laid out, the middle one with white letter beads spelling a name and a butterfly charm"),
        photo("custom-set-blue-2.jpg", "Stacked blue crystal bracelets with a name in letter beads and a gold chain butterfly charm"),
      ] },
      { label: "Maroon", swatch: "#7a1f3d", images: [
        photo("custom-set-maroon.jpg", "Three maroon crystal bracelets laid out, the middle one with white letter beads spelling a name and a butterfly charm"),
        photo("custom-set-maroon-2.jpg", "Stacked maroon crystal bracelets with a name in letter beads and gold chain charms"),
      ] },
      { label: "Pink", swatch: "#e9a0b8", images: [
        photo("custom-set-pink.jpg", "Three pink bracelets laid out, the middle one with white letter beads spelling a name and a butterfly charm"),
        photo("custom-set-pink-2.jpg", "Stacked pink crystal and rose quartz bracelets with a name in letter beads and a butterfly charm"),
      ] },
      { label: "Pink Purple", swatch: "#b27bc4", images: [
        photo("custom-set-pinkpurple.jpg", "Three pink and purple crystal bracelets laid out, the middle one with white letter beads spelling a name and a butterfly charm"),
        photo("custom-set-pinkpurple-2.jpg", "Stacked pink and purple crystal bracelets with a name in letter beads and a butterfly charm"),
      ] },
    ] },
];
