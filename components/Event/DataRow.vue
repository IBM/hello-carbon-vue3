<script setup>
import { DateTime } from 'luxon'

/**
 * @typedef MarvelEventAvailable
 * @propery {number} available
 */

/**
 * @typedef MarvelEvent
 * @property {string} start
 * @property {string} end
 * @property {string} title
 * @property {string} description
 * @property {ComicImage} thumbnail
 * @property {MarvelEventAvailable} characters
 * @property {MarvelEventAvailable} comics
 */

const props = defineProps({
  data: {
    type: /** @type MarvelEvent */ Object,
    required: true,
  },
  expandable: { type: Boolean, default: false },
})
const { t, locale } = useI18n()

const characterCount = computed(() => {
  return '' + (props.data?.characters?.available || t('no-data'))
})
const comicCount = computed(() => {
  return '' + (props.data?.comics?.available || t('no-data'))
})
const startTime = computed(() => {
  if (props.data?.start) {
    const dt = DateTime.fromSQL(props.data.start)
    return dt.setLocale(locale.value).toLocaleString(DateTime.DATE_MED)
  }
  return t('Soon')
})
const duration = computed(() => {
  if (props.data?.start && props.data?.end) {
    const st = DateTime.fromSQL(props.data.start).setLocale(locale.value)
    const et = DateTime.fromSQL(props.data.end).setLocale(locale.value)
    const duration = et.diff(st)
    return duration.shiftTo('years', 'months', 'days').normalize().toHuman({ maximumSignificantDigits: 1 })
  }
  return t('Soon')
})
const thumbnail = computed(() => {
  try {
    return props.data.thumbnail.path + '.' + props.data.thumbnail.extension
  }
  catch {
    console.warn(`no thumbnail image for ${props.data?.title}`)
  }
  return null
})
const showDescription = inject('show-description', ref(false))
</script>

<template>
  <cv-data-table-row
    :id="`me-${data.id}`"
    :value="`me-${data.id}`"
    :aria-label-for-batch-checkbox="t('select-row', { name: data.title })"
  >
    <cv-data-table-cell>{{ data.title }}</cv-data-table-cell>
    <cv-data-table-cell>{{ startTime }}</cv-data-table-cell>
    <cv-data-table-cell>{{ duration }}</cv-data-table-cell>
    <cv-data-table-cell>{{ characterCount }}</cv-data-table-cell>
    <cv-data-table-cell>
      {{ comicCount }}
    </cv-data-table-cell>
    <template
      v-if="showDescription"
      #expandedContent
    >
      <div class="flex flex-row items-center gap-2 text-xl">
        <div class="w-36 shrink-0">
          <external-image
            v-if="thumbnail"
            :src="thumbnail"
            :alt="data?.title"
            class="size-36"
          />
        </div>
        <div>{{ data?.description }}</div>
      </div>
    </template>
  </cv-data-table-row>
</template>

<style scoped lang="scss"></style>
