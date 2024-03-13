<template>
  <cv-grid>
    <cv-row>
      <cv-column>
        <cv-toggle-skeleton v-if="loading" />
        <cv-toggle
          v-model="showCatchPhrases"
          :label="t('catch-phrases')"
          class="mb-2"
        >
          <template #text-right>{{ t("yes") }}</template>
          <template #text-left>{{ t("no") }}</template>
        </cv-toggle>
        <cv-data-table-skeleton
          v-if="loading"
          :columns="[t('name'), t('price'), 'CJ', t('location'), t('rarity')]"
          :rows="7"
          :title="t('fish')"
          :helper-text="t('fish-info')"
        ></cv-data-table-skeleton>
        <cv-data-table
          v-else
          v-model:rows-selected="selectedFish"
          :pagination="i18nPagination"
          :zebra="true"
          :title="t('fish')"
          :helper-text="t('fish-info')"
          :batch-cancel-label="t('cancel')"
          :action-bar-aria-label="t('actions')"
          :collapse-all-aria-label="t('collapse-all')"
          :expand-all-aria-label="t('expand-all')"
          :select-all-aria-label="t('select-all')"
          :search-label="t('search')"
          :search-placeholder="t('search')"
          :search-clear-label="t('search-clear')"
          :expandable="true"
          @pagination="onPagination"
          @search="onSearch"
        >
          <template #items-selected="{ scope }">
            {{ t("selected-num", { count: scope.count }) }}
          </template>
          <template #of-n-pages="{ scope }">
            {{ t("pages-num", { count: scope.pages }) }}
          </template>
          <template #range-text="{ scope }">
            <!-- { "start": 1, "end": 7, "items": 80 } -->
            {{ t("range-text", scope) }}
          </template>
          <template #batch-actions>
            <cv-button :icon="hideIcon" @click="onHideSelected">{{
              t("hide")
            }}</cv-button>
          </template>
          <template v-if="fishStore.someHidden" #actions>
            <cv-data-table-action
              :aria-label="t('show')"
              :alt="t('show')"
              @click="toggleShowAll"
            >
              <hide-icon v-if="showHidden" class="bx--toolbar-action__icon">
                <title>{{ t("hide") }}</title>
              </hide-icon>
              <show-all-icon v-else class="bx--toolbar-action__icon">
                <title>{{ t("show") }}</title>
              </show-all-icon>
            </cv-data-table-action>
          </template>
          <template #headings>
            <cv-data-table-heading :heading="t('name')" name="name" sortable />
            <cv-data-table-heading heading="" />
            <cv-data-table-heading
              :heading="t('price')"
              name="price"
              sortable
            />
            <cv-data-table-heading heading="CJ" />
            <cv-data-table-heading :heading="t('location')" />
            <cv-data-table-heading :heading="t('rarity')" />
          </template>
          <template #data>
            <fish-row v-for="row in paginated" :key="row.key" :fish="row" />
          </template>
        </cv-data-table>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<script setup>
import { useFishStore } from "../stores/fish";
import FishRow from "../components/FishRow.vue";
import { computed, onMounted, ref, provide } from "vue";
import {
  View20 as ShowAllIcon,
  ViewOff20 as HideIcon,
} from "@carbon/icons-vue";
import { useTranslation } from "i18next-vue";

const { t } = useTranslation();
const hideIcon = HideIcon;
const fishStore = useFishStore();
const loading = ref(false);
const pagination = ref({ numberOfItems: 0, pageSizes: [7, 11, 23, 31] });
const i18nPagination = computed(() => {
  return {
    ...pagination.value,
    pageSizesLabel: t("items"),
    backwardText: t("previous-page"),
    forwardText: t("next-page"),
    pageNumberLabel: t("page-number"),
  };
});
onMounted(() => {
  loading.value = true;
  try {
    fishStore.loadFish().finally(() => {
      pagination.value.numberOfItems = fishStore.fish.length;
      loading.value = false;
    });
  } catch (e) {
    console.error("error loading fish from API");
  }
});
const searchFilter = ref("");
/**
 * Set search filter
 * @param {string} val
 */
function onSearch(val) {
  searchFilter.value = val?.trim();
}
const showHidden = ref(false);
const filteredFish = computed(() => {
  let show = showHidden.value
    ? fishStore.fish
    : fishStore.fish.filter((fish) => !fish.hidden);
  if (searchFilter.value) {
    show = show.filter((fish) => fish.key.includes(searchFilter.value));
  }
  return show;
});
function toggleShowAll() {
  showHidden.value = !showHidden.value;
}

const currentPagination = ref({ start: 1, length: 7 });
const paginated = computed(() => {
  const change = currentPagination.value;
  return filteredFish.value.slice(
    change.start - 1,
    change.start + change.length - 1,
  );
});
function onPagination(change) {
  currentPagination.value = change;
}
const selectedFish = ref([]);
function onHideSelected() {
  for (let i = 0; i < selectedFish.value.length; i++) {
    const key = selectedFish.value[i];
    fishStore.hideFish(key);
  }
  selectedFish.value = [];
}

const showCatchPhrases = ref(false);
provide("show-catch-phrases", showCatchPhrases);
</script>

<style scoped></style>
