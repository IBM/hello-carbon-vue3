<script setup>
import { computed, ref } from "vue";
import { useTranslation } from "i18next-vue";
import { Reset16 as Reset } from "@carbon/icons-vue";
import "@carbon/web-components/es/components/icon-button/index.js";
import "@carbon/web-components/es/components/progress-indicator/index.js";

const { /** @type function(string) */ t } = useTranslation();

const bugParts = [
  new URL("@/assets/build-a-bug/fly.png", import.meta.url).href,
  new URL("@/assets/build-a-bug/giant-stag.png", import.meta.url).href,
  new URL("@/assets/build-a-bug/monarch-butterfly.png", import.meta.url).href,
  new URL("@/assets/build-a-bug/orchid-mantis.png", import.meta.url).href,
  new URL("@/assets/build-a-bug/saw-stag.png", import.meta.url).href,
  new URL("@/assets/build-a-bug/tiger-beetle.png", import.meta.url).href,
];

const topIndex = ref(-1);
function top(val) {
  topIndex.value = val;
}
const topUrl = computed(() => {
  if (topIndex.value > -1)
    return { backgroundImage: `url(${bugParts[topIndex.value]})` };
  else return undefined;
});

const middleIndex = ref(-1);
function middle(val) {
  middleIndex.value = val;
}
const middleUrl = computed(() => {
  if (middleIndex.value > -1)
    return { backgroundImage: `url(${bugParts[middleIndex.value]})` };
  else return undefined;
});

const bottomIndex = ref(-1);
function bottom(val) {
  bottomIndex.value = val;
}
const bottomUrl = computed(() => {
  if (bottomIndex.value > -1)
    return { backgroundImage: `url(${bugParts[bottomIndex.value]})` };
  else return undefined;
});

function clearAll() {
  topIndex.value = -1;
  middleIndex.value = -1;
  bottomIndex.value = -1;
}

const step = computed(() => {
  if (middleIndex.value > -1) return "bottom";
  else if (topIndex.value > -1) return "middle";
  return "top";
});

const topState = computed(() => {
  if (topIndex.value > -1) return "complete";
  else if (step.value === "top") return "current";
  else return "incomplete";
});

const middleState = computed(() => {
  if (middleIndex.value > -1) return "complete";
  else if (step.value === "middle") return "current";
  else return "incomplete";
});

const bottomState = computed(() => {
  if (bottomIndex.value > -1) return "complete";
  else if (step.value === "bottom") return "current";
  else return "incomplete";
});

</script>

<template>
  <div class="w-full pl-14 mt-12">
    <div>
      <div class="text-3xl! py-8">
        {{ t("build-a-bug") }}
      </div>
      <cds-icon-button
        class="mb-5"
        @click="clearAll"
      >
        <Reset slot="icon" />
        <span slot="tooltip-content">reset</span>
      </cds-icon-button>
      <cds-progress-indicator
        :vertical="false"
        :space-equally="true"
      >
        <cds-progress-step
          :label="t('top')"
          :state="topState"
          :secondary-label-text="t('choose-top')"
        />
        <cds-progress-step
          :label="t('middle')"
          :state="middleState"
          :secondary-label-text="t('choose-middle')"
        />
        <cds-progress-step
          :label="t('bottom')"
          :state="bottomState"
          :secondary-label-text="t('choose-bottom')"
        />
      </cds-progress-indicator>
    </div>
    <div>
      <div class="mt-9">
        <section
          v-if="step === 'top'"
          class="flex justify-between"
        >
          <div
            v-for="(url, index) in bugParts"
            :key="`url-top-${index}`"
            class="h-[31px] w-[105px] bg-top bg-carbon-blue-20 mt-3 cursor-pointer bg-cover"
            :style="{ backgroundImage: `url(${url})` }"
            @click="top(index)"
          />
        </section>
        <section
          v-if="step === 'middle'"
          class="flex justify-between"
        >
          <div
            v-for="(url, index) in bugParts"
            :key="`url-middle-${index}`"
            class="h-[31px] w-[105px] bg-center bg-carbon-blue-20 mt-3 cursor-pointer bg-cover"
            :style="{ backgroundImage: `url(${url})` }"
            @click="middle(index)"
          />
        </section>
        <section
          v-if="step === 'bottom'"
          class="flex justify-between"
        >
          <div
            v-for="(url, index) in bugParts"
            :key="`url-middle-${index}`"
            class="h-[31px] w-[105px] bg-bottom bg-carbon-blue-20 mt-3 cursor-pointer bg-cover"
            :style="{ backgroundImage: `url(${url})` }"
            @click="bottom(index)"
          />
        </section>
      </div>
    </div>
    <div>
      <div class="mt-9">
        <div
          class="w-[422px] h-[125px] bg-carbon-blue-20 bg-top"
          :style="topUrl"
        />
        <div
          class="w-[422px] h-[125px] bg-center"
          :class="{
            'bg-carbon-blue-40': middleIndex === -1,
            'bg-carbon-blue-20': middleIndex !== -1,
          }"
          :style="middleUrl"
        />
        <div
          class="w-[422px] h-[125px] bg-bottom"
          :class="{
            'bg-carbon-blue-60': bottomIndex === -1,
            'bg-carbon-blue-20': bottomIndex !== -1,
          }"
          :style="bottomUrl"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
