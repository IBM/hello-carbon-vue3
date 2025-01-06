<template>
  <cv-grid style="margin-top: 4rem">
    <comic-info
      id="comic-info-modal"
      v-model:comic-id="currentComic"
    />
    <cv-row>
      <cv-column
        v-for="comic in comicsList"
        :key="`${comic.id}`"
        :lg="4"
        :sm="4"
        :md="4"
      >
        <cv-tile
          kind="clickable"
          class="comic-tile"
          @click="onClick(comic.id)"
        >
          <img
            v-if="comic.thumbnail"
            class="size-full object-cover object-left"
            :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
            :alt="comic.title"
          >
          <div v-else-if="comic.error">
            Error loading data
          </div>
          <cv-skeleton-text
            v-else
            width="100%"
          />
        </cv-tile>
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

<script setup>
const comics = useComics()

const comicsList = computed(() => {
  return comics.value?.data.results || []
})

const currentComic = ref(0)
function onClick(id) {
  currentComic.value = id
}
</script>

<style scoped lang="scss">
.comic-tile {
  margin: 1rem;
  height: 473px;
}
.cover-art {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}
</style>
