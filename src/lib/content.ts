export type Locale = "ar" | "en";

const IMG = "https://reup.sa/images";

export const contact = {
  email: "info@reup.sa",
  phone: "+966555240039",
  phoneDisplay: "+966 55 524 0039",
};

// `opaque` marks artwork exported with a solid white backdrop; it gets blended out instead of silhouetted.
export const partners = [
  { name: "Ehya", src: `${IMG}/partner-ehya.webp`, width: 256, height: 175, opaque: false },
  { name: "Bassim Clinic", src: `${IMG}/partner-bassim.svg`, width: 176, height: 81, opaque: false },
  { name: "Tasyil", src: `${IMG}/partner-tasyil.svg`, width: 1081, height: 325, opaque: true },
  { name: "Awqef", src: `${IMG}/awqef.svg`, width: 442, height: 180, opaque: false },
  { name: "Slabh Contracting", src: `${IMG}/slabh.png`, width: 125, height: 100, opaque: false },
];

const ar = {
  meta: {
    title: "REUP | منصة أعمال سعودية لإدارة منشأتك",
    description:
      "REUP تمنح كل منشأة مساحتها الرقمية الخاصة: عقارات، عيادات، تمويل، تجربة عملاء، وفوترة إلكترونية من لوحة تحكم واحدة.",
  },
  nav: {
    label: "التنقل الرئيسي",
    lang: { label: "English", code: "en" },
    open: "فتح القائمة",
    close: "إغلاق القائمة",
    home: "REUP، الصفحة الرئيسية",
  },
  platform: {
    brand: {
      title: "هويتك ونطاقك",
      body: "شعارك وألوانك ونطاق فرعي أو نطاقك الخاص. عملاؤك يرون علامتك أنت.",
      inputLabel: "جرّب نطاقك",
      colorsLabel: "لون العلامة",
      colorNames: ["توتي", "نيلي", "زمردي", "كهرماني", "محيطي"],
    },
    payments: {
      title: "مدفوعات لحظية",
      body: "مدى وApple Pay والبطاقات، وكل عملية تظهر في لوحتك فور حدوثها.",
      items: [
        { method: "مدى", detail: "•••• 4821", amount: "1,250" },
        { method: "Apple Pay", detail: "iPhone", amount: "640" },
        { method: "Visa", detail: "•••• 0193", amount: "3,900" },
        { method: "Mastercard", detail: "•••• 7710", amount: "870" },
      ],
      received: "دفعة مستلمة",
      currency: "ر.س",
    },
    invoice: {
      title: "فوترة إلكترونية متوافقة",
      body: "فواتير ضريبية برمز QR، مصممة لمتطلبات المرحلة الثانية من فاتورة.",
      doc: "فاتورة ضريبية مبسطة",
      number: "INV-2026-0418",
      subtotal: "المجموع قبل الضريبة",
      vat: "ضريبة القيمة المضافة 15%",
      total: "الإجمالي",
      amounts: { subtotal: "1,250.00", vat: "187.50", total: "1,437.50" },
      currency: "ر.س",
    },
    roles: {
      title: "صلاحيات لكل فرد",
      body: "أدوار للمالك والمحاسب والاستقبال، وكل شخص يرى ما يخصه فقط.",
      permissions: ["المواعيد", "الفواتير", "التقارير", "الإعدادات"],
      allowed: "مسموح",
      blocked: "غير مسموح",
      people: [
        { name: "عبدالله المطيري", role: "المالك", initial: "ع" },
        { name: "نورة الزهراني", role: "محاسبة", initial: "ن" },
        { name: "فهد القحطاني", role: "استقبال", initial: "ف" },
      ],
    },
    security: {
      title: "بياناتك خاصة فيك",
      body: "بيانات منشأتك محمية ومنفصلة، ولا يطّلع عليها إلا فريقك.",
      points: ["مساحة خاصة لكل منشأة", "تشفير أثناء النقل والتخزين", "سجل تدقيق لكل عملية"],
    },
  },
  impact: {
    stats: [
      { value: 500, prefix: "+", suffix: "", label: "مستخدم نشط يعتمد على خدمات REUP" },
      { value: 20000, prefix: "+", suffix: "", label: "عملية مكتملة بنجاح" },
      { value: 95, prefix: "", suffix: "%", label: "نسبة رضا العملاء" },
    ],
  },
  faq: {
    items: [
      {
        q: "هل بيانات منشأتي خاصة ومحمية؟",
        a: "نعم. لكل منشأة مساحة خاصة بها، وبياناتها منفصلة تماماً عن غيرها ومشفّرة، ونتولى نحن الأمان والتحديثات بدلاً عنك.",
      },
      {
        q: "من يستطيع الاطلاع على بياناتي؟",
        a: "فريقك فقط، وبحسب الصلاحيات التي تحددها لكل شخص: المالك يرى كل شيء، والمحاسب يرى الفواتير والتقارير، والاستقبال يرى المواعيد.",
      },
      {
        q: "هل يمكنني استخدام نطاقي الخاص؟",
        a: "نعم. تبدأ بنطاق فرعي على reup.sa، ويمكنك ربط نطاقك الخاص في أي وقت من الإعدادات.",
      },
      {
        q: "هل الفوترة متوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك؟",
        a: "حل الفوترة الإلكترونية مصمم لمتطلبات المرحلة الثانية (الربط والتكامل)، ويصدر فواتير برمز QR وتوقيع إلكتروني.",
      },
      {
        q: "هل أستطيع البدء بحل واحد ثم التوسع؟",
        a: "بالتأكيد. فعّل الحل الذي تحتاجه الآن، وأضف بقية الحلول لاحقاً دون نقل بياناتك أو تغيير حسابك.",
      },
    ],
  },
  contact: {
    title: "جاهز تطلق مساحتك على REUP؟",
    sub: "احجز عرضاً مخصصاً لقطاعك، وسيتواصل معك فريقنا لترتيب موعد يناسبك.",
    address: "طريق الخليج، الشاطئ الغربي، الدمام 32413",
    emailLabel: "البريد",
    phoneLabel: "الهاتف",
    addressLabel: "العنوان",
    form: {
      name: "الاسم الكامل",
      company: "اسم المنشأة",
      phone: "رقم الجوال",
      sectors: ["العقارات", "الرعاية الصحية", "التمويل", "تجربة العملاء", "الفوترة الإلكترونية", "قطاع آخر"],
      optional: "اختياري",
      sending: "جارٍ الإرسال",
      required: "هذا الحقل مطلوب",
      invalidPhone: "أدخل رقم جوال سعودي صحيح يبدأ بـ 05",
      successTitle: "وصلنا طلبك",
      successBody: "شكراً لك. سنتواصل معك قريباً لترتيب العرض.",
      again: "إرسال طلب آخر",
      error: "تعذّر الإرسال. حاول مرة أخرى أو راسلنا على info@reup.sa",
    },
  },
  footer: {
    tagline: "منصة أعمال سعودية تجمع حلول منشأتك في مكان واحد.",
    solutionsTitle: "الحلول",
    rights: "جميع الحقوق محفوظة.",
  },
};

