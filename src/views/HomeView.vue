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
  }
  catch (e) {
    console.error("error loading songs from API", e.message);
  }
  loading.value = false;
});
const filteredSongs = computed(() => {
  // for now, there is no filtering
  return songStore.songs;
});
</script>

<template>
  <div class="cv-grid grid grid-cols-4 gap-4 px-2!">
    <div
      v-for="song in filteredSongs"
      :key="song.id"
    >
      <song-card :song="song" />
    </div>
  </div>
</template>
