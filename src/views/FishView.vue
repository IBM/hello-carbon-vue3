<script setup>
import { useFishStore } from "../stores/fish";
import FishRow from "../components/FishRow.vue";
import { computed, onMounted, ref, provide, watch, nextTick, reactive } from "vue";
import {
  View16 as ShowAllIcon,
  ViewOff16 as HideIcon,
} from "@carbon/icons-vue";
import { useTranslation } from "i18next-vue";
import FishRowEmpty from "@/components/FishRowEmpty.vue";
import { useLanguageStore } from "@/stores/language.js";
import "@carbon/web-components/es/components/toggle/index.js";
import "@carbon/web-components/es/components/text-input/index.js";
import "@carbon/web-components/es/components/data-table/index.js";
import "@carbon/web-components/es/components/icon-button/index.js";
import "@carbon/web-components/es/components/pagination/index.js";

const { t, i18next } = useTranslation();
const langStore = useLanguageStore();

const fishStore = useFishStore();
const loading = ref(false);
const pagination = reactive({
  numberOfItems: 0,
  pageSizes: [7, 11, 23, 31],
});
function formatStatusWithDeterminateTotal({ start, end, count }) {
  return t("range-text", { start, end, items: count });
}
function formatSupplementalText({ count }) {
  return t("pages-num", { count });
}
onMounted(() => {
  loading.value = true;
  try {
    fishStore.loadFish().finally(() => {
      pagination.numberOfItems = fishStore.fish.length;
      loading.value = false;
    });
  }
  catch (e) {
    console.error("error loading fish from API", e.message);
  }
});
const sortKeys = reactive({ order: "none", name: null });
const sorting = ref(false);
/**
 * Sort the fish
 * @param {CustomEvent} evt { oldSortDirection: "none", sortDirection: "ascending" }
 */
function onSort(evt) {
  sortKeys.name = evt?.target?.dataset?.name;
  sortKeys.order = evt?.detail?.sortDirection;
  sorting.value = true;
  setTimeout(() => sorting.value = false, 0);
}

const searchFilter = ref("");
/**
 * Set search filter
 * @param {CustomEvent} evt { value: "input value" }
 */
function onSearch(evt) {
  searchFilter.value = evt?.detail?.value?.trim();
  currentPagination.page = 1;
}
const showHidden = ref(false);
const filteredFish = computed(() => {
  // start with all the fish
  /** @type {Array<FishData>} */
  let show = fishStore.fish;

  // if we are not showing hidden fish, remove them
  if (!showHidden.value) show = show.filter(fish => !fish.hidden);

  // if we have search term, filter based on that term
  if (searchFilter.value)
    show = show.filter(fish => fish.key.includes(searchFilter.value));

  // If we are sorting the data, do that here
  if (sortKeys.order !== "none") {
    show.sort((a, b) => {
      const _a = a[sortKeys.name]; // fish name or price
      const _b = b[sortKeys.name]; // fish name or price
      let cmp = 0;
      // sort by price (or some other number value that may get added later)
      if (typeof _a === "number") {
        cmp = _a - _b;
      }
      // or sort by name
      else if (sortKeys.name === "name") {
        const key = "name-" + langStore.languageObject.api;
        const nameA = _a[key] || "";
        const nameB = _b[key] || "";
        cmp = nameA.localeCompare(nameB, i18next.language);
      }
      // reverse the sort
      if (sortKeys.order === "descending") cmp = -cmp;
      return cmp;
    });
  }
  return show;
});
watch(filteredFish, () => {
  pagination.numberOfItems = filteredFish.value.length;
});

function toggleShowAll() {
  showHidden.value = !showHidden.value;
}

const currentPagination = reactive({ page: 1, pageSize: 7 });
const paginated = computed(() => {
  const change = {
    start: (currentPagination.page - 1) * currentPagination.pageSize,
    length: currentPagination.pageSize,
  };
  return filteredFish.value.slice(
    change.start,
    change.start + change.length,
  );
});
function onPagination(change) {
  currentPagination.page = parseInt(change.detail.page, 10);
  currentPagination.pageSize = parseInt(change.detail.pageSize, 10);
}

const activeBatchActions = ref(false);
function onHideSelected() {
  document
    .querySelectorAll("cds-table-row").forEach((r) => {
      const checked = r.shadowRoot.querySelector("cds-checkbox")
        .shadowRoot.querySelector("input:checked");
      if (checked) {
        const key = checked.getAttribute("value");
        if (key) fishStore.hideFish(key);
        checked.click(); // clear this checkbox
      }
    });

  // close the batch actions
  activeBatchActions.value = true;
  nextTick(() => activeBatchActions.value = false);
}

