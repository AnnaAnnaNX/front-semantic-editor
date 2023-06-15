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

  // check selection in .content

  console.log(`${startContainer}, offset ${startOffset}`);
  console.log(`${endContainer}, offset ${endOffset}`);

  selectedHTML.value = "";

  // Clone DOM nodes from ranges (we support multiselect here)
  for (let i = 0; i < selection.rangeCount; i++) {
    const fragment = selection.getRangeAt(i).cloneContents();
    var div = document.createElement("div");
    div.appendChild(fragment);
    console.log(div.innerHTML);
    selectedHTML.value += div.innerHTML;
  }

  // check selection in one Node
  console.log(startContainer === endContainer);
  if (startContainer === endContainer && startOffset !== endOffset) {
    // create new range oe selection, rap in to span
    let range1 = new Range();
    range1.setStart(startContainer, startOffset);
    range1.setEnd(startContainer, endOffset);
    let newNode = document.createElement("span");
    newNode.className = modeForSelection.value;
    try {
      const text1 = range1.toString();
      range1.surroundContents(newNode);
    } catch (e) {
      console.log(e);
    }
  }
  const el = document.querySelector(".content");
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
