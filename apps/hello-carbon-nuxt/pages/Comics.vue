<script setup>
const comics = useMarvelComics()

const comicsList = computed(() => {
  return comics.value?.data.results || []
})
const loading = computed(() => {
  return comics.value?.data?.results?.length <= 0
})

const currentComic = ref(0)
function onClick(id) {
  currentComic.value = id
}

const listDescription = computed(() => {
  try {
    const offset = comics.value.data.offset
    const last = comics.value.data.offset + comics.value.data.limit
    const total = comics.value.data.total
    return `Comics ${offset} .. ${last} of ${total}`
  }
  catch {
    return ''
  }
})
</script>

<template>
  <cv-grid class="mt-16">
    <comic-info-modal
      id="comic-info-modal"
      v-model:comic-id="currentComic"
    />
    <cv-row>
      <cv-column>
        <div class="mb-4 text-3xl text-vermilion">
          Marvel comics
        </div>
        <div
          v-if="!loading"
          class="mb-2 text-xs"
        >
          {{ listDescription }}
        </div>
      </cv-column>
    </cv-row>
    <cv-row>
      <cv-column
        v-for="comic in comicsList"
        :key="`${comic.id}`"
        :lg="4"
        :sm="4"
        :md="4"
      >
        <comic-tile
          :comic="comic"
          @click="onClick(comic.id)"
        />
      </cv-column>
    </cv-row>
    <cv-row v-if="comics?.copyright">
      <cv-column>
        <div>{{ comics.copyright }}</div>
        <div>
          <cv-link
            href="//marvel.com"
            target="_blank"
          >
            {{
              comics.attributionText
            }}
          </cv-link>
        </div>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<style scoped lang="scss">
</style>
