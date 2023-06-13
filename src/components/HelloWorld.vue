<template>
  {{ currentMode }}
  <select v-model="currentMode">
    <option v-for="mode in listOfModes" :key="mode">
      {{ mode }}
    </option>
  </select>
  <div v-html="content"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

const HTMLcontent = `
<div>
This prevents starting the selection on elem, but the visitor may start it at another element, then extend to elem.
That’s convenient when there’s another event handler on the same action that triggers the select (e.g. mousedown). So we disable the selection to avoid conflict, still allowing elem contents to be copied.
We can also clear the selection post-factum after it happens wih document.getSelection().empty(). That’s rarely used, as this causes unwanted blinking as the selection appears-disappears.
</div>
<div>
1
</div>
<div>
This prevents starting the selection on elem, but the visitor may start it at another element, then extend to elem.
That’s convenient when there’s another event handler on the same action that triggers the select (e.g. mousedown). So we disable the selection to avoid conflict, still allowing elem contents to be copied.
We can also clear the selection post-factum after it happens wih document.getSelection().empty(). That’s rarely used, as this causes unwanted blinking as the selection appears-disappears.
</div>
`;
export default defineComponent({
  name: "HelloWorld",
  setup() {
    const content = ref<string>(HTMLcontent);
    const currentMode = ref<string>("all");
    const listOfModes = ref<string[]>([
      "main",
      "interesting",
      "off-topic",
      "all",
    ]);
    return {
      content,
      currentMode,
      listOfModes,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
