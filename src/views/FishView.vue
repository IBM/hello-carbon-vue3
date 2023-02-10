<template>
  <cv-grid>
    <cv-row>
      <cv-column>
        <cv-data-table
          v-model:rows-selected="selectedFish"
          :pagination="i18nPagination"
          :zebra="true"
          :title="t('fish')"
          :helperText="t('fish-info')"
          :batchCancelLabel="t('cancel')"
          :actionBarAriaLabel="t('actions')"
          :collapseAllAriaLabel="t('collapse-all')"
          :expandAllAriaLabel="t('expand-all')"
          :selectAllAriaLabel="t('select-all')"
          :searchLabel="t('search')"
          :searchPlaceholder="t('search')"
          :searchClearLabel="t('search-clear')"
          @pagination="onPagination"
        >
          <template v-slot:items-selected="{ scope }">
            {{ t("selected-num", { count: scope.count }) }}
          </template>
          <template v-slot:of-n-pages="{ scope }">
            {{ t("pages-num", { count: scope.pages }) }}
          </template>
          <template v-slot:range-text="{ scope }">
            <!-- { "start": 1, "end": 7, "items": 80 } -->
            {{ t("range-text", scope) }}
          </template>
          <template v-slot:batch-actions>
            <cv-button :icon="hideIcon" @click="onHideSelected">{{
              t("hide")
            }}</cv-button>
          </template>
          <template v-slot:actions v-if="fishStore.someHidden">
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
          <template v-slot:headings>
            <cv-data-table-heading :heading="t('name')" name="name" sortable />
            <cv-data-table-heading
              :heading="t('price')"
              name="price"
              sortable
            />
            <cv-data-table-heading heading="CJ" />
            <cv-data-table-heading :heading="t('location')" />
            <cv-data-table-heading :heading="t('rarity')" />
          </template>
          <template v-slot:data>
            <fish-row v-for="row in paginated" :fish="row" :key="row.key" />
          </template>
        </cv-data-table>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<script setup>
import { useFishStore } from "../stores/fish";
import FishRow from "../components/FishRow.vue";
import { computed, onMounted, ref, watch } from "vue";
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
onMounted(async () => {
  loading.value = true;
  try {
    await fishStore.loadFish();
  } catch (e) {
    console.error("error loading fish from API");
  }
  pagination.value.numberOfItems = fishStore.fish.length;
  loading.value = false;
});

const showHidden = ref(false);
const filteredFish = computed(() => {
  return fishStore.fish.filter((fish) => showHidden.value || !fish.hidden);
});
function toggleShowAll() {
  showHidden.value = !showHidden.value;
}

const currentPagination = ref({ start: 1, length: 7 });
const paginated = computed(() => {
  const change = currentPagination.value;
  return filteredFish.value.slice(
    change.start - 1,
    change.start + change.length - 1
  );
});
function onPagination(change) {
  currentPagination.value = change;
}
watch(filteredFish, () => {
  console.log("changed filteredFish");
});

const selectedFish = ref([]);
function onHideSelected() {
  console.log("hide selected");
  for (let i = 0; i < selectedFish.value.length; i++) {
    const key = selectedFish.value[i];
    console.log("hide", key);
    fishStore.hideFish(key);
  }
  selectedFish.value = [];
}
</script>

<style scoped></style>
