"use client";

import { CaretDown, CheckCircle, CircleNotch, EnvelopeSimple, MapPin, Phone, WarningCircle } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState, type FormEvent } from "react";
import { contact, type Dict, type Locale } from "@/lib/content";
import { ForwardArrowClient } from "./arrow-client";
import { Reveal } from "./reveal";

type Fields = { name: string; company: string; phone: string; sector: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EASE = [0.23, 1, 0.32, 1] as const;

// Accepts 05XXXXXXXX, 5XXXXXXXX, +9665XXXXXXXX or 009665XXXXXXXX and returns 05XXXXXXXX.
const normalizePhone = (v: string) => {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("00966")) d = d.slice(5);
  else if (d.startsWith("966")) d = d.slice(3);
  if (d.length === 9 && d.startsWith("5")) d = `0${d}`;
  return d;
};

export function Contact({ t, locale }: { t: Dict["contact"]; locale: Locale }) {
  const f = t.form;
  const id = useId();
  const reduce = useReducedMotion();
  const empty: Fields = { name: "", company: "", phone: "", sector: "", message: "" };
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const validate = (v: Fields): Errors => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = f.required;
    if (!v.company.trim()) e.company = f.required;
    if (!v.phone.trim()) e.phone = f.required;
    else if (!/^05\d{8}$/.test(normalizePhone(v.phone))) e.phone = f.invalidPhone;
    if (!v.sector) e.sector = f.required;
    return e;
  };

  const set = (k: keyof Fields) => (ev: { target: { value: string } }) => {
    const next = { ...values, [k]: ev.target.value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setSubmitted(true);
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = (Object.keys(e) as (keyof Fields)[])[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, phone: normalizePhone(values.phone) }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // Focus follows the state swap: success heading on send, first field after "send another".
  const refocusFirst = useRef(false);
  const focusOnMount = (el: HTMLElement | null) => el?.focus({ preventScroll: true });
  const focusFirstAfterReset = (el: HTMLInputElement | null) => {
    if (el && refocusFirst.current) {
      refocusFirst.current = false;
      el.focus({ preventScroll: true });
    }
  };

  const reset = () => {
    refocusFirst.current = true;
    setValues(empty);
    setErrors({});
    setSubmitted(false);
    setStatus("idle");
  };

  const inputCls = (k: keyof Fields) =>
    `w-full rounded-[12px] border bg-surface px-4 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-subtle focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)] ${
      errors[k] ? "border-accent" : "border-line-strong"
    }`;

  const field = (k: keyof Fields, label: string, input: React.ReactNode, hint?: string, optional?: boolean) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={`${id}-${k}`} className="flex items-baseline justify-between text-[14px] font-medium text-ink">
        {label}
        {optional && <span className="text-[12.5px] font-normal text-subtle">{f.optional}</span>}
      </label>
      {input}
      {errors[k] ? (
        <p id={`${id}-${k}-err`} className="flex items-center gap-1.5 text-[13px] font-medium text-accent">
          <WarningCircle size={15} weight="fill" aria-hidden />
          {errors[k]}
        </p>
      ) : hint ? (
        <p id={`${id}-${k}-hint`} className="text-[13px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );

  const describedBy = (k: keyof Fields, hasHint = false) =>
    errors[k] ? `${id}-${k}-err` : hasHint ? `${id}-${k}-hint` : undefined;

  return (
    <section id="contact" className="overflow-x-clip pb-24 sm:pb-32">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5 lg:pt-6">
          <h2 className="display text-[2.1rem] leading-[1.25] font-semibold text-ink sm:text-[2.9rem] sm:leading-[1.2]">
            {t.title}
          </h2>
          <p className="mt-5 max-w-[30rem] text-[1.06rem] leading-[1.85] text-muted">{t.sub}</p>

          <ul className="mt-10 space-y-3">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-4 rounded-[16px] p-2 -ms-2 transition-colors duration-200 hover:bg-surface"
              >
                <span className="grid size-11 place-items-center rounded-[13px] border border-line bg-surface text-ink">
                  <EnvelopeSimple size={19} aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-[12.5px] text-subtle">{t.emailLabel}</span>
                  <span className="mt-1 block text-[15px] font-medium text-ink">{contact.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${contact.phone}`}
                className="group flex items-center gap-4 rounded-[16px] p-2 -ms-2 transition-colors duration-200 hover:bg-surface"
              >
                <span className="grid size-11 place-items-center rounded-[13px] border border-line bg-surface text-ink">
                  <Phone size={19} aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-[12.5px] text-subtle">{t.phoneLabel}</span>
                  <span className="tabular mt-1 block text-[15px] font-medium text-ink" dir="ltr">
                    {contact.phoneDisplay}
                  </span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 p-2 -ms-2">
              <span className="grid size-11 place-items-center rounded-[13px] border border-line bg-surface text-ink">
                <MapPin size={19} aria-hidden />
              </span>
              <span className="leading-tight">
                <span className="block text-[12.5px] text-subtle">{t.addressLabel}</span>
                <span className="mt-1 block text-[15px] font-medium text-ink">{t.address}</span>
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.06} className="relative lg:col-span-7">
          <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-accent/[0.07] blur-3xl" />
          <div className="relative overflow-hidden rounded-[24px] border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-9">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "scale(0.97)", filter: "blur(4px)" }}
                  animate={{ opacity: 1, transform: "scale(1)", filter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex min-h-[460px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-accent-soft text-accent">
                    <CheckCircle size={34} weight="fill" aria-hidden />
                  </span>
                  <h3 ref={focusOnMount} tabIndex={-1} className="mt-6 text-[1.5rem] font-semibold text-ink outline-none">
                    {f.successTitle}
                  </h3>
                  <p className="mt-3 max-w-[22rem] text-[1rem] leading-[1.8] text-muted">{f.successBody}</p>
                  <button type="button" onClick={reset} className="btn btn-ghost btn-sm mt-8">
                    {f.again}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.15 } }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                >
                  {field(
                    "name",
                    f.name,
                    <input
                      id={`${id}-name`}
                      ref={focusFirstAfterReset}
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={set("name")}
                      aria-required
                      aria-invalid={!!errors.name}
                      aria-describedby={describedBy("name")}
                      className={`${inputCls("name")} h-12`}
                    />,
                  )}
                  {field(
                    "company",
                    f.company,
                    <input
                      id={`${id}-company`}
                      name="company"
                      autoComplete="organization"
                      value={values.company}
                      onChange={set("company")}
                      aria-required
                      aria-invalid={!!errors.company}
                      aria-describedby={describedBy("company")}
                      className={`${inputCls("company")} h-12`}
                    />,
                  )}
                  {field(
                    "phone",
                    f.phone,
                    <input
                      id={`${id}-phone`}
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      dir="ltr"
                      value={values.phone}
                      onChange={set("phone")}
                      aria-required
                      aria-invalid={!!errors.phone}
                      aria-describedby={describedBy("phone", true)}
                      className={`${inputCls("phone")} tabular h-12 ${locale === "ar" ? "text-right" : "text-left"}`}
                    />,
                    f.phoneHint,
                  )}
                  {field(
                    "sector",
                    f.sector,
                    <div className="relative">
                      <select
                        id={`${id}-sector`}
                        name="sector"
                        value={values.sector}
                        onChange={set("sector")}
                        aria-required
                        aria-invalid={!!errors.sector}
                        aria-describedby={describedBy("sector")}
                        className={`${inputCls("sector")} h-12 cursor-pointer appearance-none pe-11 ${values.sector ? "" : "text-subtle"}`}
                      >
                        <option value="" disabled>
                          {f.sectorPlaceholder}
                        </option>
                        {f.sectors.map((s) => (
                          <option key={s} value={s} className="text-ink">
                            {s}
                          </option>
                        ))}
                      </select>
                      <CaretDown
                        size={16}
                        className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-muted"
                        aria-hidden
                      />
                    </div>,
                  )}
                  <div className="sm:col-span-2">
                    {field(
                      "message",
                      f.message,
                      <textarea
                        id={`${id}-message`}
                        name="message"
                        rows={4}
                        value={values.message}
                        onChange={set("message")}
                        className={`${inputCls("message")} resize-none py-3 leading-[1.7]`}
                      />,
                      undefined,
                      true,
                    )}
                  </div>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="flex items-start gap-2 rounded-[12px] bg-accent-soft p-3.5 text-[14px] font-medium text-accent sm:col-span-2"
                    >
                      <WarningCircle size={18} weight="fill" className="mt-0.5 shrink-0" aria-hidden />
                      {f.error}
                    </p>
                  )}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn btn-primary h-[3.25rem] w-full disabled:cursor-progress disabled:opacity-80 sm:w-auto sm:min-w-[200px]"
                    >
                      {status === "sending" ? (
                        <>
                          <CircleNotch size={18} weight="bold" className="animate-spin motion-reduce:animate-none" aria-hidden />
                          {f.sending}
                        </>
                      ) : (
                        <>
                          {f.submit}
                          <ForwardArrowClient />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
