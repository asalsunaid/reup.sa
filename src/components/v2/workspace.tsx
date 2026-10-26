"use client";
import { useId, useState } from "react";
import { GlobeHemisphereWest, LockKey, ArrowUpLeft, ArrowUpRight } from "@phosphor-icons/react";
import type { Locale } from "@/lib/content";


export function V2Workspace({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const [domain, setDomain] = useState("yourbrand");
  const id = useId();
  const Arrow = ar ? ArrowUpLeft : ArrowUpRight;
  return (
    <div className={"v2-workspace"}>
      <GlobeHemisphereWest size={46} weight="light" className={"v2-featureIcon"} aria-hidden />
      <h3>{ar ? "هويتك. نطاقك. مساحتك." : "Your brand. Your domain. Your space."}</h3>
      <p>{ar ? "من أول زيارة، يرى عملاؤك علامتك أنت. خصّص مساحتك بشعارك وألوانك ونطاقك الخاص." : "From the first visit, customers see your brand. Make your workspace yours with your logo, colors and domain."}</p>
      <label htmlFor={id}>{ar ? "جرّب اسم منشأتك" : "Try your business name"}</label>
      <div className={"v2-domainInput"} dir="ltr">
        <LockKey size={18} aria-hidden />
        <input id={id} value={domain} placeholder="yourbrand" autoComplete="off" spellCheck={false}
          maxLength={24} onChange={event => setDomain(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/^-+/, ""))} />
        <span>.reup.sa</span>
      </div>
      <p className={"v2-domainHint"} aria-live="polite">{ar ? "معاينة نطاقك:" : "Your domain preview:"} <b dir="ltr">{domain || "yourbrand"}.reup.sa</b></p>
      <a className={"v2-textLink"} href="#contact">{ar ? "احجز عرضاً" : "Book a demo"}<Arrow size={18} aria-hidden /></a>
    </div>
  );
}
