import type { Drop, Product, JourneyStop, JournalEntry } from "./types";

// ---------------------------------------------------------------------------
// DROPS — four capsules, one road from the oasis to the city.
// ---------------------------------------------------------------------------
export const DROPS: Drop[] = [
  {
    code: "GHBAR",
    arabic: "غبار",
    meaning: { en: "Dust", ar: "غبار" },
    line: {
      en: "The color of the road before rain.",
      ar: "لون الطريق قبل ما تنزل الشتا.",
    },
    body: {
      en: "The origin capsule. Sand-washed heavyweight cotton, pigment-dyed so every piece fades like a desert afternoon. The base layer of the whole world.",
      ar: "الكبسولة الأم. قطن ثقيل مغسول بالرمل، مصبوغ بالبيڨمون باش كل قطعة تبهت كيف عشيّة في الصحرا. هي الأساس متاع العالَم الكل.",
    },
    status: { en: "Open stock", ar: "متوفّر" },
    color: "#c9a06b",
    ink: "#241a10",
  },
  {
    code: "NOOR",
    arabic: "نور",
    meaning: { en: "Light", ar: "نور" },
    line: {
      en: "Catches headlights like a date catches the last sun.",
      ar: "تقبض ضو الكيّان كيف ما تقبض الدڨلة آخر شمس.",
    },
    body: {
      en: "After dark. Reflective hits and glow-line piping that ignite under any light. Built for the walk home when the alleys go black.",
      ar: "بعد ما يضلم. تفاصيل عاكسة وخيوط تشعّل تحت أي ضو. متصنوعة لمشية الرجوع للدار وقت تولّي الزنانق كحلة.",
    },
    status: { en: "Drops at maghreb", ar: "يطلع في المغرب" },
    color: "#e8a33d",
    ink: "#1a1206",
  },
  {
    code: "DERB",
    arabic: "درب",
    meaning: { en: "The Alley", ar: "الدرب" },
    line: {
      en: "Cut for walls a meter apart.",
      ar: "مقصوص لحيوط بينهم متر.",
    },
    body: {
      en: "City fits in medina blue and concrete grey. Boxy, layered, made to move sideways through the old town without catching a corner.",
      ar: "لبسة مدينة بأزرق المدينة ورمادي الإسمنت. واسعة، طبقات، متصنوعة باش تتحرّك بيها في المدينة العتيقة بلا ما تتعلّق في ركن.",
    },
    status: { en: "Open stock", ar: "متوفّر" },
    color: "#3f6fa3",
    ink: "#f1f4f8",
  },
  {
    code: "OASIS",
    arabic: "واحة",
    meaning: { en: "Oasis", ar: "واحة" },
    line: {
      en: "Released only when the harvest comes in.",
      ar: "ما يطلعش كان وقت تجي الغلّة.",
    },
    body: {
      en: "The rare one. Palm-green jacquard threaded with real gold yarn, numbered to ninety-nine. Made once a year, when the dates ripen.",
      ar: "النادرة. جاكار أخضر نخلة مخيّط بخيط ذهب حقيقي، منمّر لتسعة وتسعين. يتصنع مرّة في العام، وقت تنضج الدڨلة.",
    },
    status: { en: "99 pieces / year", ar: "٩٩ قطعة / عام" },
    color: "#2f5d4a",
    ink: "#eef3ec",
  },
];

// ---------------------------------------------------------------------------
// PRODUCTS — a real, specified catalog. Prices in Tunisian Dinar (TND).
// ---------------------------------------------------------------------------
export const PRODUCTS: Product[] = [
  {
    id: "ghbar-hoodie",
    drop: "GHBAR",
    name: { en: "Ghbar Heavyweight Hoodie", ar: "كبّوط غبار ثقيل" },
    spec: {
      en: "420 GSM brushed-back loopwheel cotton · sand pigment wash · boxy drop-shoulder",
      ar: "قطن ٤٢٠ ڨرام مفروش · غسيل رمل بالبيڨمون · قَصّة واسعة بكتف نازل",
    },
    priceTND: 219,
    sizes: ["S", "M", "L", "XL", "XXL"],
    silhouette: "hoodie",
  },
  {
    id: "ghbar-cargo",
    drop: "GHBAR",
    name: { en: "Ghbar Eight-Pocket Cargo", ar: "كارڨو غبار بثمن جيوب" },
    spec: {
      en: "12 oz cotton ripstop · eight bellow pockets · adjustable hem · the road color",
      ar: "ريبستوب قطن ١٢ أونصة · ثمن جيوب · أسفل قابل للضبط · لون الطريق",
    },
    priceTND: 189,
    sizes: ["28", "30", "32", "34", "36"],
    silhouette: "cargo",
  },
  {
    id: "walker-tee",
    drop: "GHBAR",
    name: { en: "The Walker Tee", ar: "تيشيرت السّايْر" },
    spec: {
      en: "240 GSM combed ringspun · oversized · full back graphic of السّايْر",
      ar: "قطن مسرّح ٢٤٠ ڨرام · أوفرسايز · ڨرافيك كامل للسّايْر في الضهر",
    },
    priceTND: 99,
    sizes: ["S", "M", "L", "XL"],
    silhouette: "tee",
  },
  {
    id: "noor-reflective-tee",
    drop: "NOOR",
    name: { en: "Noor Reflective Tee", ar: "تيشيرت نور عاكس" },
    spec: {
      en: "240 GSM · 3M-grade reflective lantern print · glows white under light",
      ar: "٢٤٠ ڨرام · طباعة عاكسة درجة 3M للفانوس · تشعّل أبيض تحت الضو",
    },
    priceTND: 109,
    sizes: ["S", "M", "L", "XL"],
    silhouette: "tee",
  },
  {
    id: "noor-windbreaker",
    drop: "NOOR",
    name: { en: "Noor Packable Windbreaker", ar: "وندبريكر نور قابل للطيّ" },
    spec: {
      en: "Ripstop nylon · glow-line piping · packs into its own chest pocket",
      ar: "نايلون ريبستوب · خيوط تشعّل · يتطوى في جيب صدره",
    },
    priceTND: 249,
    sizes: ["S", "M", "L", "XL"],
    silhouette: "windbreaker",
  },
  {
    id: "derb-work-jacket",
    drop: "DERB",
    name: { en: "Derb Chore Jacket", ar: "ڤيستة درب" },
    spec: {
      en: "Medina-blue 10 oz canvas · boxy chore cut · triple-needle seams · woven Degla tab",
      ar: "كانفا أزرق المدينة ١٠ أونصة · قصّة شور واسعة · خياطة تلاث إبر · علامة دڨلة منسوجة",
    },
    priceTND: 269,
    sizes: ["S", "M", "L", "XL"],
    silhouette: "jacket",
  },
  {
    id: "derb-beanie",
    drop: "DERB",
    name: { en: "Derb Ribbed Beanie", ar: "بونيّة درب مضلّعة" },
    spec: {
      en: "Fine-rib merino blend · fold cuff · woven Degla tab",
      ar: "ميرينو مضلّع رفيع · حافة مطوية · علامة دڨلة منسوجة",
    },
    priceTND: 59,
    sizes: ["One size"],
    silhouette: "beanie",
  },
  {
    id: "oasis-knit",
    drop: "OASIS",
    name: { en: "Oasis Gold-Thread Knit", ar: "تريكو واحة بخيط الذهب" },
    spec: {
      en: "Palm-green jacquard · real gold-wrapped yarn · individually numbered",
      ar: "جاكار أخضر نخلة · خيط ملفوف بالذهب · منمّر فردياً",
    },
    priceTND: 329,
    sizes: ["S", "M", "L", "XL"],
    edition: "/ 99",
    silhouette: "knit",
  },
];

