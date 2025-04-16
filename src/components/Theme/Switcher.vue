<script>
export default {
  name: "ThemeSwitcher",
};
</script>
<script setup>
import { useStorage } from "@vueuse/core";
import { onMounted, watch } from "vue";
import { useTranslation } from "i18next-vue";

const { t } = useTranslation();
const theme = useStorage("theme", "cds--g90");

const themes = [
  { id: "cds--white", name: t("theme-white") },
  { id: "cds--g10", name: t("theme-g10") },
  { id: "cds--g90", name: t("theme-g90") },
  { id: "cds--g100", name: t("theme-g100") },
];

function handleSetTheme() {
  themes.forEach((aTheme) => {
    if (aTheme.id === theme.value) {
      document.querySelector("body").classList.add(theme.value);
    }
    else document.querySelector("body").classList.remove(aTheme.id);
  });
}
watch(theme, () => handleSetTheme());
onMounted(() => handleSetTheme());
</script>
