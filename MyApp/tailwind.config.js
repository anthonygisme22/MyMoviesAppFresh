module.exports = {
  darkMode: 'class',        // ← enable class strategy
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
              /* ─── Couch Potato brand colours ─────────────────────────────── */
              colors: {
              spud: "#9b763b",   // primary brown
              "spud-dark": "#463119",   // deeper brown
              couch: "#d79240",   // sofa orange (primary accent)
              stripe: "#ab5318",   // popcorn‑stripe (secondary accent)
              butter: "#eecf9f",   // light tan / card bg
              midnight: "#506178",   // blue‑grey (links, subtle ui)
                    }
      }
    }
  },
  plugins: []
};