const showCatchPhrases = ref(false);
provide("show-catch-phrases", showCatchPhrases);

/**
 * @param {InputEvent} evt
 */
function handleToggleChanged(evt) {
  showCatchPhrases.value = evt.target.checked;
}
</script>

<template>
  <div class="w-full pl-14 mt-12">
    <div>
      <cds-text-input-skeleton v-if="loading" />
      <div class="mb-2">
        <cds-toggle
          :label-a="$t('yes')"
          :label-text="$t('catch-phrases')"
          :label-b="$t('no')"
          value="catch-phrase"
          @cds-toggle-changed="handleToggleChanged"
        />
      </div>
      <cds-table-skeleton
        v-if="loading"
        :headers="[t('name'), t('price'), 'CJ', t('location'), t('rarity')]"
        :rows="7"
        :title="t('fish')"
        :helper-text="t('fish-info')"
      />
      <cds-table
        v-else
        is-selectable="true"
        :expandable="showCatchPhrases || null"
        :custom-sort-row="null"
        @cds-search-input="onSearch"
      >
        <cds-table-header-title slot="title">
          {{ t('fish') }}
        </cds-table-header-title>
        <cds-table-header-description slot="description">
          {{ t('fish-info') }}
        </cds-table-header-description>
        <cds-table-toolbar slot="toolbar">
          <cds-table-batch-actions :active="activeBatchActions">
            <cds-button slot="cancel-button-content">
              {{ t('cancel') }}
            </cds-button>
            <cds-button
              id="batch-action-cancel-btn"
              @click="onHideSelected"
            >
              <HideIcon slot="icon" />
              {{
                t("hide")
              }}
            </cds-button>
          </cds-table-batch-actions>
          <cds-table-toolbar-content>
            <cds-table-toolbar-search
              :placeholder="t('search')"
            />
            <cds-icon-button
              v-if="showHidden"
              kind="ghost"
              size="md"
              align="left"
              @click="toggleShowAll"
            >
              <HideIcon slot="icon" />
              <span slot="tooltip-content">{{ $t('hide') }}</span>
            </cds-icon-button>
            <cds-icon-button
              v-else
              kind="ghost"
              size="sm"
              align="left"
              @click="toggleShowAll"
            >
              <ShowAllIcon slot="icon" />
              <span slot="tooltip-content">{{ $t('show') }}</span>
            </cds-icon-button>
          </cds-table-toolbar-content>
        </cds-table-toolbar>
        <cds-table-head>
          <cds-table-header-row>
            <cds-table-header-cell
              class="pl-2"
              data-name="name"
              is-sortable
              @cds-table-header-cell-sort="onSort"
            >
              {{ t('name') }}
            </cds-table-header-cell>
            <cds-table-header-cell />
            <cds-table-header-cell
              data-name="price"
              is-sortable
              @cds-table-header-cell-sort="onSort"
            >
              {{ t('price') }}
            </cds-table-header-cell>
            <cds-table-header-cell
              is-sortable
              data-name="price-cj"
              @cds-table-header-cell-sort="onSort"
            >
              CJ
            </cds-table-header-cell>
            <cds-table-header-cell>{{ t('location') }}</cds-table-header-cell>
            <cds-table-header-cell>{{ t('rarity') }}</cds-table-header-cell>
          </cds-table-header-row>
        </cds-table-head>
        <cds-table-body v-if="!sorting">
          <fish-row
            v-for="row in paginated"
            :key="row.key"
            :fish="row"
          />
          <fish-row-empty v-if="filteredFish.length === 0" />
        </cds-table-body>
        <cds-table-body v-else>
          <cds-table-row
            v-for="(_,row) in Array(3)"
            :key="`skeleton-row-${row}`"
          >
            <cds-table-cell>
              <cds-text-input-skeleton />
            </cds-table-cell>
          </cds-table-row>
        </cds-table-body>
      </cds-table>
      <cds-pagination
        v-if="!loading"
        start="0"
        :total-items="pagination.numberOfItems"
        :page-size="currentPagination.pageSize"
        :page="currentPagination.page"
        :items-per-page-text="t('items')"
        :forward-text="t('next-page')"
        :backward-text="t('previous-page')"
        :format-status-with-determinate-total="formatStatusWithDeterminateTotal"
        :format-supplemental-text="formatSupplementalText"
        @cds-pagination-changed-current="onPagination"
        @cds-page-sizes-select-changed="onPagination"
      >
        <cds-select-item
          v-for="pageSize in pagination.pageSizes"
          :key="`pagination-${pageSize}`"
          :value="`${pageSize}`"
        >
          {{ pageSize }}
        </cds-select-item>
      </cds-pagination>
    </div>
  </div>
</template>
