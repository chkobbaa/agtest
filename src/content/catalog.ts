import type { Drop, Product, JourneyStop, JournalEntry, TeamMember } from "./types";

// ---------------------------------------------------------------------------
// DROPS — four capsules, one road from the south to the city.
// ---------------------------------------------------------------------------
export const DROPS: Drop[] = [
  {
    code: "SUMMER",
    arabic: "صيف",
    meaning: { en: "Summer Drop", ar: "دروب الصيف" },
    line: {
      en: "Lightwear for the heat.",
      ar: "لبسة خفيفة للسخانة.",
    },
    body: {
      en: "The summer capsule. Breathable cottons, clean cuts, and pieces built to survive the heat of the city and the long walk.",
      ar: "كبسولة الصيف. قطن يتنفس، قصّات نظيفة، وقطع متصنوعة باش تعيش في سخانة المدينة.",
    },
    status: { en: "Now Available", ar: "متوفر الان" },
    color: "#e8a33d",
    ink: "#1a1206",
  },
  {
    code: "WINTER",
    arabic: "شتاء",
    meaning: { en: "Winter Drop", ar: "دروب الشتاء" },
    line: {
      en: "Heavyweight warmth for the cold route.",
      ar: "دفء ثقيل للطريق الباردة.",
    },
    body: {
      en: "The winter capsule. Dense fleece, protective hoods, and layered weights. Built for the walk home when the temperature drops.",
      ar: "كبسولة الشتاء. فليس خشين، كبابط تحمي، وطبقات ثقيلة. متصنوعة لرجعة الدار وقت يطيح الليل.",
    },
    status: { en: "Drops soon", ar: "قريبا" },
    color: "#3f6fa3",
    ink: "#f1f4f8",
  },
];

