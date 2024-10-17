import { createI18n } from "vue-i18n";
import en from "./en.json";
import zh from "./zh.json";
const messages = { zh: { ...zh }, en: { ...en } };
const i18n = createI18n({
  locale: localStorage.getItem("lang") || "zh",
  legacy: false,
  globalInjection: true,
  messages,
});
export default i18n;
