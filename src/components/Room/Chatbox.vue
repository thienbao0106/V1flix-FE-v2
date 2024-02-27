<script lang="ts">
export default {
  props: ["socket", "currentUser"],
  data() {
    return {
      content: "",
      listMessages: [] as any,
    };
  },
  methods: {
    sendMessage: function (e: any) {
      e.preventDefault();
      console.log(this.currentUser);
      this.socket.emit("userChat", this.currentUser, this.content);
      this.content = "";
    },
  },
  mounted() {
    this.socket.on("sendMessage", (message: any) => {
      console.log(message);
      this.listMessages.push(message);
    });
  },
};
</script>
<template>
  <section class="border border-white p-2 rounded-lg">
    <h1 class="font-bold text-lg">Chatbox</h1>
    <div class="overflow-y-auto h-[27.5rem]">
      <div v-for="msg in listMessages">
        <span class="font-bold">{{ msg.username }}: </span>
        <span> {{ msg.message }}</span>
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <input
        placeholder="Comment here"
        class="bg-opacityText rounded-lg w-full py-3 px-1"
        type="text"
        v-model="content"
      />
    </form>
  </section>
</template>
