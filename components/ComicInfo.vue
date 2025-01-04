<template>
  <cv-modal
    v-model:visible="visible"
    size="xs"
    :auto-hide-off="true"
    @after-modal-hidden="onAfterModalHidden"
    @modal-hide-request="onAfterModalHidden"
  >
    <template #label>
      Comic info
    </template>
    <template #title>
      {{ title }}
    </template>
    <template #content>
      <div>Modified: {{ modified }}</div>
      <div>Pages: {{ pages }}</div>
    </template>
  </cv-modal>
</template>

<script setup>
const props = defineProps({
  comicId: { type: Number, default: 0 },
})
watch(() => props.comicId, show)

const visible = ref(false)
function onAfterModalHidden() {
  visible.value = false
  emit('update:comicId', 0)
}
function show() {
  if (props.comicId > 0) visible.value = true
}
const emit = defineEmits(['update:comicId'])

const comics = useComics()
const comicsList = computed(() => {
  return comics.value?.data?.results || []
})
// http://localhost:4513/images/4bc69f11baf75.jpg
const comicsData = computed(() => {
  return comicsList.value.find(comic => comic.id === props.comicId)
})
const title = computed(() => comicsData.value?.title || 'Unknown')
const modified = computed(
  () => comicsData.value?.modified || `${new Date().getFullYear()}`,
)
const pages = computed(() => comicsData.value?.pageCount || 0)
</script>

<style scoped lang="scss"></style>