// ---------------------------------------------------------------------------
// PRODUCTS — a real, specified catalog. Prices in Tunisian Dinar (TND).
// ---------------------------------------------------------------------------
export const PRODUCTS: Product[] = [
  {
    id: "summer-white-shirt",
    drop: "SUMMER",
    name: { en: "DIGL White Shirt", ar: "قميص دِيڨل أبيض" },
    category: { en: "Tee", ar: "تيشيرت" },
    colorway: { en: "Pure White", ar: "أبيض ناصع" },
    spec: {
      en: "Premium cotton · breathable · relaxed fit",
      ar: "قطن ممتاز · يتنفس · قصة مريحة",
    },
    fit: { en: "Relaxed body, dropped shoulder.", ar: "أوفرسايز، كتف نازل." },
    material: { en: "Premium cotton with a soft hand feel.", ar: "قطن ممتاز بملمس ناعم." },
    care: { en: "Cold wash.", ar: "إغسل بارد." },
    story: {
      en: "A core staple for the heat. Built to breathe while maintaining structure.",
      ar: "أساسي للسخانة. يتنفس ويحافظ على الفورمة.",
    },
    details: [
      { en: "Signature DIGL cut", ar: "تفصيلة دِيڨل" },
      { en: "Breathable fabric", ar: "قماش يتنفس" },
      { en: "Pre-shrunk body", ar: "متقلّص قبل الخياطة" },
    ],
    images: [
      "/media/shirt.webp",
      "/media/shirt2.webp",
      "/media/shirt3.webp"
    ],
    lifestyleImage: "/media/life_white_shirt.webp",
    status: { en: "Available", ar: "متوفّر" },
    priceTND: 85,
    sizes: ["S", "M", "L", "XL"],
    silhouette: "tee",
    
  },
  {
    id: "summer-black-tank",
    drop: "SUMMER",
    name: { en: "DIGL Black Tank", ar: "خلعة دِيڨل كحلة" },
    category: { en: "Tank", ar: "خلعة" },
    colorway: { en: "Night Black", ar: "كحل ليل" },
    spec: {
      en: "Ribbed cotton · athletic fit · reinforced hems",
      ar: "قطن مضلع · قصة رياضية · مدعم",
    },
    fit: { en: "Fitted athletic cut.", ar: "قصة رياضية مضبوطة." },
    material: { en: "Ribbed stretch cotton.", ar: "قطن مضلع مطاطي." },
    care: { en: "Wash cold with dark colors.", ar: "إغسل بارد مع الألوان الغامقة." },
    story: {
      en: "For the hottest days. Clean, sharp, and cut to move.",
      ar: "لأكثر الأيام سخانة. نظيف، حاد، ومقصود للحركة.",
    },
    details: [
      { en: "Ribbed texture", ar: "قماش مضلع" },
      { en: "Reinforced straps", ar: "سمطة مدعمة" },
    ],
    images: [
      "/media/tank_top.webp",
      "/media/tank_top2.webp"
    ],
    lifestyleImage: "/media/life_black_tank.webp",
    status: { en: "Available", ar: "متوفّر" },
    priceTND: 55,
    sizes: ["S", "M", "L"],
    silhouette: "tank",
    
  },
  {
    id: "summer-tote-bag",
    drop: "SUMMER",
    name: { en: "DIGL Contrast Tote", ar: "حقيبة دِيڨل" },
    category: { en: "Accessories", ar: "إكسسوارات" },
    colorway: { en: "Black / White", ar: "أبيض / أكحل" },
    spec: {
      en: "Heavy canvas · contrast design · durable straps",
      ar: "كانفا ثقيل · تصميم متناقض · سمطة قوية",
    },
    fit: { en: "One size fits everything you need.", ar: "حجم واحد يهز كل شي." },
    material: { en: "Heavy duty cotton canvas.", ar: "كانفا قطن قوي." },
    care: { en: "Spot clean only.", ar: "تنظيف بالبقعة فقط." },
    story: {
      en: "Carry the load. Strong enough for tools, clean enough for the city.",
      ar: "هز حملك. قوية للأدوات، ونظيفة للمدينة.",
    },
    details: [
      { en: "Heavyweight canvas", ar: "كانفا خشين" },
      { en: "Reinforced handles", ar: "يدين مدعمة" },
    ],
    images: [
      "/media/bag.webp",
      "/media/bag2.webp"
    ],
    lifestyleImage: "/media/life_bag.webp",
    status: { en: "Available", ar: "متوفّر" },
    priceTND: 45,
    sizes: ["OS"],
    silhouette: "bag",
  },
  {
    id: "summer-pink-cap",
    drop: "SUMMER",
    name: { en: "DIGL Pink Cap", ar: "كاسكيط دِيڨل غوز" },
    category: { en: "Accessories", ar: "إكسسوارات" },
    colorway: { en: "Faded Pink", ar: "غوز باهت" },
    spec: {
      en: "Classic dad hat fit · adjustable strap · embroidered logo",
      ar: "قصة كلاسيكية · سمطة قابلة للضبط · لوڨو مطرز",
    },
    fit: { en: "Adjustable back strap.", ar: "سمطة تتعدل من الخلف." },
    material: { en: "Brushed cotton twill.", ar: "قطن تويل ناعم." },
    care: { en: "Hand wash or spot clean.", ar: "غسيل باليد أو تنظيف موضعي." },
    story: {
      en: "Block the sun. A faded wash for a lived-in feel right out of the box.",
      ar: "احجب الشمس. غسلة باهتة لإحساس مستعمل من أول نهار.",
    },
    details: [
      { en: "Embroidered DIGL logo", ar: "لوڨو دِيڨل مطرز" },
      { en: "Metal clasp", ar: "قفل حديد" },
    ],
    images: [
      "/media/cap.webp"
    ],
    lifestyleImage: "/media/life_pink_cap.webp",
    status: { en: "Available", ar: "متوفّر" },
    priceTND: 35,
    sizes: ["OS"],
    silhouette: "cap",
  },
  {
    id: "winter-pink-hoodie",
    drop: "WINTER",
    name: { en: "DIGL Pink Hoodie", ar: "كبّوط دِيڨل غوز" },
    category: { en: "Outerwear", ar: "كبّوط" },
    colorway: { en: "Dusk Pink", ar: "غوز الغسق" },
    spec: {
      en: "Heavyweight fleece · double lined hood · drop shoulder",
      ar: "فليس خشين · كبّوط دوبل · كتف نازل",
    },
    fit: { en: "Boxy, oversized fit.", ar: "قصّة واسعة." },
    material: { en: "Premium cotton blend fleece.", ar: "فليس قطن ممتاز." },
    care: { en: "Cold wash inside out. Hang dry.", ar: "غسيل بارد مقلوب. نشّف في الهواء." },
    story: {
      en: "A soft color for a heavy garment. Built to hold heat when the sun drops.",
      ar: "لون ناعم لقطعة ثقيلة. متصنوعة باش تشد السخانة وقت تغيب الشمس.",
    },
    details: [
      { en: "Double layered hood", ar: "كبّوط دوبل" },
      { en: "Ribbed cuffs", ar: "أطراف مضلعة" },
    ],
    images: [
      "/media/hoodie.webp",
      "/media/hoodie2.webp",
      "/media/hoodie3.webp",
      "/media/hoodie4.webp"
    ],
    lifestyleImage: "/media/life_pink_hoodie.webp",
    status: { en: "Drops soon", ar: "قريبا" },
    priceTND: 180,
    sizes: ["S", "M", "L", "XL"],
    silhouette: "hoodie",
  },
  {
    id: "winter-black-hoodie",
    drop: "WINTER",
    name: { en: "DIGL Black Hoodie", ar: "كبّوط دِيڨل أكحل" },
    category: { en: "Outerwear", ar: "كبّوط" },
    colorway: { en: "Midnight Black", ar: "أكحل ليل" },
    spec: {
      en: "Heavyweight fleece · protective hood · stealth details",
      ar: "فليس خشين · كبّوط يحمي · تفاصيل مخفية",
    },
    fit: { en: "Boxy, oversized fit.", ar: "قصّة واسعة." },
    material: { en: "Premium cotton blend fleece.", ar: "فليس قطن ممتاز." },
    care: { en: "Cold wash inside out. Hang dry.", ar: "غسيل بارد مقلوب. نشّف في الهواء." },
    story: {
      en: "The armor. Heavy enough for night air, clean enough for the city.",
      ar: "الدرع. ثقيلة لليل، ونظيفة للمدينة.",
    },
    details: [
      { en: "Kangaroo pocket", ar: "جيب أمامي" },
      { en: "Matte black drawcords", ar: "كردون أكحل" },
    ],
    images: [
      "/media/black_hoodie.webp",
      "/media/black_hoodie2.webp",
      "/media/black_hoodie3.webp"
    ],
    lifestyleImage: "/media/life_black_hoodie.webp",
    status: { en: "Drops soon", ar: "قريبا" },
    priceTND: 180,
    sizes: ["S", "M", "L", "XL", "XXL"],
    silhouette: "hoodie",
  },
];