// ---------------------------------------------------------------------------
// JOURNEY — the Walker's road, south to north.
// ---------------------------------------------------------------------------
export const JOURNEY: JourneyStop[] = [
  {
    city: { en: "Tozeur", ar: "توزر" },
    x: 16,
    y: 86,
    hour: "18:42",
    note: { en: "The oasis. The lantern is lit.", ar: "الواحة. الفانوس تشعّل." },
  },
  {
    city: { en: "Gabès", ar: "قابس" },
    x: 40,
    y: 70,
    hour: "22:10",
    note: { en: "The sea on the left, the desert behind.", ar: "البحر على اليسار، الصحرا ورا." },
  },
  {
    city: { en: "Kairouan", ar: "القيروان" },
    x: 58,
    y: 47,
    hour: "03:30",
    note: { en: "Old walls. He rests against the great mosque.", ar: "حيوط قديمة. يرتاح على الجامع الكبير." },
  },
  {
    city: { en: "Tunis", ar: "تونس" },
    x: 74,
    y: 18,
    hour: "06:15",
    note: { en: "The medina wakes. The flame has held.", ar: "المدينة تفيق. النار صمدت." },
  },
];

// ---------------------------------------------------------------------------
// JOURNAL — short lore dispatches.
// ---------------------------------------------------------------------------
export const JOURNAL: JournalEntry[] = [
  {
    index: "001",
    title: { en: "Maghreb in Tozeur", ar: "مغرب في توزر" },
    place: { en: "The oasis · 18:42", ar: "الواحة · ١٨:٤٢" },
    body: {
      en: "The sun does not set here so much as surrender. The palms go from green to brass to black. He ties the hood, lifts the lantern, and the first date catches fire without burning.",
      ar: "الشمس ما تغيبش هوني، تستسلم. النخيل يولّي من أخضر لنحاسي لكحل. يشدّ الكبّوط، يرفع الفانوس، وأول دڨلة تشعّل بلا ما تحرق.",
    },
  },
  {
    index: "002",
    title: { en: "The Salt Road", ar: "طريق الملح" },
    place: { en: "Chott el Djerid · 23:55", ar: "شط الجريد · ٢٣:٥٥" },
    body: {
      en: "He crosses the dry lake where the ground cracks into a thousand white tiles. They say a lantern crossing the chott looks, from far, like a single moving star. Nobody walks it at night. He does.",
      ar: "يقطع البحيرة الجافة فين الأرض تتشقّق لألف قرميدة بيضة. يقولوا فانوس يقطع الشط، من بعيد، يبان كيف نجمة وحدة تتحرّك. حدّ ما يقطعهاش في الليل. هو يقطعها.",
    },
  },
  {
    index: "003",
    title: { en: "Into the Medina", ar: "للمدينة العتيقة" },
    place: { en: "Bab Bhar · 06:15", ar: "باب بحر · ٠٦:١٥" },
    body: {
      en: "The alleys are a meter wide and full of yesterday. He turns his shoulders to pass. By the time the bakers light their ovens, the lantern is just warmth in his pocket — and the light is on everyone he passed.",
      ar: "الزنانق متر وملاهي بالبارح. يدوّر كتافه باش يفوت. وقت يشعّلوا الخبّازة كوشاتهم، الفانوس يولّي كان دفا في جيبه — والنّور يولّي على كل اللي فات عليهم.",
    },
  },
];
