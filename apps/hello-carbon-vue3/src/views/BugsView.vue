<script setup lang="ts">
import { useBugsStore } from "@/stores/bugs";
import { onMounted, ref } from "vue";
import { groupBy } from "lodash";
import BugCard from "@/components/BugCard.vue";
import { useTranslation } from "i18next-vue";

const { t } = useTranslation();
const bugStore = useBugsStore();
const loading = ref(false);
const loadError = ref(null);
const bugGroups = ref({});
onMounted(() => {
  loading.value = true;
  loadError.value = null;
  try {
    bugStore
      .loadBugs()
      .catch((e) => {
        console.error("error loading bugs from API", e?.message || e);
        loadError.value = e?.message || "Failed to load bugs";
      })
      .finally(() => {
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
    loadError.value = e?.message || "Failed to load bugs";
    loading.value = false;
  }
});
</script>

<template>
  <cv-grid>
    <cv-row>
      <cv-column>
        <div class="productive-heading-03 mb-8">
          {{ t("bugs") }}
        </div>
      </cv-column>
    </cv-row>
    <cv-row>
      <cv-column>
        <cv-link
          to="/build-a-bug"
          class="text-2xl py-8"
        >
          {{
            t("build-a-bug")
          }}
        </cv-link>
      </cv-column>
    </cv-row>
    <cv-row>
      <cv-column>
        <cv-inline-notification
          v-if="loadError"
          kind="error"
          title="Error"
          :subtitle="loadError"
          class="mb-4"
        />
        <cv-accordion-skeleton v-if="loading" />
        <cv-accordion v-else>
          <cv-accordion-item
            v-for="(group, index) in bugGroups"
            :key="`bug-group-${group.location}`"
            :open="index === 0"
          >
            <template #title>
              {{ group.location }} ({{ group.bugs.length }})
            </template>
            <template #content>
              <cv-grid :full-width="true">
                <cv-row>
                  <cv-column
                    v-for="bug in group.bugs"
                    :key="bug.id"
                    :lg="4"
                  >
                    <BugCard :bug="bug" />
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

<style scoped lang="scss"></style>
