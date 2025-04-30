<script setup>
import { useBugsStore } from "@/stores/bugs";
import { onMounted, ref } from "vue";
import { groupBy } from "lodash";
import BugCard from "@/components/Bug/Card.vue";
import { useTranslation } from "i18next-vue";
import CvLink from "@/components/cv/Link.vue";
import "@carbon/web-components/es/components/accordion/index.js";
import "@carbon/web-components/es/components/button/index.js";
import "@carbon/web-components/es/components/icon-button/index.js";

const { t } = useTranslation();
const bugStore = useBugsStore();
const loading = ref(false);
const bugGroups = ref({});
onMounted(() => {
  loading.value = true;
  try {
    bugStore.loadBugs().finally(() => {
      const groups = groupBy(bugStore.bugs, "availability.location");
      const keys = Object.keys(groups);
      bugGroups.value = keys.map((key) => {
        return { location: key, bugs: groups[key] };
      });
      loading.value = false;
    });
  }
  catch (e) {
    console.error("error loading bugs from API", e.message);
  }
});
</script>

<template>
  <div class="w-full pl-14 mt-12">
    <div class="text-xl! text-center mb-8">
      {{ t("bugs") }}
    </div>
    <div>
      <CvLink
        id="build-a-bug"
        to="/build-a-bug"
        class="text-2xl! py-8!"
      >
        {{
          t("build-a-bug")
        }}
      </CvLink>
    </div>
    <div class="w-full">
      <cds-accordion-skeleton v-if="loading" />
      <cds-accordion v-else>
        <cds-accordion-item
          v-for="(group, index) in bugGroups"
          :key="`bug-group-${group.location}`"
          :open="index === 0"
        >
          <span slot="title">
            {{ group.location }} ({{ group.bugs.length }})
          </span>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              v-for="bug in group.bugs"
              :key="bug.key"
            >
              <BugCard :bug="bug" />
            </div>
          </div>
        </cds-accordion-item>
      </cds-accordion>
    </div>
  </div>
</template>
<style scoped>
</style>
