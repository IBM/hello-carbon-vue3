<script setup lang="ts">
import { useSongStore } from "../stores/songs";
import { computed, onMounted, ref } from "vue";
import SongCard from "../components/SongCard.vue";

const songStore = useSongStore();
const loading = ref(false);
const loadError = ref(null);
onMounted(() => {
  loading.value = true;
  loadError.value = null;
  try {
    songStore.loadSongs()
      .catch((e) => {
        console.error("error loading songs from API", e?.message || e);
        loadError.value = e?.message || "Failed to load songs";
      })
      .finally(() => {
        loading.value = false;
      });
  }
  catch (e) {
    console.error("error loading songs from API", e.message);
    loadError.value = e?.message || "Failed to load songs";
    loading.value = false;
  }
});
const filteredSongs = computed(() => {
  // for now, there is no filtering
  return songStore.songs;
});
</script>

<template>
  <cv-grid>
    <cv-row>
      <cv-column>
        <cv-inline-notification
          v-if="loadError"
          kind="error"
          title="Error"
          :subtitle="loadError"
          class="mb-4"
        />
      </cv-column>
    </cv-row>
    <cv-row v-if="loading">
      <cv-column
        v-for="i in 6"
        :key="`s-${i}`"
        :sm="4"
        :md="4"
        :lg="4"
      >
        <cv-tile-skeleton />
      </cv-column>
    </cv-row>
    <cv-row v-else>
      <cv-column
        v-for="song in filteredSongs"
        :key="song.id"
        :sm="4"
        :md="4"
        :lg="4"
      >
        <SongCard :song="song" />
      </cv-column>
    </cv-row>
  </cv-grid>
</template>
