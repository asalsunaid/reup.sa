"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect } from "react";
import type { Locale } from "@/lib/content";
import { themeStorageKey } from "@/lib/theme";

export function ThemeToggle({ locale }: { locale: Locale }) {
  useEffect(() => {
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => {
      let saved;
      try {
        saved = localStorage.getItem(themeStorageKey);
      } catch {}
      document.documentElement.dataset.theme =
        saved === "light" || saved === "dark" ? saved : system.matches ? "dark" : "light";
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === themeStorageKey || event.key === null) syncTheme();
    };
    system.addEventListener("change", syncTheme);
    window.addEventListener("storage", onStorage);
    return () => {
      system.removeEventListener("change", syncTheme);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const dark = root.dataset.theme === "dark" ||
      (!root.dataset.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const next = dark ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={locale === "ar" ? "تغيير المظهر" : "Change theme"}
      className="btn btn-ghost btn-sm !h-11 !w-11 shrink-0 !px-0"
    >
      <span className="dark:hidden">
        <Moon size={18} weight="bold" aria-hidden="true" />
        <span className="sr-only">{locale === "ar" ? "التبديل إلى الوضع الغامق" : "Switch to dark mode"}</span>
      </span>
      <span className="hidden dark:inline">
        <Sun size={18} weight="bold" aria-hidden="true" />
        <span className="sr-only">{locale === "ar" ? "التبديل إلى الوضع الفاتح" : "Switch to light mode"}</span>
      </span>
    </button>
  );
}
