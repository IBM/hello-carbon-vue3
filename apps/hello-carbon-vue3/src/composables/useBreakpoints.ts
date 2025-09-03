import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

export type Breakpoints = {
  sm: Ref<boolean>;
  carbonSm: Ref<boolean>;
  md: Ref<boolean>;
  carbonMd: Ref<boolean>;
  lg: Ref<boolean>;
  xl: Ref<boolean>;
  xxl: Ref<boolean>;
  innerWidth: Ref<number>;
};

export const useBreakpoints = (): Breakpoints => {
  const sm = ref(false);
  const carbonSm = ref(false);
  const md = ref(false);
  const carbonMd = ref(false);
  const lg = ref(false);
  const xl = ref(false);
  const xxl = ref(false);
  const innerWidth = ref(0);

  function actionResize() {
    if (typeof window === "undefined") return;
    innerWidth.value = window.innerWidth;
    sm.value = window.innerWidth >= 640;
    carbonSm.value = window.innerWidth >= 320;
    md.value = window.innerWidth >= 768;
    carbonMd.value = window.innerWidth >= 672;
    lg.value = window.innerWidth >= 1024;
    xl.value = window.innerWidth >= 1280;
    xxl.value = window.innerWidth >= 1536;
  }
  onMounted(() => {
    actionResize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", actionResize);
    }
  });
  onBeforeUnmount(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", actionResize);
    }
  });

  return { sm, md, carbonMd, lg, xl, xxl, innerWidth, carbonSm };
};
