<template>
  <cv-grid class="mt-16">
    <cv-row>
      <cv-column>
        <div class="mb-4 text-3xl text-carbon-magenta-60">
          Marvel characters
        </div>
        <cv-accordion @change="autoClose">
          <cv-accordion-item
            v-for="character in characterList"
            :id="`acc-item-${character.id}`"
            :key="character.id"
            v-model:open="openSection[character.id]"
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
          </cv-accordion-item>
        </cv-accordion>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<script setup>
const characters = useCharacters()
const characterList = computed(() => {
  return characters.value?.data.results || []
})

const openSection = ref({})
function autoClose(ev) {
  if (ev.change.open) {
    const open = ev.change.id.split('-').slice(-1)[0]
    for (const state in openSection.value) {
      if (state !== open) openSection.value[state] = false
    }
  }
}
</script>

<style scoped lang="scss"></style>
