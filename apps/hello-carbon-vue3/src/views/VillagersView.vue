<script setup lang="ts">
import { onMounted, ref } from "vue";
import { groupBy } from "lodash";
import { useTranslation } from "i18next-vue";
import {
  Sprout32 as NatureIcon,
  Music32 as MusicIcon,
  Education32 as EducationIcon,
  CameraAction32 as FashionIcon,
  Soccer32 as FitnessIcon,
  Basketball32 as PlayIcon,
} from "@carbon/icons-vue";
import { useVillagersStore } from "@/stores/villagers";
import AsyncVillagerHobby from "@/components/AsyncVillagerHobby";
import { VillagerItem } from "@/types/villagers.ts";

const { t } = useTranslation();
const villagerStore = useVillagersStore();
const loading = ref(false);
const loadError = ref(null);

interface VillagerHobbyGroup {
  hobby: string;
  villagers: Array<VillagerItem>;
}
const villagerHobbies = ref<Array<VillagerHobbyGroup>>([]);
const selected = ref("switcher-Education");

onMounted(() => {
  loading.value = true;
  loadError.value = null;
  try {
    villagerStore
      .loadVillagers()
      .catch((e) => {
        console.error("error loading villagers from API", e?.message || e);
        loadError.value = e?.message || "Failed to load villagers";
      })
      .finally(() => {
        const groups = groupBy(villagerStore.villagers, "hobby");
        const keys = Object.keys(groups);
        villagerHobbies.value = keys.map((key) => {
          return { hobby: key, villagers: groups[key] };
        });

        // What's happening here? I don't want to default always to the first set of content, "Education".
        // So instead we set it based on what minute of the hour it is when we load. So, for example,
        // if the page is loaded between 15:30 and 15:40, the 4th content, "Nature", is shown.
        const minute = new Date().getMinutes();
        let which = 0;
        if (minute > 9) which = 1;
        if (minute > 19) which = 2;
        if (minute > 29) which = 3;
        if (minute > 39) which = 4;
        if (minute > 49) which = 5;
        if (villagerHobbies.value.length > which)
          selected.value = `switcher-${villagerHobbies.value[which].hobby}`;
        loading.value = false;
      });
  }
  catch (e) {
    console.error("error loading villagers from API", e.message);
    loadError.value = e?.message || "Failed to load villagers";
    loading.value = false;
  }
});

/**
 * Get an icon for the given hobby
 */
function hobbyIcon(hobby: string) {
  switch (hobby) {
    case "Education":
      return EducationIcon;
    case "Fashion":
      return FashionIcon;
    case "Fitness":
      return FitnessIcon;
    case "Music":
      return MusicIcon;
    case "Nature":
      return NatureIcon;
    case "Play":
      return PlayIcon;
    default:
      return NatureIcon;
  }
}

/**
 * Keep track of what is selected
 */
function onSelected(val: string) {
  selected.value = val;
}
</script>

<template>
  <cv-grid>
    <cv-row>
      <cv-column>
        <div class="title productive-heading-03">
          {{ t("villagers") }}
        </div>
      </cv-column>
    </cv-row>
    <cv-row>
      <cv-column>
        <cv-inline-notification
          v-if="loadError"
          kind="error"
          title="Error"
          :subtitle="loadError"
          class="mb-4"
        />
        <cv-content-switcher
          @selected="onSelected"
        >
          <cv-content-switcher-button
            v-for="group in villagerHobbies"
            :key="`switcher-${group.hobby}`"
            :owner-id="`switcher-${group.hobby}`"
            :icon="hobbyIcon(group.hobby)"
            :selected="`switcher-${group.hobby}` === selected"
          >
            {{ t(group.hobby) }}
          </cv-content-switcher-button>
        </cv-content-switcher>

        <section>
          <cv-content-switcher-content
            v-for="group in villagerHobbies"
            :key="`content-${group.hobby}`"
            :owner-id="`switcher-${group.hobby}`"
          >
            <template v-if="`switcher-${group.hobby}` === selected">
              <AsyncVillagerHobby :hobbyists="group" />
            </template>
          </cv-content-switcher-content>
        </section>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<style scoped lang="scss">
.title {
  margin-bottom: 2rem;
}
.special-icon {
  position: absolute;
  &--play {
    left: 16px;
    bottom: -2px;
  }
  &--grow {
    left: 16px;
    bottom: 0;
  }
  &--run,
  &--flash {
    left: 16px;
    bottom: 9px;
  }
  &--reading,
  &--music {
    left: 0;
    top: 0;
    height: 100%;
  }
}
</style>
