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
    en: "Streetwear from Nabeul for the long walk.",
    ar: "ستريت وير للمشية الطويلة.",
  },
  "nav.home": { en: "Home", ar: "Home" },
  "nav.world": { en: "World", ar: "العالَم" },
  "nav.name": { en: "The Name", ar: "الإسم" },
  "nav.walker": { en: "The Walker", ar: "السّايْر" },
  "nav.drops": { en: "Drops", ar: "الدروبات" },
  "nav.shop": { en: "Catalog", ar: "الكاتالوڨ" },
  "nav.journal": { en: "Journal", ar: "اليوميّات" },
  "nav.join": { en: "Join the caravan", ar: "إلحق بالقافلة" },
  "lang.toggle": { en: "عربي", ar: "EN" },

  // ---- Preloader ----
  "loader.from": { en: "FROM THE SOUTH", ar: "مِنْ الجنوب" },
  "loader.to": { en: "TO THE STREET", ar: "للشارع" },

  // ---- Hero ----
  "hero.kicker": { en: "Nabeul, Tunisia · carried by the Walker", ar: "ستريت وير تونسي · يحمله السّايْر" },
  "hero.line1": { en: "WEAR", ar: "إلبس" },
  "hero.line2": { en: "THE", ar: "" },
  "hero.line3": { en: "LIGHT", ar: "النّور" },
  "hero.sub": {
    en: "DIGL is streetwear from Nabeul built for movement after heat: heavy cotton, sharp graphics, and road-worn layers carried through the city by the Walker.",
    ar: "دِيڨل ستريت وير متصنوع للحركة بعد السخانة: قطن ثقيل، ڨرافيك قاطع، وطبقات تعيش الطريق من الجنوب للمدينة مع السّايْر.",
  },
  "hero.shop": { en: "Shop now", ar: "Shop now" },
  "hero.cta": { en: "Enter the world", ar: "أُدخل العالَم" },
  "hero.scroll": { en: "Scroll to walk", ar: "زيد لتحت باش تمشي" },

  // ---- The Name ----
  "name.eyebrow": { en: "01 — The Name", ar: "٠١ — الإسم" },
  "name.headline": {
    en: "Four letters for the ones still moving.",
    ar: "أربع حروف للّي مازالوا يمشيو.",
  },
  "name.degla": { en: "DIGL", ar: "دِيڨل" },
  "name.noor": { en: "Light", ar: "نور" },
  "name.p1": {
    en: "DIGL is a streetwear mark: four letters stamped like a tag on walls, sleeves, labels and night routes.",
    ar: "دِيڨل علامة ستريت وير: أربع حروف تتختم كي التاڨ على الحيطان، الكمايم، الليبلات، وطريق الليل.",
  },
  "name.p2": {
    en: "The name carries the pressure of Nabeul streets: concrete heat, bus windows, seaside wind, workshop dust, and the quiet focus of someone walking home late.",
    ar: "الإسم يحمل ضغط الشارع التونسي: سخانة الإسمنت، شبابيك الكار، زوايا المدينة، ريح البحر، وتركيز واحد يروّح وحده بالليل.",
  },
  "name.p3": {
    en: "That is the whole brand: utility with myth, weight with motion, light without softness.",
    ar: "هاذا هو البراند الكل: منفعة ومعاها أسطورة، وزن ومعاه حركة، نور بلا طراوة.",
  },
  // ---- The Walker (character) ----
  "walker.eyebrow": { en: "02 — The Character", ar: "٠٢ — الشخصية" },
  "walker.name": { en: "The Walker", ar: "السّايْر" },
  "walker.arabic": { en: "السّايْر", ar: "السّايْر" },
  "walker.intro": {
    en: "Every drop begins with him.",
    ar: "كل دروب يبدا بيه.",
  },
  "walker.p1": {
    en: "At maghreb — when the city shifts temperature — he pulls the hood up and carries a lantern through cooling streets. The flame is an ember of focus, a small signal for the way forward.",
    ar: "في المغرب — وقت المدينة تبدّل حرارتها — يطلع الكبّوط ويهز فانوسه في شوارع تبرد. النار تركيز، إشارة صغيرة للطريق اللي قدّام.",
  },
  "walker.p2": {
    en: "He walks Nabeul after dark: stations, back roads, empty lots, workshop doors, and seaside corners. He carries نور — light — from one street shadow to the next. And he never arrives.",
    ar: "يمشي للشمال. يفوت محطات، طرقات ورا، بلايص فارغة، ويدخل لمدينة تونس. يحمل النّور من ظل شارع لظل شارع. وعمره ما يوصل.",
  },
  "walker.p3": {
    en: "He is every kid moving through town with roots in his pocket and a route in his head. DIGL is what he wears on the road.",
    ar: "هو كل صغير خرج من الجنوب ما معاهش كان جذوره في جيبه. دِيڨل هي اللي يلبسها في الطريق.",
  },
  "walker.caption": { en: "السّايْر — keeper of the route", ar: "السّايْر — حارس الطريق" },

  // ---- Manifesto ----
  "manifesto.eyebrow": { en: "03 — The Code", ar: "٠٣ — القانون" },
  "manifesto.l1": { en: "We don’t chase the season.", ar: "ما نلهثوش ورا الموسم." },
  "manifesto.l2": { en: "The route sets the pace.", ar: "الطريق هي اللي تعطي الريتم." },
  "manifesto.l3": { en: "Made for the darb, not the runway.", ar: "متصنوع للدرب، موش للرانواي." },
  "manifesto.l4": { en: "Heavy cotton. Heavier stories.", ar: "قطن ثقيل. حكايات أثقل." },
  "manifesto.l5": { en: "From dust, light.", ar: "من الغبار، النّور." },

  // ---- Drops ----
  "drops.eyebrow": { en: "04 — The Drops", ar: "٠٤ — الدروبات" },
  "drops.headline": { en: "Four capsules. One road.", ar: "أربع كبسولات. طريق واحد." },
  "drops.hint": { en: "Hover a capsule to feel its weather.", ar: "حُطّ الفأرة على كبسولة باش تحسّ بطقسها." },

  // ---- Shop ----
  "shop.eyebrow": { en: "05 — The Catalog", ar: "٠٥ — الكاتالوڨ" },
  "shop.headline": { en: "Discover the uniform.", ar: "إكتشف الزيّ." },
  "shop.intro": {
    en: "A dedicated shop page for DIGL essentials, drops, and السّايْر pieces shipping from Nabeul.",
    ar: "A dedicated shop page for DIGL essentials, drops, and السّايْر pieces shipping from Nabeul.",
  },
  "shop.search": { en: "Search pieces", ar: "لوّج على قطعة" },
  "shop.sort": { en: "Sort", ar: "رتّب" },
  "shop.sort.featured": { en: "Featured", ar: "مختار" },
  "shop.sort.priceAsc": { en: "Price low to high", ar: "السوم من الأقل" },
  "shop.sort.priceDesc": { en: "Price high to low", ar: "السوم من الأعلى" },
  "shop.count": { en: "pieces", ar: "قطع" },
  "shop.filter.all": { en: "All", ar: "الكل" },
  "shop.add": { en: "Add to bag", ar: "زيدها للساك" },
  "shop.added": { en: "In the bag ✓", ar: "في الساك ✓" },
  "shop.details": { en: "Details", ar: "التفاصيل" },
  "shop.back": { en: "Back to catalog", ar: "إرجع للكاتالوڨ" },
  "shop.material": { en: "Material", ar: "القماش" },
  "shop.fit": { en: "Fit", ar: "القَصّة" },
  "shop.care": { en: "Care", ar: "العناية" },
  "shop.colorway": { en: "Colorway", ar: "الكولورواي" },
  "shop.story": { en: "Story", ar: "الحكاية" },
  "shop.construction": { en: "Construction", ar: "التصنيع" },
  "shop.shipping": { en: "Ships from Nabeul, Tunisia. Exchange window: 7 days, unworn.", ar: "الشحن من نابل. تبديل في ٧ أيام، القطعة ما تلبستش." },
  "shop.size": { en: "Size", ar: "القياس" },
  "shop.bag": { en: "Bag", ar: "الساك" },
  "shop.bagEmpty": { en: "Your bag is empty. The road is long.", ar: "ساكك فارغ. الطريق طويلة." },
  "shop.checkout": { en: "Checkout", ar: "خلّص" },
  "shop.total": { en: "Total", ar: "المجموع" },
  "shop.close": { en: "Close", ar: "سكّر" },
  "shop.remove": { en: "Remove", ar: "نحّي" },
  "shop.zoom": { en: "Click to zoom", ar: "انقر للتكبير" },

  // ---- Journey / Map ----
  "journey.eyebrow": { en: "06 — Shipping Stages", ar: "٠٦ — مراحل الشحن" },
  "journey.headline": { en: "From Nabeul to your door.", ar: "من نابل لباب دارك." },
  "journey.body": {
    en: "Drag the lantern through the order path: confirmed, packed, dispatched, delivered. The Walker still carries the route.",
    ar: "جُرّ الفانوس على الطريق. كل قطعة دِيڨل مقصوصة لمحطة، سخانة، ولا شارع فات منه السّايْر.",
  },

  // ---- Journal ----
  "journal.eyebrow": { en: "07 — Store Notes", ar: "٠٧ — ملاحظات المتجر" },
  "journal.headline": { en: "How the order moves.", ar: "كيفاش تتحرك الكوموند." },

  // ---- Team / The Makers ----
  "nav.team": { en: "Team", ar: "الفريق" },
  "team.eyebrow": { en: "The Makers", ar: "الصنّاع" },
  "team.headline": { en: "The hands behind the light.", ar: "الأيادي اللي ورا النّور." },
  "team.intro": {
    en: "DIGL is a small crew in Nabeul. Four people keep the route: one lights it, one cuts it, one prints it, one writes it down.",
    ar: "دِيڨل فريق صغير في نابل. أربعة يحافظوا على الطريق: واحد يشعّلها، واحد يقصّها، واحد يطبعها، وواحد يكتبها.",
  },
  "team.back": { en: "Back home", ar: "للرئيسية" },

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

  // ---- Checkout ----
  "checkout.eyebrow": { en: "Checkout", ar: "Checkout" },
  "checkout.headline": { en: "Finish the order.", ar: "Finish the order." },
  "checkout.body": {
    en: "Choose online payment or WhatsApp payment. Orders are confirmed from Nabeul before dispatch.",
    ar: "Choose online payment or WhatsApp payment. Orders are confirmed from Nabeul before dispatch.",
  },
  "checkout.name": { en: "Full name", ar: "Full name" },
  "checkout.phone": { en: "Phone / WhatsApp", ar: "Phone / WhatsApp" },
  "checkout.address": { en: "Delivery address", ar: "Delivery address" },
  "checkout.online": { en: "Online payment", ar: "Online payment" },
  "checkout.onlineBody": { en: "Pay by card through a secure payment link.", ar: "Pay by card through a secure payment link." },
  "checkout.whatsapp": { en: "WhatsApp payment", ar: "WhatsApp payment" },
  "checkout.whatsappBody": { en: "Send the order on WhatsApp and confirm payment there.", ar: "Send the order on WhatsApp and confirm payment there." },
  "checkout.summary": { en: "Order summary", ar: "Order summary" },
  "checkout.continue": { en: "Keep shopping", ar: "Keep shopping" },
  "checkout.empty": { en: "Your bag is empty. Add a piece first.", ar: "Your bag is empty. Add a piece first." },
  "checkout.ready": { en: "Payment handoff ready. Replace this with your payment provider link when connected.", ar: "Payment handoff ready." },
  "checkout.required": { en: "Add your name, phone, and delivery address first.", ar: "Add your name, phone, and delivery address first." },

  // ---- Footer ----
  "footer.tag": { en: "DIGL — السّايْر", ar: "دِيڨل — السّايْر" },
  "footer.made": { en: "Based in Nabeul, Tunisia. Built for the road.", ar: "مقصوص في تونس. متصنوع للطريق." },
  "footer.rights": { en: "All rights reserved.", ar: "كل الحقوق محفوظة." },
  "footer.ig": { en: "Instagram", ar: "إنستڤرام" },
  "footer.tt": { en: "TikTok", ar: "تيك توك" },
  "footer.stores": { en: "Stockists", ar: "نقاط البيع" },
  "footer.contact": { en: "Contact", ar: "تواصل" },
  "footer.back": { en: "Back to the top", ar: "إرجع للفوق" },
};

/** Free-standing decorative marquee phrases (looped). */
export const MARQUEE: Bilingual[] = [
  { en: "NABEUL STREETWEAR FOR THE LONG WALK", ar: "ستريت وير للمشية الطويلة" },
  { en: "FROM DUST · LIGHT", ar: "من الغبار · النّور" },
  { en: "NABEUL → YOUR DOOR", ar: "نابل ← باب دارك" },
  { en: "السّايْر", ar: "السّايْر" },
  { en: "WEAR THE LIGHT", ar: "إلبس النّور" },
];
