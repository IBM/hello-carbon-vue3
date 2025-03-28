<script setup>
import { computed, ref } from "vue";
import { useTranslation } from "i18next-vue";
import {
  OpenPanelBottom32 as BottomIncomplete,
  OpenPanelFilledBottom32 as BottomComplete,
  OpenPanelTop32 as TopIncomplete,
  OpenPanelFilledTop32 as TopComplete,
  Reset32 as Reset,
} from "@carbon/icons-vue";

const { /** @type function(string) */ t } = useTranslation();

const bugParts = [
  new URL("@/assets/build-a-bug/fly.png", import.meta.url).href,
  new URL("@/assets/build-a-bug/giant-stag.png", import.meta.url).href,
  new URL("@/assets/build-a-bug/monarch-butterfly.png", import.meta.url).href,
  new URL("@/assets/build-a-bug/orchid-mantis.png", import.meta.url).href,
  new URL("@/assets/build-a-bug/saw-stag.png", import.meta.url).href,
  new URL("@/assets/build-a-bug/tiger-beetle.png", import.meta.url).href,
];
const step = ref(0);
function onStepClicked(val) {
  if (val.uid === "bug-head") step.value = 0;
  else if (val.uid === "bug-body") step.value = 1;
  else if (val.uid === "bug-bottom") step.value = 2;
}

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
</script>

<template>
  <cv-grid>
    <cv-row>
      <cv-column>
        <div class="text-3xl py-8">
          {{ t("build-a-bug") }}
        </div>
        <cv-icon-button
          label="reset"
          :icon="Reset"
          class="mb-5"
          @click="clearAll"
        />
        <cv-progress
          :vertical="false"
          :space-equally="true"
          :initial-step="step"
        >
          <cv-progress-step
            id="bug-head"
            :label="t('top')"
            :complete="topIndex > -1"
            :additional-info="t('choose-top')"
            @step-clicked="onStepClicked"
          >
            <template #step-icon>
              <top-complete v-if="topIndex > -1" />
              <top-incomplete v-else />
            </template>
          </cv-progress-step>
          <cv-progress-step
            id="bug-body"
            :label="t('middle')"
            :complete="middleIndex > -1"
            :additional-info="t('choose-middle')"
            @step-clicked="onStepClicked"
          />
          <cv-progress-step
            id="bug-bottom"
            :label="t('bottom')"
            :complete="bottomIndex > -1"
            :additional-info="t('choose-bottom')"
            @step-clicked="onStepClicked"
          >
            <template #step-icon>
              <bottom-complete v-if="bottomIndex > -1" />
              <bottom-incomplete v-else />
            </template>
          </cv-progress-step>
        </cv-progress>
      </cv-column>
    </cv-row>
    <cv-row>
      <cv-column>
        <div class="mt-9">
          <section
            v-if="step === 0"
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
            v-if="step === 1"
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
            v-if="step === 2"
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
      </cv-column>
    </cv-row>
    <cv-row>
      <cv-column>
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
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<style scoped></style>
