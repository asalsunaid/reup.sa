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
    titleA: "كل أعمالك،",
    titleB: "في مساحة وحدة.",
    sub: "عقار، عيادة، تمويل، أو فوترة إلكترونية. REUP تجمعها لك في مساحة تحمل اسمك وهويتك.",
    image: "/images/v3/dashboard-apps-2.webp",
    alt: "لوحة تحكم REUP وتطبيقات مساحة العمل",
    floats: [
      { kind: "contract", title: "عقد إيجار موقّع", body: "فيلا 14، حي الشاطئ" },
      { kind: "calendar", title: "موعد جديد", body: "الأحد 10:30 ص" },
      { kind: "invoice", title: "فاتورة ضريبية صادرة", body: "INV-2026-0418" },
    ],
  },
  partners: "شركاء معنا",
  offer: {
    title: "مساحة وحدة، وحلول تكمّل بعض",
    sub: "كل منشأة تاخذ مساحتها الخاصة، بياناتها محمية وخاصة فيها، وتفعّل الحلول اللي تحتاجها بس.",
    rolesTitle: "صلاحيات لكل موظف",
  },
  audience: {
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
  numbers: {
    title: "أرقام نفتخر فيها",
  },
  testimonials: {
    label: "آراء عملائنا",
    goTo: "انتقل إلى الرأي {n} من {total}",
    items: [
      {
        quote: "مع REUP بسّطنا العمليات وقلّلنا الجهد اليدوي، وصارت عندنا رؤية لحظية تساعدنا نتخذ قرارات أفضل.",
        name: "مأمون قريصة",
        role: "مدير المبيعات",
        draft: false,
      },
      // DRAFT: placeholder quote. Replace with a real, approved customer quote before launch.
      {
        quote: "كنا نتابع العقود والتحصيل على ملفات متفرقة. اليوم كل شيء في مكان واحد، والتحصيل الشهري صار أسهل بكثير.",
        name: "مديرة العمليات",
        role: "شركة إدارة أملاك",
        draft: true,
      },
      // DRAFT: placeholder quote. Replace with a real, approved customer quote before launch.
      {
        quote: "المواعيد وملفات المرضى والفواتير صارت في نظام واحد، وفريق الاستقبال يشتغل بثقة أكبر.",
        name: "مدير عيادة",
        role: "الرعاية الصحية",
        draft: true,
      },
      // DRAFT: placeholder quote. Replace with a real, approved customer quote before launch.
      {
        quote: "أهم شيء عندنا أن بياناتنا خاصة فينا ومحمية. ومع REUP كل موظف يشوف اللي يخصه بس.",
        name: "مؤسس",
        role: "شركة ناشئة في التمويل",
        draft: true,
      },
    ],
  },
  team: {
    title: "ما نسلّمك النظام ونمشي.",
    body: "فريق REUP جاهز معك، يدرّب فريقك، ويكون قريب منك بعد الإطلاق.",
    image: `${IMG}/mission-section.png`,
    alt: "فريق REUP يشرح خطة الإطلاق أمام سبورة",
    floats: [
      { title: "تذكرة مغلقة", body: "تقييم العميل 5 من 5" },
      { title: "تم تفعيل MedUp", body: "عيادات سنا" },
    ],
  },
  apps: {
    title: "فعّل كل اللي تحتاجه، بضغطة وحدة",
    sub: "كل حل في REUP تفعّله لمساحتك متى ما احتجته، ويشتغل بدون نقل وإعادة تعريف.",
    image: "/images/v3/dashboard-apps-2.webp",
    video: "/media/reup-modules.mp4",
    imageAlt:
      "شاشة التطبيقات في لوحة تحكم REUP: PropUp وMedUp وHRUp وCRM وFinance وProjects مفعّلة، وInventory وAnalytics متاحة للتفعيل",
  },
  faq: { title: "كل اللي يشغل بالك." },
  final: {
    title: "خلّ أعمالك تشتغل لك",
    sub: "مساحة وحدة، فريق واحد، وصورة كاملة لكل شيء.",
    image: `${IMG}/solution-tasyil.png`,
  },
  form: {
    sectorQuestion: "وش نشاطك؟",
    addNote: "أضف ملاحظة",
    noteLabel: "ملاحظتك",
    phonePrefix: "+966",
    privacy: "نستخدم بياناتك للتواصل معك بخصوص العرض فقط.",
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
    titleA: "Your whole business,",
    titleB: "in one space.",
    sub: "Property, clinics, finance or e-invoicing. REUP brings it together in a space with your name and brand.",
    image: "/images/v3/dashboard-apps-2.webp",
    alt: "The REUP dashboard and its workspace apps",
    floats: [
      { kind: "contract", title: "Lease signed", body: "Villa 14, Al Shati" },
      { kind: "calendar", title: "New booking", body: "Sunday 10:30 AM" },
      { kind: "invoice", title: "Tax invoice issued", body: "INV-2026-0418" },
    ],
  },
  partners: "Our partners",
  offer: {
    title: "One space, solutions that fit together",
    sub: "Every business gets its own private space, with its data protected and kept to itself, and switches on only what it needs.",
    rolesTitle: "Roles for every employee",
  },
  audience: {
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
  numbers: {
    title: "Numbers we're proud of",
  },
  testimonials: {
    label: "What our customers say",
    goTo: "Go to quote {n} of {total}",
    items: [
      {
        quote:
          "With REUP, we streamline processes, reduce manual effort, and get real-time insights that help us make better decisions.",
        name: "Maamoun Grissa",
        role: "Sales Manager",
        draft: false,
      },
      // DRAFT: placeholder quote. Replace with a real, approved customer quote before launch.
      {
        quote:
          "We tracked leases and collections across scattered files. Now everything is in one place, and monthly collection is far easier.",
        name: "Operations Manager",
        role: "Property management company",
        draft: true,
      },
      // DRAFT: placeholder quote. Replace with a real, approved customer quote before launch.
      {
        quote: "Bookings, patient files and invoices now live in one system, and our front desk works with more confidence.",
        name: "Clinic Manager",
        role: "Healthcare",
        draft: true,
      },
      // DRAFT: placeholder quote. Replace with a real, approved customer quote before launch.
      {
        quote:
          "What matters most to us is that our data is private and protected. With REUP, every employee sees only what is theirs.",
        name: "Founder",
        role: "Fintech startup",
        draft: true,
      },
    ],
  },
  team: {
    title: "We don't hand over the keys and leave.",
    body: "The REUP team is with you: it trains your people and stays close after launch.",
    image: `${IMG}/mission-section.png`,
    alt: "The REUP team walking through a launch plan at a whiteboard",
    floats: [
      { title: "Ticket resolved", body: "Rated 5 out of 5" },
      { title: "MedUp activated", body: "Sana Clinics" },
    ],
  },
  apps: {
    title: "Switch on everything you need, in one click",
    sub: "Activate any REUP solution for your space whenever you need it. It runs without migrating or setting things up again.",
    image: "/images/v3/dashboard-apps-2.webp",
    video: "/media/reup-modules.mp4",
    imageAlt:
      "The Apps screen in the REUP dashboard: PropUp, MedUp, HRUp, CRM, Finance and Projects are active, with Inventory and Analytics available to switch on",
  },
  faq: { title: "Everything on your mind." },
  final: {
    title: "Let your business work for you",
    sub: "One space, one team, and the full picture of everything.",
    image: `${IMG}/solution-tasyil.png`,
  },
  form: {
    sectorQuestion: "What's your business?",
    addNote: "Add a note",
    noteLabel: "Your note",
    phonePrefix: "+966",
    privacy: "We only use your details to contact you about the demo.",
  },
  footer: { platform: "Platform", connect: "Get in touch" },
};

export const getV3 = (locale: Locale) => (locale === "ar" ? ar : en);
