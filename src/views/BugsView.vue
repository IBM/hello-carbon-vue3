<template>
  <cv-grid>
    <cv-row>
      <cv-column>
        <div class="title">{{ t("bugs") }}</div>
      </cv-column>
    </cv-row>
    <cv-row>
      <cv-column>
        <cv-accordion-skeleton v-if="loading"></cv-accordion-skeleton>
        <cv-accordion v-else>
          <cv-accordion-item
            v-for="(group, index) in bugGroups"
            :key="`bug-group-${group.location}`"
            :open="index === 0"
          >
            <template v-slot:title
              >{{ group.location }} ({{ group.bugs.length }})
            </template>
            <template v-slot:content>
              <cv-grid :full-width="true">
                <cv-row>
                  <cv-column :lg="4" v-for="bug in group.bugs" :key="bug.key">
                    <bug-card :bug="bug" />
                  </cv-column>
                </cv-row>
              </cv-grid>
            </template>
          </cv-accordion-item>
        </cv-accordion>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<script setup>
import { useBugsStore } from "@/stores/bugs";
import { onMounted, ref } from "vue";
import { groupBy } from "lodash";
import BugCard from "@/components/BugCard.vue";
import { useTranslation } from "i18next-vue";

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
  } catch (e) {
    console.error("error loading bugs from API");
  }
});
</script>

<style scoped lang="scss">
@import "../styles/_theme.scss";
.title {
  @include carbon--type-style("productive-heading-03");
  margin-bottom: 2rem;
}
</style>
