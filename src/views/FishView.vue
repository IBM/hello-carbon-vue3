<template>
  <cv-grid>
    <cv-row>
      <cv-column>
        <cv-data-table
          @pagination="onPagination"
          :pagination="pagination"
          title="Fish"
          helperText="Information about all the fish"
          :zebra="true"
          v-model:rows-selected="selectedFish"
        >
          <template v-slot:batch-actions>
            <cv-button :icon="hideIcon" @click="onHideSelected">Hide</cv-button>
          </template>
          <template v-slot:actions v-if="fishStore.someHidden">
            <cv-data-table-action
              aria-label="show all"
              alt="show all"
              @click="toggleShowAll"
            >
              <hide-icon v-if="showHidden" class="bx--toolbar-action__icon">
                <title>Do not show hidden rows</title>
              </hide-icon>
              <show-all-icon v-else class="bx--toolbar-action__icon">
                <title>Show hidden rows</title>
              </show-all-icon>
            </cv-data-table-action>
          </template>
          <template v-slot:headings>
            <cv-data-table-heading heading="Name" name="name" sortable />
            <cv-data-table-heading heading="Price" name="price" sortable />
            <cv-data-table-heading heading="CJ" />
            <cv-data-table-heading heading="Location" />
            <cv-data-table-heading heading="Rarity" />
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

const hideIcon = HideIcon;
const fishStore = useFishStore();
const loading = ref(false);
const pagination = ref({ numberOfItems: 0, pageSizes: [7, 11, 23, 31] });
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
