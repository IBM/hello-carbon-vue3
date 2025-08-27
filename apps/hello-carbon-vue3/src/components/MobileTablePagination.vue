<script setup>
import {
  ArrowLeft20 as PrevPageIcon,
  ArrowRight20 as NextPageIcon,
} from "@carbon/icons-vue";

defineProps({
  /** @type {{ start:number, length:number, page:number }} */
  tablePagination: { type: Object, required: true },
  numberOfItems: { type: Number, required: true },
});
const emit = defineEmits(["pagination"]);
</script>

<template>
  <cv-icon-button
    :disabled="tablePagination.start <= 1"
    label="previous table page"
    size="sm"
    :icon="PrevPageIcon"
    kind="ghost"
    @click="
      emit('pagination', {
        start: tablePagination.start - tablePagination.length,
        page: tablePagination.page - 1,
        length: tablePagination.length,
      })
    "
  />
  <cv-icon-button
    :disabled="tablePagination.start + tablePagination.length >= numberOfItems"
    label="next table page"
    size="sm"
    :icon="NextPageIcon"
    kind="ghost"
    @click="
      emit('pagination', {
        start: tablePagination.start + tablePagination.length,
        page: tablePagination.page + 1,
        length: tablePagination.length,
      })
    "
  />
  <div class="inline-flex pt-[6px] h-8 ml-2">
    {{ tablePagination.start }}...{{
      Math.min(
        tablePagination.start + tablePagination.length - 1,
        numberOfItems,
      )
    }}/{{ numberOfItems }}
  </div>
</template>
