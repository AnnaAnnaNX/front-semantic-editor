<template>
  <div>{{ selectedHTML }}</div>
  {{ currentMode }}
  <!--  <select v-model="currentMode">-->
  <!--    <option v-for="mode in listOfModes" :key="mode" :value="mode">-->
  <!--      {{ mode }}-->
  <!--    </option>-->
  <!--  </select>-->
  <div>
    modeForSelection
    <!--    <select v-model="modeForSelection">-->
    <!--      <option-->
    <!--        v-for="mode in listOfModes.filter((mode) => mode !== 'all')"-->
    <!--        :key="mode"-->
    <!--        :value="mode"-->
    <!--      >-->
    <!--        {{ mode }}-->
    <!--      </option>-->
    <!--    </select>-->
  </div>
  <div :style="stylesForContent">
    <div class="content" v-html="content"></div>
  </div>
  <component :is="'style'">
    {{ stylesForContent }}
  </component>
  <pre>
    {{ content }}
  </pre>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue";
import { selectDivs } from "@/helpers/selection";
import { checkExistenceSpanElement } from "@/helpers/utils";

const props = defineProps(["HTMLContent"]);

const content = ref<string>(props.HTMLContent);
const currentMode = ref<string>("all");
const listOfModes = ref<string[]>(["main", "interesting", "off-topic", "all"]); // должны быть уникальные значения
const selectedHTML = ref<string>("");
const modeForSelection = ref<string>("main");

document.onselectionchange = () => {
  console.log("document.onselectionchange");

  let selection = document.getSelection();

  if (!selection) {
    return;
  }
  const range = selection.getRangeAt(0);
  let { startContainer, startOffset, endContainer, endOffset } = range;

  const el = document.querySelector(".content");
  if (!el) {
    throw new Error("Element .content not found");
  }
  if (!(el instanceof HTMLDivElement)) {
    throw new Error("Element .content not found");
  }
  const startSpan = startContainer.parentElement;
  checkExistenceSpanElement(startSpan);
  const endSpan = endContainer.parentElement;
  checkExistenceSpanElement(endSpan);
  try {
    selectDivs(
      el,
      startSpan as HTMLSpanElement,
      startOffset,
      endSpan as HTMLSpanElement,
      endOffset,
      currentMode.value
    );
  } catch (e) {
    console.log(e);
  }
  // }

  if (el) {
    content.value = el.innerHTML;
  }
};

const stylesForContent = computed(() => {
  const index = listOfModes.value.indexOf(currentMode.value);
  if (index === -1) {
    return "";
  } else {
    return listOfModes.value
      .slice(index + 1)
      .map((mode) => `.${mode} {display: none;} `)
      .join("\n");
  }
});
</script>

<style>
.main {
  background-color: palevioletred;
}
.interesting {
  background-color: aquamarine;
}
</style>
