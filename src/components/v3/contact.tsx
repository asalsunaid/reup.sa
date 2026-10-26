"use client";

import {
  Buildings,
  ChatsCircle,
  CircleNotch,
  DotsThreeCircle,
  EnvelopeSimple,
  FirstAidKit,
  DeviceMobile,
  LockSimple,
  MapPin,
  NotePencil,
  Phone,
  Receipt,
  Storefront,
  User,
  Wallet,
  WarningCircle,
  ArrowLeft,
  ArrowRight,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState, type ReactNode } from "react";
import { contact, type Dict, type Locale } from "@/lib/content";
import ClickSpark, { type ClickSparkHandle } from "../bits/ClickSpark";
import { useDemoRequest, type DemoFields } from "../use-demo-request";
import type { V3Dict } from "./content";

const EASE = [0.23, 1, 0.32, 1] as const;
// Same order as contact.form.sectors in lib/content
const sectorIcons = [Buildings, FirstAidKit, Wallet, ChatsCircle, Receipt, DotsThreeCircle];
const FOCUS_ORDER: (keyof DemoFields)[] = ["sector", "name", "company", "phone", "message"];

export function V3Contact({ t, v, locale }: { t: Dict["contact"]; v: V3Dict; locale: Locale }) {
  const f = t.form;
  const id = useId();
  const reduce = useReducedMotion();
  const sparkRef = useRef<ClickSparkHandle>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [noteOpen, setNoteOpen] = useState(false);
  const Forward = locale === "ar" ? ArrowLeft : ArrowRight;

  // Celebrate a real send from the button's own spot; the spark layer is the card, so it outlives the form
  const celebrate = () => {
    const card = cardRef.current?.getBoundingClientRect();
    const btn = submitRef.current?.getBoundingClientRect();
    if (!card || !btn) return sparkRef.current?.spark();
    sparkRef.current?.spark(btn.left - card.left + btn.width / 2, btn.top - card.top + btn.height / 2);
  };

  // Sector comes first on screen in this form
  const { values, errors, status, set, setField, onSubmit, reset, focusOnMount, focusFirstAfterReset } = useDemoRequest(
    f,
    id,
    celebrate,
    FOCUS_ORDER,
  );

  const errId = (k: keyof DemoFields) => (errors[k] ? `${id}-${k}-err` : undefined);
  const fieldError = (k: keyof DemoFields) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} className="v3-fieldError">
        <WarningCircle size={15} weight="fill" aria-hidden />
        {errors[k]}
      </p>
    ) : null;

  const textField = (k: "name" | "company", label: string, icon: ReactNode, autoComplete: string) => (
    <div className="v3-field" data-invalid={!!errors[k] || undefined}>
      <label htmlFor={`${id}-${k}`}>{label}</label>
      <div className="v3-inputWrap">
        <span className="v3-inputIcon" aria-hidden>
          {icon}
        </span>
        <input
          id={`${id}-${k}`}
          ref={k === "name" ? focusFirstAfterReset : undefined}
          name={k}
          autoComplete={autoComplete}
          value={values[k]}
          onChange={set(k)}
          aria-required
          aria-invalid={!!errors[k]}
          aria-describedby={errId(k)}
        />
      </div>
      {fieldError(k)}
    </div>
  );

  return (
    <section id="contact" className="v3-band v3-contactBand">
      <div className="v3-container v3-contactGrid">
        <div className="v3-contactIntro">
          <h2>{t.title}</h2>
          <p>{t.sub}</p>
          <ul className="v3-contactWays">
            <li>
              <a href={`mailto:${contact.email}`}>
                <span className="v3-wayIcon">
                  <EnvelopeSimple size={19} aria-hidden />
                </span>
                <span>
                  <small>{t.emailLabel}</small>
                  {contact.email}
                </span>
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone}`}>
                <span className="v3-wayIcon">
                  <Phone size={19} aria-hidden />
                </span>
                <span>
                  <small>{t.phoneLabel}</small>
                  <span dir="ltr">{contact.phoneDisplay}</span>
                </span>
              </a>
            </li>
            <li>
              <span className="v3-wayIcon">
                <MapPin size={19} aria-hidden />
              </span>
              <span>
                <small>{t.addressLabel}</small>
                {t.address}
              </span>
            </li>
          </ul>
        </div>

        <ClickSpark
          ref={sparkRef}
          trigger="manual"
          sparkColor={["#d6005a", "#ff8fbd", "#7b6cf0"]}
          sparkCount={14}
          sparkSize={14}
          sparkRadius={64}
          duration={700}
          shape="line"
          className="v3-formCardWrap"
        >
          <div ref={cardRef} className="v3-formCard">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="done"
                  className="v3-formDone"
                  role="status"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "scale(0.96)", filter: "blur(4px)" }}
                  animate={{ opacity: 1, transform: "scale(1)", filter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <svg viewBox="0 0 64 64" className="v3-doneMark" aria-hidden>
                    <circle cx="32" cy="32" r="30" />
                    <motion.path
                      d="M19 33.5 28 42 45 23"
                      initial={reduce ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
                    />
                  </svg>
                  <h3 ref={focusOnMount} tabIndex={-1}>
                    {f.successTitle}
                  </h3>
                  <p>{f.successBody}</p>
                  <button type="button" onClick={reset} className="v3-btn v3-btn-outline v3-btn-sm">
                    {f.again}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  className="v3-form"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.15 } }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {/* Sector first: one tap answers the question sales asks first. Native radios keep arrow-key moves. */}
                  <fieldset className="v3-sectors" aria-describedby={errId("sector")} data-invalid={!!errors.sector || undefined}>
                    <legend>{v.form.sectorQuestion}</legend>
                    <div className="v3-chips">
                      {f.sectors.map((s, i) => {
                        const Icon = sectorIcons[i] ?? DotsThreeCircle;
                        const checked = values.sector === s;
                        return (
                          <label key={s} className="v3-sectorChip" data-checked={checked || undefined}>
                            <input
                              type="radio"
                              name="sector"
                              id={i === 0 ? `${id}-sector` : undefined}
                              value={s}
                              checked={checked}
                              onChange={() => setField("sector", s)}
                            />
                            {checked && (
                              <motion.span
                                layoutId={`${id}-glide`}
                                className="v3-chipGlide"
                                transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.4, bounce: 0.15 }}
                                aria-hidden
                              />
                            )}
                            <Icon size={18} weight={checked ? "fill" : "regular"} aria-hidden />
                            <span>{s}</span>
                          </label>
                        );
                      })}
                    </div>
                    {fieldError("sector")}
                  </fieldset>

                  <div className="v3-fieldRow">
                    {textField("name", f.name, <User size={18} />, "name")}
                    {textField("company", f.company, <Storefront size={18} />, "organization")}
                  </div>

                  <div className="v3-field" data-invalid={!!errors.phone || undefined}>
                    <label htmlFor={`${id}-phone`}>{f.phone}</label>
                    <div className="v3-inputWrap v3-phoneWrap" dir="ltr">
                      <span className="v3-prefix" aria-hidden>
                        <DeviceMobile size={16} />
                        {v.form.phonePrefix}
                      </span>
                      <input
                        id={`${id}-phone`}
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        dir="ltr"
                        value={values.phone}
                        onChange={set("phone")}
                        aria-required
                        aria-invalid={!!errors.phone}
                        aria-describedby={errId("phone")}
                      />
                    </div>
                    {fieldError("phone")}
                  </div>

                  {/* Optional note stays one click away so the required path reads short */}
                  <div className="v3-note">
                    <button
                      type="button"
                      className="v3-noteToggle"
                      aria-expanded={noteOpen || !!values.message}
                      aria-controls={`${id}-message-wrap`}
                      onClick={() => setNoteOpen((o) => !o)}
                    >
                      <NotePencil size={17} aria-hidden />
                      {v.form.addNote}
                      <span>{f.optional}</span>
                    </button>
                    <div
                      id={`${id}-message-wrap`}
                      className="accordion-panel"
                      data-open={noteOpen || !!values.message}
                      inert={!(noteOpen || !!values.message)}
                    >
                      <div>
                        <label htmlFor={`${id}-message`} className="sr-only">
                          {v.form.noteLabel}
                        </label>
                        <textarea
                          id={`${id}-message`}
                          name="message"
                          rows={3}
                          value={values.message}
                          onChange={set("message")}
                          className="v3-textarea"
                        />
                      </div>
                    </div>
                  </div>

                  {status === "error" && (
                    <p role="alert" className="v3-formAlert">
                      <WarningCircle size={18} weight="fill" aria-hidden />
                      {f.error}
                    </p>
                  )}

                  <button
                    ref={submitRef}
                    type="submit"
                    disabled={status === "sending"}
                    className="v3-btn v3-btn-primary v3-submit"
                  >
                    {status === "sending" ? (
                      <>
                        <CircleNotch size={18} weight="bold" className="animate-spin motion-reduce:animate-none" aria-hidden />
                        {f.sending}
                      </>
                    ) : (
                      <>
                        {v.cta}
                        <Forward size={18} weight="bold" aria-hidden />
                      </>
                    )}
                  </button>
                  <p className="v3-privacy">
                    <LockSimple size={14} aria-hidden />
                    {v.form.privacy}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </ClickSpark>
      </div>
    </section>
  );
}
