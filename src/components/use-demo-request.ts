"use client";

import { useRef, useState, type FormEvent } from "react";
import type { Dict } from "@/lib/content";

export type DemoFields = { name: string; company: string; phone: string; sector: string; message: string };
export type DemoErrors = Partial<Record<keyof DemoFields, string>>;
export type DemoStatus = "idle" | "sending" | "success" | "error";

const EMPTY: DemoFields = { name: "", company: "", phone: "", sector: "", message: "" };

// Accepts 05XXXXXXXX, 5XXXXXXXX, +9665XXXXXXXX or 009665XXXXXXXX and returns 05XXXXXXXX.
export const normalizePhone = (v: string) => {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("00966")) d = d.slice(5);
  else if (d.startsWith("966")) d = d.slice(3);
  if (d.length === 9 && d.startsWith("5")) d = `0${d}`;
  return d;
};

/**
 * State, validation and submission for the "book a demo" form, shared by every page version.
 * `idPrefix` is the form's useId(); fields are expected at `${idPrefix}-${field}` so the first
 * invalid one can take focus. `focusOrder` lists fields in on-screen order so that "first" matches
 * what the visitor sees.
 */
const DEFAULT_ORDER: (keyof DemoFields)[] = ["name", "company", "phone", "sector", "message"];

export function useDemoRequest(
  f: Dict["contact"]["form"],
  idPrefix: string,
  onSent?: () => void,
  focusOrder: (keyof DemoFields)[] = DEFAULT_ORDER,
) {
  const [values, setValues] = useState<DemoFields>(EMPTY);
  const [errors, setErrors] = useState<DemoErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<DemoStatus>("idle");

  const validate = (v: DemoFields): DemoErrors => {
    const e: DemoErrors = {};
    if (!v.name.trim()) e.name = f.required;
    if (!v.company.trim()) e.company = f.required;
    if (!v.phone.trim()) e.phone = f.required;
    else if (!/^05\d{8}$/.test(normalizePhone(v.phone))) e.phone = f.invalidPhone;
    if (!v.sector) e.sector = f.required;
    return e;
  };

  const setField = (k: keyof DemoFields, value: string) => {
    const next = { ...values, [k]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };
  const set = (k: keyof DemoFields) => (ev: { target: { value: string } }) => setField(k, ev.target.value);

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setSubmitted(true);
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = focusOrder.find((k) => e[k]);
      document.getElementById(`${idPrefix}-${first}`)?.focus();
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
      onSent?.();
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
    setValues(EMPTY);
    setErrors({});
    setSubmitted(false);
    setStatus("idle");
  };

  return { values, errors, status, set, setField, onSubmit, reset, focusOnMount, focusFirstAfterReset };
}
