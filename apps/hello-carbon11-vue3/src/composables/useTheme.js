import { useStorage } from "@vueuse/core";
import { onMounted, watch } from "vue";

export const availableThemes = [
  { id: "cds--white", name: "theme-white" },
  { id: "cds--g10", name: "theme-g10" },
  { id: "cds--g90", name: "theme-g90" },
  { id: "cds--g100", name: "theme-g100" },
];

export const useTheme = () => {
  const theme = useStorage("theme", "cds--g90");

  function handleSetTheme() {
    availableThemes.forEach((aTheme) => {
      if (aTheme.id === theme.value) {
        document.querySelector("body").classList.add(theme.value);
      }
      else document.querySelector("body").classList.remove(aTheme.id);
    });
  }
  watch(theme, () => handleSetTheme());
  onMounted(() => handleSetTheme());

  return { theme };
};
