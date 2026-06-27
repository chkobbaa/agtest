import type { Bilingual } from "./types";

// All narrative copy for the site, keyed by a dotted string.
// The i18n layer swaps any element carrying `data-i18n="<key>"`.
//
// Voice notes:
//  - English: terse, confident streetwear cadence with a poet's restraint.
//  - Arabic: Tunisian-flavoured فصحى — warm, rooted, a little proverbial.

export const COPY: Record<string, Bilingual> = {
  // ---- Global / chrome ----
  "brand.tag": {
    en: "Sweetness forged in the harshest sun.",
    ar: "حلاوة تتسوّى في أقسى شمس.",
  },
  "nav.world": { en: "World", ar: "العالَم" },
  "nav.name": { en: "The Name", ar: "الإسم" },
  "nav.walker": { en: "The Walker", ar: "السّايْر" },
  "nav.drops": { en: "Drops", ar: "الدروبات" },
  "nav.shop": { en: "Shop", ar: "المتجر" },
  "nav.journal": { en: "Journal", ar: "اليوميّات" },
  "nav.join": { en: "Join the caravan", ar: "إلحق بالقافلة" },
  "lang.toggle": { en: "عربي", ar: "EN" },

  // ---- Preloader ----
  "loader.from": { en: "FROM THE SOUTH", ar: "مِنْ الجنوب" },
  "loader.to": { en: "TO THE STREET", ar: "للزّنقة" },

  // ---- Hero ----
  "hero.kicker": { en: "Tunisian streetwear · est. in the oasis", ar: "ستريت وير تونسي · وُلد في الواحة" },
  "hero.line1": { en: "WEAR", ar: "إلبس" },
  "hero.line2": { en: "THE", ar: "" },
  "hero.line3": { en: "LIGHT", ar: "النّور" },
  "hero.sub": {
    en: "DIGL is the date of light, cut into cloth. Heavy cotton, heavier stories — carried from Tozeur to Tunis on the back of one walker.",
    ar: "دِيڨل هي تمرة النّور، مقصوصة في قماش. قطن ثقيل، وحكايات أثقل — تتحمل من توزر للعاصمة على ظهر سايْر واحد.",
  },
  "hero.cta": { en: "Enter the world", ar: "أُدخل العالَم" },
  "hero.scroll": { en: "Scroll to walk", ar: "زيد لتحت باش تمشي" },

  // ---- The Name ----
  "name.eyebrow": { en: "01 — The Name", ar: "٠١ — الإسم" },
  "name.headline": {
    en: "Four letters from the desert.",
    ar: "أربع حروف جايّين من الصحرا.",
  },
  "name.degla": { en: "Degla", ar: "دڨلة" },
  "name.noor": { en: "Noor", ar: "نور" },
  "name.p1": {
    en: "DIGL comes from دڨلة — degla, the date of the Tunisian south. It is the root of Deglet Nour, ‘the date of light’: the sweetest fruit on earth.",
    ar: "دِيڨل جايّة من دڨلة — تمر الجنوب التونسي. هي أصل «دڨلة نور»: أحلى ثمرة في الدنيا.",
  },
  "name.p2": {
    en: "It grows where nothing should. Fifty degrees. No rain for months. Pure rock, salt and sun. And out of that violence comes the softest, brightest thing you will ever taste.",
    ar: "تطلع فين ما يطلع شيء. خمسين درجة. لا مطر لشهور. حجر وملح وشمس. ومن القساوة هاذي تخرج أحلى وأنصع حاجة تذوقها في عمرك.",
  },
  "name.p3": {
    en: "That contradiction is the whole brand. We do not soften the desert. We wear it.",
    ar: "التناقض هاذا هو البراند الكل. ما نليّنوش الصحرا. نلبسوها.",
  },
  "name.stat1": { en: "50°C harvest", ar: "غلّة في ٥٠ درجة" },
  "name.stat2": { en: "200 days no rain", ar: "٢٠٠ يوم بلا مطر" },
  "name.stat3": { en: "One fruit of light", ar: "ثمرة نور وحدة" },

  // ---- The Walker (character) ----
  "walker.eyebrow": { en: "02 — The Character", ar: "٠٢ — الشخصية" },
  "walker.name": { en: "The Walker", ar: "السّايْر" },
  "walker.arabic": { en: "السّايْر", ar: "السّايْر" },
  "walker.intro": {
    en: "Every drop begins with him.",
    ar: "كل دروب يبدا بيه.",
  },
  "walker.p1": {
    en: "At maghreb — the hour the sun gives up — he leaves the oasis. Hood up, barefoot on cooling stone, he carries a lantern. Look closer: the flame inside is a single date, glowing.",
    ar: "في المغرب — الساعة اللي تستسلم فيها الشمس — يخرج من الواحة. كبّوط على راسه، حافي على الحجر اللي يبرد، شادّ فانوس. رَكّز مليح: النار اللي فيه هي دڨلة وحدة، تشعّل.",
  },
  "walker.p2": {
    en: "He walks north. Through Gabès, through Kairouan, into the medina of Tunis. He carries نور — light — from the dark of the desert to the dark of the alleys. And he never arrives.",
    ar: "يمشي للشمال. يفوت قابس، يفوت القيروان، يدخل لمدينة تونس. يحمل النّور من ضلام الصحرا لضلام الزنانق. وعمره ما يوصل.",
  },
  "walker.p3": {
    en: "He is every kid who left the south with nothing but roots in his pocket. DIGL is what he wears on the road.",
    ar: "هو كل صغير خرج من الجنوب ما معاهش كان جذوره في جيبه. دِيڨل هي اللي يلبسها في الطريق.",
  },
  "walker.caption": { en: "السّايْر — keeper of the flame", ar: "السّايْر — حارس النار" },

  // ---- Manifesto ----
  "manifesto.eyebrow": { en: "03 — The Code", ar: "٠٣ — القانون" },
  "manifesto.l1": { en: "We don’t chase the season.", ar: "ما نلهثوش ورا الموسم." },
  "manifesto.l2": { en: "The season chases the sun.", ar: "الموسم هو اللي يلهث ورا الشمس." },
  "manifesto.l3": { en: "Made for the derb, not the runway.", ar: "متصنوع للدرب، موش للرَّنواي." },
  "manifesto.l4": { en: "Heavy cotton. Heavier stories.", ar: "قطن ثقيل. حكايات أثقل." },
  "manifesto.l5": { en: "From dust, light.", ar: "من الغبار، النّور." },

  // ---- Drops ----
  "drops.eyebrow": { en: "04 — The Drops", ar: "٠٤ — الدروبات" },
  "drops.headline": { en: "Four capsules. One road.", ar: "أربع كبسولات. طريق واحد." },
  "drops.hint": { en: "Hover a capsule to feel its weather.", ar: "حُطّ الفأرة على كبسولة باش تحسّ بطقسها." },

  // ---- Shop ----
  "shop.eyebrow": { en: "05 — The Goods", ar: "٠٥ — السلعة" },
  "shop.headline": { en: "Real cloth. Real weight.", ar: "قماش حقيقي. وزن حقيقي." },
  "shop.filter.all": { en: "All", ar: "الكل" },
  "shop.add": { en: "Add to bag", ar: "زيدها للساك" },
  "shop.added": { en: "In the bag ✓", ar: "في الساك ✓" },
  "shop.size": { en: "Size", ar: "القياس" },
  "shop.bag": { en: "Bag", ar: "الساك" },
  "shop.bagEmpty": { en: "Your bag is empty. The road is long.", ar: "ساكك فارغ. الطريق طويلة." },
  "shop.checkout": { en: "Checkout", ar: "خلّص" },
  "shop.total": { en: "Total", ar: "المجموع" },
  "shop.close": { en: "Close", ar: "سكّر" },
  "shop.remove": { en: "Remove", ar: "نحّي" },

  // ---- Journey / Map ----
  "journey.eyebrow": { en: "06 — The Road", ar: "٠٦ — الطريق" },
  "journey.headline": { en: "South to north, by foot.", ar: "من الجنوب للشمال، على رجليه." },
  "journey.body": {
    en: "Drag the lantern along the road. Every DIGL piece is named for a stop the Walker passed through.",
    ar: "جُرّ الفانوس على الطريق. كل قطعة دِيڨل تسمّت على محطة فات منها السّايْر.",
  },

  // ---- Journal ----
  "journal.eyebrow": { en: "07 — The Journal", ar: "٠٧ — اليوميّات" },
  "journal.headline": { en: "Dispatches from the road.", ar: "أخبار من الطريق." },

  // ---- Join / Newsletter ----
  "join.eyebrow": { en: "08 — The Caravan", ar: "٠٨ — القافلة" },
  "join.headline": { en: "Walk with us.", ar: "إمشي معانا." },
  "join.body": {
    en: "No spam, no noise. Just the next drop, the moment the lantern moves.",
    ar: "لا سبام لا حس. كان الدروب الجاي، وقت ما يتحرّك الفانوس.",
  },
  "join.placeholder": { en: "your@email.tn", ar: "your@email.tn" },
  "join.button": { en: "Join", ar: "إلحق" },
  "join.success": { en: "You’re on the road. Watch your inbox at maghreb.", ar: "راك في الطريق. شوف إيمايلك في المغرب." },
  "join.invalid": { en: "That email doesn’t look right.", ar: "الإيمايل هذا ما يبانش صحيح." },

  // ---- Footer ----
  "footer.tag": { en: "DIGL — دڨلة نور", ar: "دِيڨل — دڨلة نور" },
  "footer.made": { en: "Cut in Tunis. Born in the oasis.", ar: "مقصوص في تونس. مولود في الواحة." },
  "footer.rights": { en: "All rights reserved.", ar: "كل الحقوق محفوظة." },
  "footer.ig": { en: "Instagram", ar: "إنستڤرام" },
  "footer.tt": { en: "TikTok", ar: "تيك توك" },
  "footer.stores": { en: "Stockists", ar: "نقاط البيع" },
  "footer.contact": { en: "Contact", ar: "تواصل" },
  "footer.back": { en: "Back to the top", ar: "إرجع للفوق" },
};

/** Free-standing decorative marquee phrases (looped). */
export const MARQUEE: Bilingual[] = [
  { en: "SWEETNESS FORGED IN THE HARSHEST SUN", ar: "حلاوة تتسوّى في أقسى شمس" },
  { en: "FROM DUST · LIGHT", ar: "من الغبار · النّور" },
  { en: "TOZEUR → TUNIS", ar: "توزر ← تونس" },
  { en: "دڨلة نور", ar: "دڨلة نور" },
  { en: "WEAR THE LIGHT", ar: "إلبس النّور" },
];
