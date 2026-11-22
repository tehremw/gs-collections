// Wrist-fit text is shown beside each size option (fixes Problem 1).
export const SIZES = [
  { label: "S", fits: "wrist 14–15.5 cm" },
  { label: "M", fits: "wrist 15.5–17 cm" },
  { label: "L", fits: "wrist 17–18.5 cm" },
];
export const ADJUSTABLE = [{ label: "Adjustable", fits: "wrist 14–19 cm" }];

export const bracelets = [
  { id: "gs-001", name: "Midnight Lapis", category: "Beaded", material: "Glass beads, stretch cord", price: 750, stock: 12, personalizable: false, color: "#1f3a6e", sizes: SIZES, description: "Deep blue glass beads with silver-tone spacers." },
  { id: "gs-002", name: "Rose Quartz Stretch", category: "Beaded", material: "Glass beads, stretch cord", price: 850, stock: 8, personalizable: false, color: "#d99ab0", sizes: SIZES, description: "Soft pink beads, light enough for all-day wear." },
  { id: "gs-003", name: "Sunset Seed Bead Cuff", category: "Beaded", material: "Seed beads, thread", price: 950, stock: 5, personalizable: false, color: "#e07a3f", sizes: SIZES, description: "Tiny beads in an orange-to-pink gradient." },
  { id: "gs-004", name: "Margalla Trail", category: "Woven", material: "Waxed cotton cord", price: 600, stock: 15, personalizable: false, color: "#5b6b3a", sizes: ADJUSTABLE, description: "Earthy green knotted cord with a sliding clasp." },
  { id: "gs-005", name: "Monsoon Knot", category: "Woven", material: "Cotton thread", price: 550, stock: 10, personalizable: false, color: "#4a6f8a", sizes: ADJUSTABLE, description: "Blue-grey thread in a flat knot pattern." },
  { id: "gs-006", name: "Chai Stripe Band", category: "Woven", material: "Cotton thread", price: 450, stock: 20, personalizable: false, color: "#a8714a", sizes: ADJUSTABLE, description: "Warm brown stripes, our lowest-priced piece." },
  { id: "gs-007", name: "Tiny Moon Charm", category: "Charm", material: "Stainless steel charm, waxed cord", price: 1100, stock: 6, personalizable: false, color: "#8e8e9a", sizes: SIZES, description: "A small crescent charm on a dark cord." },
  { id: "gs-008", name: "Initial Charm", category: "Charm", material: "Letter beads, stretch cord", price: 1350, stock: 7, personalizable: true, color: "#c9a227", sizes: SIZES, description: "Spell up to three initials in letter beads." },
  { id: "gs-009", name: "Evil Eye Charm", category: "Charm", material: "Glass charm, waxed cord", price: 900, stock: 0, personalizable: false, color: "#1d5fa8", sizes: SIZES, description: "Classic blue eye charm. Currently sold out." },
  { id: "gs-010", name: "Study Buddy Pair", category: "Gift Set", material: "Two matching woven bracelets", price: 1600, stock: 4, personalizable: false, color: "#7a5c8e", sizes: ADJUSTABLE, description: "Two matching bracelets for you and a friend." },
  { id: "gs-011", name: "Eid Gift Box", category: "Gift Set", material: "Three beaded bracelets, gift box", price: 2800, stock: 3, personalizable: false, color: "#2f7a5a", sizes: ADJUSTABLE, description: "Three coordinated bracelets in a gift box." },
  { id: "gs-012", name: "Convocation Set", category: "Gift Set", material: "Two beaded bracelets, card", price: 2400, stock: 0, personalizable: true, color: "#b8860b", sizes: ADJUSTABLE, description: "A graduation keepsake set. Currently sold out." },
];
