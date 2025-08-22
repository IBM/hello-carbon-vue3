<script setup>
// https://codepen.io/Founts/pen/AJyVOr
defineProps({
  kind: { type: String, default: "bottom-left" },
  text: { type: String, required: true },
  bubbleColor: { type: String, default: "#8a3ffc" },
  textColor: { type: String, default: "#d02670" },
});
</script>

<template>
  <div
    class="talk-bubble tri-right rounded-3xl border-carbon-gray-60 border-solid border-8"
    :class="[
      {
        ['top-right-in']: kind === 'bottom-left',
        ['btm-left-in']: kind === 'top-right',
      },
    ]"
    :style="{ 'background-color': bubbleColor }"
  >
    <div class="p-2! text-xs!">
      <p :style="{ color: textColor }">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.talk-bubble {
  display: inline-block;
  position: relative;
  width: 200px;
  height: auto;
  background-color: v-bind(bubbleColor);
}

/* Right triangle placed top left flush. */
.tri-right.border.left-top:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -40px;
  right: auto;
  top: -8px;
  bottom: auto;
  border: 32px solid;
  border-color: var(--cds-interactive-02) transparent transparent transparent;
}
.tri-right.left-top:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -20px;
  right: auto;
  top: 0;
  bottom: auto;
  border: 22px solid;
  border-color: v-bind(bubbleColor) transparent transparent transparent;
}

/* Right triangle, left side slightly down */
.tri-right.border.left-in:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -40px;
  right: auto;
  top: 30px;
  bottom: auto;
  border: 20px solid;
  border-color: var(--cds-interactive-02) var(--cds-interactive-02) transparent
    transparent;
}
.tri-right.left-in:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -20px;
  right: auto;
  top: 38px;
  bottom: auto;
  border: 12px solid;
  border-color: v-bind(bubbleColor) v-bind(bubbleColor) transparent transparent;
}

/*Right triangle, placed bottom left side slightly in*/
.tri-right.border.btm-left:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -8px;
  right: auto;
  top: auto;
  bottom: -40px;
  border: 32px solid;
  border-color: transparent transparent transparent var(--cds-interactive-02);
}
.tri-right.btm-left:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: 0;
  right: auto;
  top: auto;
  bottom: -20px;
  border: 22px solid;
  border-color: transparent transparent transparent v-bind(bubbleColor);
}

/*Right triangle, placed bottom left side slightly in*/
.tri-right.border.btm-left-in:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: 30px;
  right: auto;
  top: auto;
  bottom: -40px;
  border: 20px solid;
  border-color: var(--cds-interactive-02) transparent transparent
    var(--cds-interactive-02);
}
.tri-right.btm-left-in:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: 38px;
  right: auto;
  top: auto;
  bottom: -20px;
  border: 12px solid;
  border-color: v-bind(bubbleColor) transparent transparent v-bind(bubbleColor);
}

/* Right triangle, placed top right slightly in */
.tri-right.border.top-right-in:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  right: 30px;
  top: -40px;
  border: 20px solid;
  border-color: transparent var(--cds-interactive-02) var(--cds-interactive-02)
    transparent;
}
.tri-right.top-right-in:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: 38px;
  top: -20px;
  border: 12px solid;
  border-color: transparent v-bind(bubbleColor) v-bind(bubbleColor) transparent;
}

/*Right triangle, placed bottom right side slightly in*/
.tri-right.border.btm-right-in:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: 30px;
  bottom: -40px;
  border: 20px solid;
  border-color: var(--cds-interactive-02) var(--cds-interactive-02) transparent
    transparent;
}
.tri-right.btm-right-in:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: 38px;
  bottom: -20px;
  border: 12px solid;
  border-color: v-bind(bubbleColor) v-bind(bubbleColor) transparent transparent;
}
.tri-right.border.btm-right:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -8px;
  bottom: -40px;
  border: 20px solid;
  border-color: var(--cds-interactive-02) var(--cds-interactive-02) transparent
    transparent;
}
.tri-right.btm-right:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: 0;
  bottom: -20px;
  border: 12px solid;
  border-color: v-bind(bubbleColor) v-bind(bubbleColor) transparent transparent;
}

/* Right triangle, right side slightly down*/
.tri-right.border.right-in:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -40px;
  top: 30px;
  bottom: auto;
  border: 20px solid;
  border-color: var(--cds-interactive-02) transparent transparent
    var(--cds-interactive-02);
}
.tri-right.right-in:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -20px;
  top: 38px;
  bottom: auto;
  border: 12px solid;
  border-color: v-bind(bubbleColor) transparent transparent v-bind(bubbleColor);
}

/* Right triangle placed top right flush. */
.tri-right.border.right-top:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -40px;
  top: -8px;
  bottom: auto;
  border: 32px solid;
  border-color: var(--cds-interactive-02) transparent transparent transparent;
}
.tri-right.right-top:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -20px;
  top: 0;
  bottom: auto;
  border: 20px solid;
  border-color: v-bind(bubbleColor) transparent transparent transparent;
}

/* talk bubble contents */
.talk-text {
  padding: 0.5em;
  text-align: left;
  line-height: 1.5em;
}
</style>
