<script lang="ts">
import { capitalizeWord } from "../../../utils/handleWord";

export default {
  props: ["handleSubmit", "formEle", "error", "loading", "type"],
  methods: {
    capitalizeWord,
  },
  data() {
    return {
      inputClass:
        "xl:w-[30rem] sm:w-[28rem] w-[24rem] rounded-md h-12 border-2 bg-opacity-40 bg-gray-500 p-3 focus:outline-none focus:border-secondColorBrighter",
      spanClass:
        "pointer-events-none font-bold absolute left-0 p-3 transition-transform duration-500",
    };
  },
};
</script>
<template>
  <form method="post" @submit="handleSubmit" class="space-y-5">
    <div v-for="ele in formEle" className="relative">
      <input
        :class="`${inputClass} border-secondColor`"
        :type="ele.type"
        :name="ele.name"
        required
      />
      <span :class="`${spanClass}`">{{ capitalizeWord(ele.title) }}</span>
    </div>

    <aside v-if="error !== ''">
      <p class="text-red-500 font-bold w-full">
        {{ error }}
      </p>
    </aside>
    <button
      class="disabled:opacity-70 text-white bg-secondColor hover:bg-secondColorBrighter py-2 text-2xl rounded-md font-bold cursor-pointer w-full text-center"
      type="submit"
      :disabled="loading"
    >
      {{ loading ? "Loading..." : type }}
    </button>
  </form>
</template>

<style scoped>
input:valid ~ span,
input:focus ~ span {
  color: white;
  font-size: 0.65em;
  transform: translateX(10px) translateY(-7px);
  padding: 0 5px;
  background: #1d2b3a;
  border-left: 1px solid #e89b26;
  border-right: 1px solid #e89b26;
  letter-spacing: 0.2em;
}
</style>
