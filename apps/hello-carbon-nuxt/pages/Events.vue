<script setup>
import { View20 as ShowAllIcon, ViewOff20 as HideIcon } from '@carbon/icons-vue'

const marvelEvents = useMarvelEvents()

const marveEventsList = computed(() => {
  return marvelEvents.value?.data.results || []
})
const loading = computed(() => {
  return marveEventsList.value.length <= 0
})

const { t, locale } = useI18n()

const i18nPagination = computed(() => {
  return {
    numberOfItems: filteredData.value.length,
    pageSizes: [7, 11, 23, 31],
    pageSizesLabel: t('items'),
    backwardText: t('previous-page'),
    forwardText: t('next-page'),
    pageNumberLabel: t('page-number'),
  }
})

const searchFilter = ref('')
/**
 * Set search filter
 * @param {string} val
 */
function onSearch(val) {
  searchFilter.value = val?.trim()
}

const { _get } = useObject()
const showHidden = ref(false)
const hiddenItems = ref(new Set())
const sortKeys = ref({ index: '0', order: 'none', name: null })
const filteredData = computed(() => {
  // start with all the data
  let show = marveEventsList.value || []

  // if we are not showing hidden items, remove them
  if (!showHidden.value) show = show.filter(item => !hiddenItems.value.has(`me-${item.id}`))

  // if we have search term, filter based on that term
  if (searchFilter.value) {
    const lc = searchFilter.value.toLowerCase()
    show = show.filter(item => item.title.toLowerCase().includes(lc))
  }

  // If we are sorting the data, do that here
  if (sortKeys.value.order !== 'none') {
    show.sort((a, b) => {
      // This code depends on the name value in cv-data-table-heading matching the path value of the
      // data to sort. So, `<cv-data-table-heading name="something" .../>` would mean that we expect to find a key
      // "something" in the data. A path is ok too like "hello.world".
      // {
      //    "something": 1,
      //    "hello": { "world": 5 },
      //    ...
      // }
      let _a = _get(a, sortKeys.value.name, 0) // value of sort key
      let _b = _get(b, sortKeys.value.name, 0)
      let cmp = 0
      if (typeof _a !== typeof _b) {
        if (typeof _a === 'string') _b = ''
        else if (typeof _b === 'string') _a = ''
        else console.warn('sort values have different types')
      }
      // sort by a number value
      if (typeof _a === 'number') {
        cmp = _a - _b
      }
      // or sort by a string
      else if (typeof _a === 'string') {
        cmp = _a.localeCompare(_b, locale)
      }

      // reverse the sort
      if (sortKeys.value.order === 'descending') cmp = -cmp
      return cmp
    })
  }
  return show
})

function toggleShowAll() {
  showHidden.value = !showHidden.value
}

const currentPagination = ref({ start: 1, page: 1, length: 7 })
const paginated = computed(() => {
  const change = currentPagination.value
  return filteredData.value.slice(
    change.start - 1,
    change.start + change.length - 1,
  )
})
function onPagination(change) {
  currentPagination.value = change
}
function onSort(keys) {
  sortKeys.value = keys
  onPagination({ ...currentPagination.value, start: 1, page: 1 })
}

const selectedItems = ref([])
function onHideSelected() {
  for (let i = 0; i < selectedItems.value.length; i++) {
    const key = selectedItems.value[i]
    hiddenItems.value.add(key)
  }
  selectedItems.value = []
}

const showDescription = ref(false)
provide('show-description', showDescription)
</script>

<template>
  <cv-grid class="mt-16">
    <cv-row>
      <cv-column>
        <div class="mb-4 text-3xl text-vermilion">
          {{ $t('event-subtitle') }}
        </div>
      </cv-column>
    </cv-row>
    <cv-row>
      <cv-column>
        <CvToggle-Skeleton v-if="loading" />
        <cv-toggle
          v-else
          id="show-stories-toggle"
          v-model="showDescription"
          value="show-stories"
          :label="$t('Show description')"
          class="mb-2"
        >
          <template #text-right>
            {{ $t("yes") }}
          </template>
          <template #text-left>
            {{ $t("no") }}
          </template>
        </cv-toggle>
        <cv-data-table-skeleton
          v-if="loading"
          :columns="[$t('Title'), $t('Start'), $t('Duration'), $t('characters'), $t('comics')]"
          :rows="7"
          :title="$t('events-table-title')"
          :helper-text="$t('events-table-helper-text')"
        />
        <cv-data-table
          v-else
          id="marvel-events-table"
          v-model:rows-selected="selectedItems"
          :pagination="i18nPagination"
          :zebra="true"
          :title="$t('events-table-title')"
          :helper-text="$t('events-table-helper-text')"
          :batch-cancel-label="$t('cancel')"
          :action-bar-aria-label="$t('actions')"
          :collapse-all-aria-label="$t('collapse-all')"
          :expand-all-aria-label="$t('expand-all')"
          :select-all-aria-label="$t('select-all')"
          :search-label="$t('search')"
          :search-placeholder="$t('search')"
          :search-clear-label="$t('search-clear')"
          :expandable="true"
          :expanding-search="true"
          @pagination="onPagination"
          @search="onSearch"
          @sort="onSort"
        >
          <template #items-selected="{ scope }">
            {{ $t("selected-num", { count: scope.count }) }}
          </template>
          <template #of-n-pages="{ scope }">
            {{ $t("pages-num", { count: scope.pages }) }}
          </template>
          <template #range-text="{ scope }">
            <!-- { "start": 1, "end": 7, "items": 80 } -->
            {{ $t("range-text", scope) }}
          </template>
          <template
            v-if="filteredData.length > 0"
            #batch-actions
          >
            <cv-button
              :icon="HideIcon"
              @click="onHideSelected"
            >
              {{
                $t("hide")
              }}
            </cv-button>
          </template>
          <template
            v-if="hiddenItems.size > 0"
            #actions
          >
            <cv-data-table-action
              :aria-label="$t('show')"
              :alt="$t('show')"
              @click="toggleShowAll"
            >
              <HideIcon
                v-if="showHidden"
                class="bx--toolbar-action__icon"
              >
                <title>{{ $t("hide") }}</title>
              </HideIcon>
              <ShowAllIcon
                v-else
                class="bx--toolbar-action__icon"
              >
                <title>{{ $t("show") }}</title>
              </ShowAllIcon>
            </cv-data-table-action>
          </template>
          <template #headings>
            <cv-data-table-heading
              id="heading-title"
              :heading="$t('Title')"
              name="title"
              sortable
            />
            <cv-data-table-heading
              id="heading-start"
              :heading="$t('Start')"
              name="start"
              sortable
            />
            <cv-data-table-heading
              id="heading-duration"
              :heading="$t('Duration')"
              name="duration"
            />
            <cv-data-table-heading
              id="heading-characters"
              :heading="$t('characters')"
              name="characters.available"
              sortable
            />
            <cv-data-table-heading
              id="heading-comics"
              :heading="$t('comics')"
              name="comics.available"
              sortable
            />
          </template>
          <template #data>
            <event-data-row
              v-for="row in paginated"
              :key="`${row.id}`"
              :data="row"
            />
            <event-empty-data-row v-if="filteredData.length === 0" />
          </template>
        </cv-data-table>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<style scoped lang="scss">

</style>