// ---------------------------------------------------------------------------
// JOURNEY — the order's road from Nabeul to your door. The map is reused as a
// shipping tracker: each "stop" is a fulfilment stage. `city` holds the stage
// name and `hour` its timing; x/y keep the road's shape.
// ---------------------------------------------------------------------------
export const JOURNEY: JourneyStop[] = [
  {
    city: { en: "Order confirmed", ar: "تأكيد الطلب" },
    x: 16,
    y: 86,
    hour: "Day 0",
    note: {
      en: "We receive your order from Nabeul and confirm sizes and stock. The lantern is lit.",
      ar: "نستقبلوا طلبك من نابل ونأكّدوا القياسات والمخزون. الفانوس تشعّل.",
    },
  },
  {
    city: { en: "Packed", ar: "تلفيف" },
    x: 40,
    y: 70,
    hour: "Day 1",
    note: {
      en: "Your pieces are folded, checked, and sealed in DIGL packaging, ready for the road.",
      ar: "قطعك تتطوى، تتفحّص، وتتغلّف في تغليف دِيڨل، حاضرة للطريق.",
    },
  },
  {
    city: { en: "Dispatched", ar: "خرجت للتوصيل" },
    x: 58,
    y: 47,
    hour: "Day 2",
    note: {
      en: "Handed to the courier. Across Tunisia the order moves the way the Walker does — by road.",
      ar: "تتسلّم للتوصيل. في كامل تونس الكوموند تتحرّك كيف السّايْر — بالطريق.",
    },
  },
  {
    city: { en: "Delivered", ar: "وصلت" },
    x: 74,
    y: 18,
    hour: "Day 2–4",
    note: {
      en: "At your door, usually within 2–4 working days. The flame has held the whole way.",
      ar: "لباب دارك، عادةً في ٢ إلى ٤ أيام خدمة. النار صمدت الطريق الكل.",
    },
  },
];