export type Dict = typeof ar;

const en: Dict = {
  meta: {
    title: "REUP | A Saudi platform to run your business",
    description:
      "REUP gives every business its own digital workspace: real estate, clinics, finance, customer experience and e-invoicing, run from one dashboard.",
  },
  nav: {
    label: "Primary",
    lang: { label: "العربية", code: "ar" },
    open: "Open menu",
    close: "Close menu",
    home: "REUP home",
  },
  platform: {
    brand: {
      title: "Your brand, your domain",
      body: "Your logo, your colors, a subdomain or your own domain. Customers only ever see your brand.",
      inputLabel: "Try your subdomain",
      colorsLabel: "Brand color",
      colorNames: ["Raspberry", "Indigo", "Emerald", "Amber", "Ocean"],
    },
    payments: {
      title: "Real-time payments",
      body: "mada, Apple Pay and cards, with every transaction on your dashboard the moment it lands.",
      items: [
        { method: "mada", detail: "•••• 4821", amount: "1,250" },
        { method: "Apple Pay", detail: "iPhone", amount: "640" },
        { method: "Visa", detail: "•••• 0193", amount: "3,900" },
        { method: "Mastercard", detail: "•••• 7710", amount: "870" },
      ],
      received: "Payment received",
      currency: "SAR",
    },
    invoice: {
      title: "Compliant e-invoicing",
      body: "Tax invoices with QR codes, built for Phase 2 of ZATCA's FATOORA.",
      doc: "Simplified tax invoice",
      number: "INV-2026-0418",
      subtotal: "Subtotal",
      vat: "VAT 15%",
      total: "Total",
      amounts: { subtotal: "1,250.00", vat: "187.50", total: "1,437.50" },
      currency: "SAR",
    },
    roles: {
      title: "Roles for everyone",
      body: "Owner, accountant and front desk roles. Everyone sees only what they need.",
      permissions: ["Calendar", "Invoices", "Reports", "Settings"],
      allowed: "allowed",
      blocked: "not allowed",
      people: [
        { name: "Abdullah Almutairi", role: "Owner", initial: "A" },
        { name: "Noura Alzahrani", role: "Accountant", initial: "N" },
        { name: "Fahad Alqahtani", role: "Front desk", initial: "F" },
      ],
    },
    security: {
      title: "Your data stays yours",
      body: "Your business data is protected and kept separate. Only your team can see it.",
      points: ["A private space for every business", "Encrypted in transit and at rest", "Audit log for every action"],
    },
  },
  impact: {
    stats: [
      { value: 500, prefix: "+", suffix: "", label: "Active users relying on REUP services" },
      { value: 20000, prefix: "+", suffix: "", label: "Operations completed successfully" },
      { value: 95, prefix: "", suffix: "%", label: "Customer satisfaction rate" },
    ],
  },
  faq: {
    items: [
      {
        q: "Is my business data private and protected?",
        a: "Yes. Every business gets its own private space. Its data is fully separated from others and encrypted, and we handle security and updates for you.",
      },
      {
        q: "Who can see my data?",
        a: "Only your team, based on the permissions you set for each person: the owner sees everything, the accountant sees invoices and reports, and the front desk sees appointments.",
      },
      {
        q: "Can I use my own domain?",
        a: "Yes. You start on a reup.sa subdomain and can connect your own domain at any time from settings.",
      },
      {
        q: "Is invoicing compliant with ZATCA requirements?",
        a: "Our e-invoicing solution is built for Phase 2 (integration) requirements and issues invoices with a QR code and cryptographic stamp.",
      },
      {
        q: "Can I start with one solution and expand later?",
        a: "Absolutely. Switch on the solution you need now and add the rest later, without migrating data or changing accounts.",
      },
    ],
  },
  contact: {
    title: "Ready to launch your space on REUP?",
    sub: "Book a demo tailored to your sector and our team will reach out to find a time that suits you.",
    address: "Khaleej Road, West Beach, Dammam 32413, Saudi Arabia",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    form: {
      name: "Full name",
      company: "Business name",
      phone: "Mobile number",
      sectors: ["Real estate", "Healthcare", "Finance", "Customer experience", "E-invoicing", "Other"],
      optional: "Optional",
      sending: "Sending",
      required: "This field is required",
      invalidPhone: "Enter a valid Saudi mobile number starting with 05",
      successTitle: "Request received",
      successBody: "Thank you. We'll be in touch shortly to schedule your demo.",
      again: "Send another request",
      error: "Couldn't send. Try again or email us at info@reup.sa",
    },
  },
  footer: {
    tagline: "A Saudi business platform that brings your solutions together in one place.",
    solutionsTitle: "Solutions",
    rights: "All rights reserved.",
  },
};

export const dictionaries: Record<Locale, Dict> = { ar, en };

export const getDict = (locale: Locale) => dictionaries[locale];
