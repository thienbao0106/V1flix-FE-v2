<script lang="ts">
export default {
  props: ["socket", "currentUser", "isHost"],
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
      this.socket.emit(
        "userChat",
        {
          username: this.currentUser,
          isHost: this.isHost === "true",
        },
        this.content
      );
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
  <section id="chat-box" class="border border-white p-2 rounded-lg">
    <h1 class="font-bold text-lg">Chatbox</h1>
    <div class="overflow-y-auto xl:h-[46rem] h-[30rem]">
      <div v-for="msg in listMessages">
        <div :class="msg.user.isHost ? 'mb-4' : 'mb-2'">
          <span class="font-bold"
            >{{ msg.user.username }}
            <span v-if="msg.user.isHost" class="bg-secondColor p-1 rounded-lg"
              >Host</span
            >
            :
          </span>
          <span> {{ msg.message }}</span>
        </div>
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <input
        required
        placeholder="Comment here"
        class="bg-opacityText rounded-lg w-full py-3 px-1"
        type="text"
        v-model="content"
      />
    </form>
  </section>
</template>
