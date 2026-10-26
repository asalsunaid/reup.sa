import type { Locale } from "@/lib/content";

const IMG = "https://reup.sa/images";

// v3 copy follows Zid's voice: short, warm, lightly Saudi in Arabic. Shared strings (nav, FAQ, contact) stay in lib/content.
const ar = {
  meta: { title: "REUP | كل أعمالك في مساحة وحدة" },
  cta: "احجز عرضك",
  explore: "شوف الحلول",
  nav: [
    { href: "#offer", label: "المنصة" },
    { href: "#solutions", label: "الحلول" },
    { href: "#audience", label: "لمين REUP؟" },
    { href: "#faq", label: "الأسئلة" },
  ],
  hero: {
    badge: "منصة أعمال سعودية",
    titleA: "كل أعمالك،",
    titleB: "في مساحة وحدة.",
    sub: "عقار، عيادة، تمويل، أو فوترة إلكترونية. REUP تجمعها لك في مساحة تحمل اسمك وهويتك.",
    image: `${IMG}/solution-ehya.webp`,
    alt: "فلل سكنية حديثة",
    floats: [
      { kind: "contract", title: "عقد إيجار موقّع", body: "فيلا 14، حي الشاطئ" },
      { kind: "calendar", title: "موعد جديد", body: "الأحد 10:30 ص" },
      { kind: "invoice", title: "فاتورة ضريبية صادرة", body: "INV-2026-0418" },
    ],
  },
  partners: "شركاء معنا",
  offer: {
    title: "مساحة وحدة، وحلول تكمّل بعض",
    sub: "كل منشأة تاخذ مساحتها الخاصة، وتفعّل الحلول اللي تحتاجها بس.",
    rolesTitle: "صلاحيات لكل موظف",
    domain: "alreem.reup.sa",
  },
  audience: {
    badge: "لمين REUP؟",
    title: "توك تبدأ، شغّال، أو تبي تنقل… مساحتك جاهزة",
    sub: "رتّبنا لك الطريق حسب وضع منشأتك.",
    items: [
      {
        icon: "start",
        title: "توك تبدأ؟",
        body: "اختر الحل اللي يناسب نشاطك، وجهّز مساحتك وانطلق.",
        cta: "اختر حلك",
        href: "#solutions",
      },
      {
        icon: "grow",
        title: "عندك منشأة قائمة؟",
        body: "اجمع فروعك وفريقك وعملياتك في مكان واحد، بدون ما توقف شغلك.",
        cta: "شوف المنصة",
        href: "#offer",
      },
      {
        icon: "move",
        title: "تشتغل على أكثر من نظام؟",
        body: "نساعدك تنقل بياناتك المتفرقة وتبدأ على REUP بأقل مجهود.",
        cta: "احجز عرضك",
        href: "#contact",
      },
    ],
  },
  solutions: {
    title: "حلول جاهزة لكل قطاع",
    sub: "اختر حلك، وكل حل يجيك بأدواته جاهزة من أول يوم.",
    note: "كل الحلول تشتغل في نفس المساحة وبنفس الحساب.",
    items: [
      {
        key: "propup",
        name: "PropUp",
        sector: "العقارات",
        rows: [
          ["العقود", "عقود إيجار إلكترونية"],
          ["التحصيل", "تذكير وتحصيل تلقائي"],
          ["الصيانة", "طلبات ومتابعة لحظية"],
        ],
      },
      {
        key: "medup",
        name: "MedUp",
        sector: "الرعاية الصحية",
        rows: [
          ["المواعيد", "حجز أونلاين"],
          ["المرضى", "ملفات موحدة"],
          ["التأمين", "إدارة المطالبات"],
        ],
      },
      {
        key: "fiup",
        name: "FiUp",
        sector: "التمويل",
        rows: [
          ["الطلبات", "طلبات تمويل رقمية"],
          ["المحفظة", "تقييم ومتابعة"],
          ["التقارير", "أرقام لحظية"],
        ],
      },
      {
        key: "cxup",
        name: "CxUp",
        sector: "تجربة العملاء",
        rows: [
          ["المحادثات", "صندوق وارد موحد"],
          ["التذاكر", "مستويات خدمة واضحة"],
          ["الرضا", "استبيانات وقياس"],
        ],
      },
      {
        key: "einvoice",
        name: "الفوترة الإلكترونية",
        sector: "الامتثال الضريبي",
        rows: [
          ["فاتورة", "المرحلة الثانية"],
          ["QR", "رمز وتوقيع إلكتروني"],
          ["الأرشيف", "تقارير ضريبية"],
        ],
      },
    ],
  },
  promo: {
    badge: "الفوترة الإلكترونية",
    title: "فواتيرك متوافقة من أول فاتورة",
    sub: "كل عملية في مساحتك تطلع لها فاتورة ضريبية جاهزة، بدون إدخال يدوي.",
    big: "المرحلة الثانية",
    bigNote: "ربط وتكامل مع منصة فاتورة",
  },
  numbers: {
    title: "أرقام نفتخر فيها",
    quote: "مع REUP بسّطنا العمليات وقلّلنا الجهد اليدوي، وصارت عندنا رؤية لحظية تساعدنا نتخذ قرارات أفضل.",
  },
  team: {
    badge: "مو لحالك",
    title: "ما نسلّمك النظام ونمشي.",
    body: "فريق REUP جاهز معك، يدرّب فريقك، ويكون قريب منك بعد الإطلاق.",
    image: `${IMG}/impact-team.png`,
    alt: "فريق REUP في اجتماع مع عميل",
    floats: [
      { title: "تذكرة مغلقة", body: "تقييم العميل 5 من 5" },
      { title: "تم تفعيل MedUp", body: "عيادات سنا" },
    ],
  },
  apps: {
    title: "فعّل كل اللي تحتاجه، بضغطة وحدة",
    sub: "كل حل في REUP تفعّله لمساحتك متى ما احتجته، ويشتغل بدون نقل وإعادة تعريف.",
    image: "/images/v3/dashboard-apps-2.webp",
    imageAlt:
      "شاشة التطبيقات في لوحة تحكم REUP: PropUp وMedUp وHRUp وCRM وFinance وProjects مفعّلة، وInventory وAnalytics متاحة للتفعيل",
  },
  faq: { badge: "أسئلة متكررة", title: "كل اللي يشغل بالك." },
  final: {
    title: "خلّ أعمالك تشتغل لك",
    sub: "مساحة وحدة، فريق واحد، وصورة كاملة لكل شيء.",
    image: `${IMG}/mission-section.png`,
  },
  footer: { platform: "المنصة", connect: "تواصل معنا" },
};

