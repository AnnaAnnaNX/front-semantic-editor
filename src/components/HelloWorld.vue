<template>
  <div>{{ selectedHTML }}</div>
  {{ currentMode }}
  <select v-model="currentMode">
    <option v-for="mode in listOfModes" :key="mode" :value="mode">
      {{ mode }}
    </option>
  </select>
  <div :style="stylesForContent">
    <div class="content" v-html="content"></div>
  </div>
  <component :is="'style'">
    {{ stylesForContent }}
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const HTMLcontent = `
    <div>
      <span class="all">1This is an about page </span
      ><span class="main">main1This</span> is an about page1This<span
        class="interesting"
      >
        interestingis</span
      >
      an about page 1This is an about page 1This is an about page
    </div>
    <div>
      <span class="all">2This </span><span class="main">mainis an about</span
      ><span class="all"> page</span>
    </div>
    <div><span class="all">3This is an about page</span></div>
`;
const content = ref<string>(HTMLcontent);
const currentMode = ref<string>("all");
const listOfModes = ref<string[]>(["main", "interesting", "off-topic", "all"]); // должны быть уникальные значения
const selectedHTML = ref<string>("");

document.onselectionchange = () => {
  console.log("document.onselectionchange");

  let selection = document.getSelection();

  if (!selection) {
    return;
  }

  let { anchorNode, anchorOffset, focusNode, focusOffset } = selection;

  console.log(`${anchorNode}, offset ${anchorOffset}`);
  console.log(`${focusNode}, offset ${focusOffset}`);

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
  console.log(anchorNode === focusNode);
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
