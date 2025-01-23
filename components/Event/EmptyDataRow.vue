<script setup lang="ts">
</script>

<template>
  <cv-data-table-row
    id="no-data-table-row"
    value="no-data"
  >
    <cv-data-table-cell id="no-data-title">
      {{ $t("no-data") }}
    </cv-data-table-cell>
    <cv-data-table-cell id="no-data-start" />
    <cv-data-table-cell id="no-data-duration" />
    <cv-data-table-cell id="no-data-characters" />
    <cv-data-table-cell id="no-data-comics" />
  </cv-data-table-row>
</template>
