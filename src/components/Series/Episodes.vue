<script lang="ts">
export default {
  props: ["episodes"],
};
</script>

<template>
  <aside aria-label="episodes">
    <h2 className="lg:text-2xl text-4xl mb-5">Episodes</h2>
    <ul
      v-if="episodes?.length > 0"
      className="flex lg:gap-x-5 gap-x-3 gap-y-3 "
      role="list"
    >
      <a v-for="(episode, index) in episodes" :key="index">
        <li>
          {{ episode.ep_num }}
        </li>
      </a>
    </ul>
    <div v-else>Coming soon</div>
  </aside>
</template>
