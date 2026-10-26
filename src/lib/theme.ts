export const themeStorageKey = "reup-theme";

// Runs in the document head so a saved preference is applied before the first paint.
export const themeScript = `(() => {
  let theme;
  try { theme = localStorage.getItem("${themeStorageKey}"); } catch {}
  if (theme !== "light" && theme !== "dark") {
    theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.dataset.theme = theme;
})();`;
