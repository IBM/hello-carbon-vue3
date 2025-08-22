<script setup>
const characters = useMarvelCharacters()
const loading = computed(() => {
  return characters.value?.data?.results?.length <= 0
})
const characterList = computed(() => {
  const list = characters.value?.data.results || []
  return list
})
const listDescription = computed(() => {
  try {
    const offset = characters.value.data?.offset
    const last = characters.value.data?.offset + characters.value.data?.limit
    const total = characters.value.data?.total
    return `Characters ${offset} .. ${last} of ${total}`
  }
  catch (err) {
    console.warn(err?.message)
    return ''
  }
})

const openItem = ref('')
provide('open-item', openItem)
function autoClose(ev) {
  if (ev.change.open) {
    openItem.value = ev.change.id.split('-').slice(-1)[0]
  }
}
</script>

<template>
  <cv-grid class="mt-16">
    <cv-row>
      <cv-column>
        <div
          :id="characterList.length"
          class="mb-4 text-3xl text-vermilion"
        >
          Marvel characters
        </div>
        <div
          v-if="!loading"
          class="mb-6 text-xs"
        >
          {{ listDescription }}
        </div>
        <div v-if="loading">
          loading ...
        </div>
        <cv-accordion
          v-else
          @change="autoClose"
        >
          <character-item
            v-for="character in characterList"
            :id="`acc-item-${character.id}`"
            :key="character.id"
            :data="character"
          >
            <template #title>
              <div class="text-2xl">
                {{ character.name }}
              </div>
            </template>
            <template #content>
              <p class="text-xl">
                {{
                  character.description || $t("No description") }}
              </p>
            </template>
          </character-item>
        </cv-accordion>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<style scoped lang="scss"></style>
