<template>
  <div>test</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps(['HTMLContent'])

const q1 = ref(1);
function changeVal() {
  q1.value = 2;
}
</script>

<style>
</style>
