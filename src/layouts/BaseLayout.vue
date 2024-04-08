<script lang="ts">
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";
//temp logic
export default {
  data() {
    return {
      isScroll: false,
    };
  },
  setup() {
    const isValid = ["/login", "/register", "/room"].some((route) =>
      window.location.pathname.includes(route)
    );

    return { isValid };
  },
  methods: {
    handleScroll: function () {
      this.isScroll = window.scrollY > 0;
      console.log(this.isScroll);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handleScroll);
    });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: { Header, Footer },
};
</script>

<template>
  <main class="bg-bgColor">
    <Header v-if="!isValid && !isScroll" />
    <slot />
    <Footer v-if="!isValid" />
  </main>
</template>