// ---------------------------------------------------------------------------
// JOURNAL — store / order notes. Practical information for shoppers, kept in
// the editorial index voice.
// ---------------------------------------------------------------------------
export const JOURNAL: JournalEntry[] = [
  {
    index: "001",
    title: { en: "Shipping & delivery", ar: "الشحن والتوصيل" },
    place: { en: "All of Tunisia · 2–4 days", ar: "كامل تونس · ٢–٤ أيام" },
    body: {
      en: "We ship from Nabeul to anywhere in Tunisia, usually within 2–4 working days. Delivery is 7 TND, free on orders over 250 TND. You can pay online or on delivery.",
      ar: "نشحنوا من نابل لأي بلاصة في تونس، عادةً في ٢ إلى ٤ أيام خدمة. التوصيل ٧ دينار، فابور فوق ٢٥٠ دينار. تنجم تخلّص أونلاين ولا عند الاستلام.",
    },
  },
  {
    index: "002",
    title: { en: "Payment options", ar: "طرق الدفع" },
    place: { en: "Online or WhatsApp", ar: "أونلاين ولا واتساب" },
    body: {
      en: "Pay by card through a secure online link, or send your order on WhatsApp and confirm payment there. Every order is checked by a human in Nabeul before it goes out.",
      ar: "خلّص بالكارت من خلال لينك أونلاين آمن، ولا ابعث طلبك على واتساب وأكّد الخلاص هوني. كل كوموند يتأكّد من واحد في نابل قبل ما تخرج.",
    },
  },
  {
    index: "003",
    title: { en: "Exchanges & returns", ar: "التبديل والإرجاع" },
    place: { en: "7-day window · unworn", ar: "٧ أيام · ما تلبستش" },
    body: {
      en: "Sizes off? Exchange any unworn piece within 7 days of delivery, tags on. Reach us on WhatsApp or at salam@digl.tn and we'll sort the road back.",
      ar: "القياس ما جاش؟ بدّل أي قطعة ما تلبستش في ٧ أيام من الاستلام، بالتيكي. تواصل معانا على واتساب ولا salam@digl.tn ونرتّبوا الإرجاع.",
    },
  },
];

// ---------------------------------------------------------------------------
// TEAM — "The Makers". The crew behind DIGL, in the brand's lore voice.
// Portraits are hand-built woodcut busts (see art/marks.ts portraitSVG).
// ---------------------------------------------------------------------------
export const TEAM: TeamMember[] = [
  {
    id: "keeper",
    name: { en: "The Keeper", ar: "الحارس" },
    role: { en: "Founder · keeper of the route", ar: "المؤسّس · حارس الطريق" },
    tag: { en: "lights the lantern first", ar: "يشعّل الفانوس قبل الكل" },
    bio: {
      en: "Started DIGL from a Nabeul rooftop with one screen and a stubborn idea: clothes for the walk home, not the runway. Sets the direction, then walks it.",
      ar: "بدا دِيڨل من سطح في نابل بشاشة وحدة وفكرة عنيدة: لباس لمشية الرجوع للدار، موش للرانواي. يحدّد الطريق، وبعد يمشيه.",
    },
    portrait: "keeper",
    color: "#e8a33d",
    ink: "#1a1206",
  },
  {
    id: "cutter",
    name: { en: "The Cutter", ar: "القَصّاص" },
    role: { en: "Patterns · fit · construction", ar: "الباترون · القَصّة · التصنيع" },
    tag: { en: "a meter apart, every time", ar: "متر بمتر، في كل مرّة" },
    bio: {
      en: "Turns a feeling into a pattern. Lives in seam allowances and grams-per-square-meter, and will re-cut a shoulder four times until the drop sits right.",
      ar: "يحوّل إحساس لباترون. يعيش في حساب الخياطة والڨرامات، ويعاود قصّ الكتف أربع مرّات حتى يجي مظبوط.",
    },
    portrait: "cutter",
    color: "#3f6fa3",
    ink: "#f1f4f8",
  },
  {
    id: "ink",
    name: { en: "Ink & Light", ar: "حبر ونور" },
    role: { en: "Print · graphics · the lantern mark", ar: "الطباعة · الڨرافيك · علامة الفانوس" },
    tag: { en: "pulls the screen by hand", ar: "يسحب الإيكران باليد" },
    bio: {
      en: "Mixes the pigments, burns the screens, and pulls every print so the Walker reads the same on the hundredth tee as the first. Obsessed with reflective ink.",
      ar: "يخلط الألوان، يحرق الإيكرانات، ويسحب كل طباعة باش السّايْر يبان نفس الشيء في التيشيرت المية كيف الأول. مهووس بالحبر العاكس.",
    },
    portrait: "ink",
    color: "#2f5d4a",
    ink: "#eef3ec",
  },
  {
    id: "scribe",
    name: { en: "The Scribe", ar: "الكاتب" },
    role: { en: "Stories · journal · the lore", ar: "الحكايات · اليوميّات · الأسطورة" },
    tag: { en: "writes the road down", ar: "يكتب الطريق" },
    bio: {
      en: "Keeps the myth honest. Writes the drops, the journal, and the Walker's nights so every piece arrives with a story you can actually feel.",
      ar: "يحافظ على صدق الأسطورة. يكتب الدروبات، اليوميّات، وليالي السّايْر باش كل قطعة توصل ومعاها حكاية تتحسّ.",
    },
    portrait: "scribe",
    color: "#c9a06b",
    ink: "#241a10",
  },
];