export type V3Dict = typeof ar;

const en: V3Dict = {
  meta: { title: "REUP | Your whole business, one space" },
  cta: "Book a demo",
  explore: "See solutions",
  nav: [
    { href: "#offer", label: "Platform" },
    { href: "#solutions", label: "Solutions" },
    { href: "#audience", label: "Who it's for" },
    { href: "#faq", label: "FAQ" },
  ],
  hero: {
    badge: "A Saudi business platform",
    titleA: "Your whole business,",
    titleB: "in one space.",
    sub: "Property, clinics, finance or e-invoicing. REUP brings it together in a space with your name and brand.",
    image: `${IMG}/solution-ehya.webp`,
    alt: "Modern residential villas",
    floats: [
      { kind: "contract", title: "Lease signed", body: "Villa 14, Al Shati" },
      { kind: "calendar", title: "New booking", body: "Sunday 10:30 AM" },
      { kind: "invoice", title: "Tax invoice issued", body: "INV-2026-0418" },
    ],
  },
  partners: "Our partners",
  offer: {
    title: "One space, solutions that fit together",
    sub: "Every business gets its own space and switches on only what it needs.",
    rolesTitle: "Roles for every employee",
    domain: "alreem.reup.sa",
  },
  audience: {
    badge: "Who it's for",
    title: "Starting out, already running, or switching? Your space is ready",
    sub: "We mapped the path for wherever your business is today.",
    items: [
      {
        icon: "start",
        title: "Just starting?",
        body: "Pick the solution that fits your business, set up your space and go.",
        cta: "Pick a solution",
        href: "#solutions",
      },
      {
        icon: "grow",
        title: "Already operating?",
        body: "Bring branches, team and operations into one place without pausing your work.",
        cta: "See the platform",
        href: "#offer",
      },
      {
        icon: "move",
        title: "Running on several systems?",
        body: "We help you bring your scattered data together and start on REUP with minimal effort.",
        cta: "Book a demo",
        href: "#contact",
      },
    ],
  },
  solutions: {
    title: "Ready-made solutions for every sector",
    sub: "Pick your solution. Each one arrives with its tools ready from day one.",
    note: "Every solution runs in the same space, on the same account.",
    items: [
      {
        key: "propup",
        name: "PropUp",
        sector: "Real estate",
        rows: [
          ["Leases", "Digital lease contracts"],
          ["Collection", "Automatic reminders"],
          ["Maintenance", "Requests and tracking"],
        ],
      },
      {
        key: "medup",
        name: "MedUp",
        sector: "Healthcare",
        rows: [
          ["Bookings", "Online booking"],
          ["Patients", "Unified records"],
          ["Insurance", "Claims management"],
        ],
      },
      {
        key: "fiup",
        name: "FiUp",
        sector: "Finance",
        rows: [
          ["Requests", "Digital applications"],
          ["Portfolio", "Assessment and tracking"],
          ["Reports", "Real-time numbers"],
        ],
      },
      {
        key: "cxup",
        name: "CxUp",
        sector: "Customer experience",
        rows: [
          ["Chats", "One unified inbox"],
          ["Tickets", "Clear service levels"],
          ["Satisfaction", "Surveys and scores"],
        ],
      },
      {
        key: "einvoice",
        name: "E-invoicing",
        sector: "Tax compliance",
        rows: [
          ["FATOORA", "Phase 2"],
          ["QR", "Code and cryptographic stamp"],
          ["Archive", "Tax reports"],
        ],
      },
    ],
  },
  promo: {
    badge: "E-invoicing",
    title: "Compliant from your very first invoice",
    sub: "Every transaction in your space gets a ready tax invoice, with no manual entry.",
    big: "Phase 2",
    bigNote: "Integrated with ZATCA's FATOORA",
  },
  numbers: {
    title: "Numbers we're proud of",
    quote:
      "With REUP, we streamline processes, reduce manual effort, and get real-time insights that help us make better decisions.",
  },
  team: {
    badge: "You're not alone",
    title: "We don't hand over the keys and leave.",
    body: "The REUP team is with you: it trains your people and stays close after launch.",
    image: `${IMG}/impact-team.png`,
    alt: "The REUP team meeting a customer",
    floats: [
      { title: "Ticket resolved", body: "Rated 5 out of 5" },
      { title: "MedUp activated", body: "Sana Clinics" },
    ],
  },
  apps: {
    title: "Switch on everything you need, in one click",
    sub: "Activate any REUP solution for your space whenever you need it. It runs without migrating or setting things up again.",
    image: "/images/v3/dashboard-apps-2.webp",
    imageAlt:
      "The Apps screen in the REUP dashboard: PropUp, MedUp, HRUp, CRM, Finance and Projects are active, with Inventory and Analytics available to switch on",
  },
  faq: { badge: "FAQ", title: "Everything on your mind." },
  final: {
    title: "Let your business work for you",
    sub: "One space, one team, and the full picture of everything.",
    image: `${IMG}/mission-section.png`,
  },
  footer: { platform: "Platform", connect: "Get in touch" },
};

export const getV3 = (locale: Locale) => (locale === "ar" ? ar : en);
