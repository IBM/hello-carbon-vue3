<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  open: { type: Boolean, default: false },
})

// Handle auto close
const openItem = inject('open-item', ref(''))
watch(openItem, () => {
  isOpen.value = `${props.data.id}` === openItem.value
})
const isOpen = ref(props.data.id === openItem.value)

// Do not load the accordion item contents until it is opened for the first time
const lazyContent = ref(isOpen.value)
watch(isOpen, () => {
  if (isOpen.value) lazyContent.value = true
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
</script>

<template>
  <cv-accordion-item v-model:open="isOpen">
    <template #title>
      <div class="text-2xl">
        {{ data.name }}
      </div>
    </template>
    <template #content>
      <div
        v-if="lazyContent"
        class="flex flex-row items-center gap-2 text-xl"
      >
        <div class="shrink-0">
          <external-image
            v-if="thumbnail"
            :src="thumbnail"
            :alt="data?.name"
            class="aspect-4/6 min-h-36 w-24"
          />
        </div>
        <p class="text-xl">
          {{
            data.description || $t("No description") }}
        </p>
      </div>
    </template>
  </cv-accordion-item>
</template>

<style scoped lang="scss">
</style>
