<template>
  <cv-grid>
    <cv-row>
      <cv-column>
        <div class="title">{{ t("villagers") }}</div>
      </cv-column>
    </cv-row>
    <cv-row>
      <cv-column>
        <cv-content-switcher @selected="onSelected">
          <cv-content-switcher-button
            v-for="group in villagerHobbies"
            :key="`switcher-${group.hobby}`"
            :owner-id="`switcher-${group.hobby}`"
            :icon="hobbyIcon(group.hobby)"
            :selected="`switcher-${group.hobby}` === selected"
            >{{ t(group.hobby) }}
            <bouncing-icon
              class="special-icon special-icon--play"
              v-if="showBouncing(group.hobby)"
            />
          </cv-content-switcher-button>
        </cv-content-switcher>

        <section>
          <cv-content-switcher-content
            v-for="group in villagerHobbies"
            :owner-id="`switcher-${group.hobby}`"
            :key="`content-${group.hobby}`"
          >
            <villager-hobby :hobbyists="group" />
          </cv-content-switcher-content>
        </section>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<script setup>
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
import VillagerHobby from "@/components/VillagerHobby.vue";
import BouncingIcon from "@/components/BouncingIcon.vue";

const { t } = useTranslation();
const villagerStore = useVillagersStore();
const loading = ref(false);
const villagerHobbies = ref({});
const selected = ref("switcher-Education");
/**
 * Bug data
 * @typedef {Object} HobbyistData
 * @property {string} hobby
 * @property {Array<VillagerData>} villagers
 */
onMounted(() => {
  loading.value = true;
  try {
    villagerStore.loadVillagers().finally(() => {
      const groups = groupBy(villagerStore.villagers, "hobby");
      const keys = Object.keys(groups);
      villagerHobbies.value = keys.map((key) => {
        return { hobby: key, villagers: groups[key] };
      });

      // What's happening here? I don't want to default always to the first set of content, "Education".
      // So instead we set it based on what minute of the hour it is when we load. So for example
      // if the page is loaded between 15:30 and 15:40 the 4th content, "Nature", is shown.
      const minute = new Date().getMinutes();
      let which = 0;
      if (minute > 9) which = 1;
      if (minute > 19) which = 2;
      if (minute > 29) which = 3;
      if (minute > 39) which = 4;
      if (minute > 49) which = 5;
      selected.value = `switcher-${villagerHobbies.value[which].hobby}`;
      loading.value = false;
    });
  } catch (e) {
    console.error("error loading bugs from API");
  }
});

/**
 * Get an icon for the given hobby
 * @param {string} hobby
 * @returns {Object} icon
 */
function hobbyIcon(hobby) {
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
 * @param {string} val
 */
function onSelected(val) {
  selected.value = val;
}

function showBouncing(hobby) {
  return hobby === "Play" && selected.value === "switcher-Play";
}
</script>

<style scoped lang="scss">
@import "../styles/_theme.scss";
.title {
  @include carbon--type-style("productive-heading-03");
  margin-bottom: 2rem;
}
.special-icon {
  position: absolute;
  &--play {
    left: 16px;
    bottom: -2px;
  }
}
</style>
