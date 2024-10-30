<template>
  <cv-grid>
    <cv-row>
      <cv-column
        v-for="song in filteredSongs"
        :key="song.id"
        :sm="4"
        :md="4"
        :lg="4"
      >
        <song-card :song="song" />
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<script setup>
import { useSongStore } from "../stores/songs";
import { computed, onMounted, ref } from "vue";
import SongCard from "../components/SongCard.vue";

const songStore = useSongStore();
const loading = ref(false);
onMounted(() => {
  loading.value = true;
  try {
    songStore.loadSongs();
  } catch (e) {
    console.error("error loading songs from API", e.message);
  }
  loading.value = false;
});
const filteredSongs = computed(() => {
  // for now, there is no filtering
  return songStore.songs;
});
</script>
