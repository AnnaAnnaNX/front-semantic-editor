<template>
  <div class="home">
    <HelloWorld :HTMLContent="HTMLContent" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      HTMLContent: `
        <div>
          <span class="all">1This is an about page </span>
          <span class="main">main1This </span>
          <span class="all">is an about page1This </span>
          <span class="interesting">interestingis </span>
          <span class="all">an about page 1This is an about page 1This is an about page</span>
        </div>
        <div>
          <span class="all">2This </span>
          <span class="main">mainis an about </span>
          <span class="all">page</span>
        </div>
        <div>
          <span class="all">3This is an about page</span>
        </div>
        `,
    };
  },
});
</script>
