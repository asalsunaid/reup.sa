import { CheckCircle, ShieldCheck } from "@phosphor-icons/react/ssr";
import type { Dict } from "@/lib/content";
import { BrandDemo } from "./brand-demo";
import { PaymentsFeed } from "./payments-feed";
import { QR } from "./qr";
import { Reveal } from "./reveal";
import { RolesList } from "./roles-list";

function CellText({ title, body, tone = "default" }: { title: string; body: string; tone?: "default" | "inverse" }) {
  return (
    <div className="max-w-[30rem]">
      <h3 className={`text-[1.2rem] font-semibold ${tone === "inverse" ? "text-white" : "text-ink"}`}>{title}</h3>
      <p className={`mt-2 text-[0.97rem] leading-[1.75] ${tone === "inverse" ? "text-white/90" : "text-muted"}`}>{body}</p>
    </div>
  );
}

export function Platform({ t }: { t: Dict["platform"] }) {
  return (
    <section id="platform" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal className="max-w-[44rem]">
          <h2 className="display text-[2.1rem] leading-[1.25] font-semibold text-ink sm:text-[2.9rem] sm:leading-[1.2]">
            {t.title}
          </h2>
          <p className="mt-5 max-w-[38rem] text-[1.06rem] leading-[1.85] text-muted">{t.sub}</p>
        </Reveal>
        <PlatformGrid t={t} className="mt-14" />
      </div>
    </section>
  );
}

/**
 * The five platform cells. `spot-cell` / `spot-dark` are hooks for pages that add a pointer spotlight (v3);
 * `interactive` turns the role permissions into toggles; `brandPreview` picks what the brand colours repaint.
 */
export function PlatformGrid({
  t,
  interactive = false,
  brandPreview = "store",
  className = "",
}: {
  t: Dict["platform"];
  interactive?: boolean;
  brandPreview?: "store" | "dashboard";
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 ${className}`}>
      {/* Brand + domain: interactive white-label demo */}
      <Reveal className="spot-cell flex flex-col justify-between gap-8 overflow-hidden rounded-[20px] border border-line bg-surface p-6 sm:p-8 md:col-span-2 lg:col-span-7">
        <CellText title={t.brand.title} body={t.brand.body} />
        <BrandDemo t={t.brand} preview={brandPreview} />
      </Reveal>

      {/* Payments feed */}
      <Reveal
        delay={0.06}
        className="spot-cell flex flex-col gap-7 rounded-[20px] border border-line bg-surface-2 p-6 sm:p-8 lg:col-span-5"
      >
        <CellText title={t.payments.title} body={t.payments.body} />
        <PaymentsFeed t={t.payments} />
      </Reveal>

      {/* E-invoicing: brand-gradient tile with a real QR invoice cut by the tile edge */}
      <Reveal className="spot-cell spot-dark group relative isolate flex min-h-[420px] flex-col overflow-hidden rounded-[20px] bg-[linear-gradient(155deg,#e2156c_0%,#c8005a_45%,#93004a_100%)] p-6 sm:p-8 lg:col-span-5">
        <div aria-hidden className="absolute -top-24 end-[-30%] -z-10 size-[360px] rounded-full bg-white/10 blur-3xl" />
        <CellText title={t.invoice.title} body={t.invoice.body} tone="inverse" />
        <div className="relative mt-8 flex flex-1 items-end justify-center">
          <div className="w-full max-w-[330px] translate-y-6 rotate-[-4deg] rounded-[16px] bg-[#fefeff] p-5 text-[#201751] shadow-[0_30px_60px_-20px_rgb(60_0_25/0.55)] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-y-3 group-hover:rotate-[-2deg]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold">{t.invoice.doc}</p>
                <p className="mt-1 font-mono text-[11px] text-[#6b6588]" dir="ltr">
                  {t.invoice.number}
                </p>
              </div>
              <QR value="https://reup.sa" size={64} className="shrink-0 rounded-[6px]" />
            </div>
            <dl className="mt-5 space-y-2 border-t border-dashed border-[#201751]/15 pt-4 text-[12.5px]">
              <div className="flex justify-between gap-3">
                <dt className="text-[#6b6588]">{t.invoice.subtotal}</dt>
                <dd className="tabular">
                  {t.invoice.amounts.subtotal} <span className="text-[#6b6588]">{t.invoice.currency}</span>
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#6b6588]">{t.invoice.vat}</dt>
                <dd className="tabular">
                  {t.invoice.amounts.vat} <span className="text-[#6b6588]">{t.invoice.currency}</span>
                </dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-[#201751]/10 pt-2.5 text-[14px] font-semibold">
                <dt>{t.invoice.total}</dt>
                <dd className="tabular">
                  {t.invoice.amounts.total} <span className="text-[12px] font-medium text-[#6b6588]">{t.invoice.currency}</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Reveal>

      {/* Roles and permissions */}
      <Reveal
        delay={0.06}
        className="spot-cell flex flex-col gap-7 rounded-[20px] border border-line bg-surface p-6 sm:p-8 lg:col-span-4"
      >
        <CellText title={t.roles.title} body={t.roles.body} />
        <RolesList t={t.roles} interactive={interactive} />
      </Reveal>

      {/* Isolation and security */}
      <Reveal
        delay={0.12}
        className="spot-cell spot-dark relative isolate flex flex-col gap-7 overflow-hidden rounded-[20px] bg-indigo p-6 sm:p-8 lg:col-span-3"
      >
        <div aria-hidden className="absolute -bottom-28 -start-20 -z-10 size-[300px] rounded-full bg-accent/30 blur-3xl" />
        <span className="grid size-12 place-items-center rounded-[14px] bg-white/10 text-white ring-1 ring-white/15">
          <ShieldCheck size={24} weight="duotone" />
        </span>
        <CellText title={t.security.title} body={t.security.body} tone="inverse" />
        <ul className="mt-auto space-y-3">
          {t.security.points.map((pt) => (
            <li key={pt} className="flex items-center gap-2.5 text-[13.5px] text-white/90">
              <CheckCircle size={17} weight="fill" className="shrink-0 text-[#ff6ba6]" aria-hidden />
              {pt}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
