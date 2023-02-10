import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useLanguageStore = defineStore("language", () => {
  const localLang = localStorage.getItem("language") || "en";
  const language = ref(localLang);
  const languages = ref([
    { language: "zh", title: "漢語", api: "CNzh", currency: "CNY" },
    { language: "de", title: "Deutsch", api: "EUde", currency: "EUR" },
    { language: "en", title: "English", api: "EUen", currency: "GBP" },
    { language: "es", title: "Español", api: "EUes", currency: "EUR" },
    { language: "fr", title: "français", api: "EUfr", currency: "EUR" },
    { language: "it", title: "italiano", api: "EUit", currency: "EUR" },
    { language: "nl", title: "Nederlands", api: "EUnl", currency: "EUR" },
    { language: "ru", title: "Русский язык", api: "EUru", currency: "RUB" },
    { language: "ja", title: "日本語", api: "JPja", currency: "JPY" },
    { language: "ko", title: "한국어", api: "KRko", currency: "KRW" },
    { language: "zh-TW", title: "臺語", api: "TWzh", currency: "TWD" },
  ]);

  /**
   * Set a new user language
   * @param {string} lang
   */
  function setLanguage(lang) {
    language.value = lang;
    localStorage.setItem("language", language.value);
  }

  const languageObject = computed(() => {
    return languages.value.find((o) => o.language === language.value);
  });

  const currencyFormat = ref(
    new Intl.NumberFormat(language.value, {
      style: "currency",
      currency: languageObject?.value.currency || "JPY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
  watch(languageObject, () => {
    currencyFormat.value = new Intl.NumberFormat(language.value, {
      style: "currency",
      currency: languageObject?.value.currency || "JPY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  });

  return { languages, language, languageObject, setLanguage, currencyFormat };
});
