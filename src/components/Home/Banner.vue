<script setup lang="ts">
import { register } from "swiper/element/bundle";
register();
</script>

<template>
  <section aria-label="banner" className="lg:h-auto ">
    <swiper-container
      :centered-slides="true"
      :pagination="{
        hideOnClick: true,
      }"
      loop="true"
    >
      <swiper-slide class="h-80">Slide 1</swiper-slide>
      <swiper-slide class="h-80">Slide 2</swiper-slide>
      <swiper-slide class="h-80">Slide 3</swiper-slide>
    </swiper-container>
  </section>
</template>

<style scoped>
swiper-container::part(pagination) {
  text-align: left !important;
  padding-left: 2rem;
}

swiper-container::part(bullet) {
  width: 1.5rem !important;
  height: 1.5rem !important;
}
swiper-container::part(bullet-active) {
  background-color: #e89b26 !important;
  width: 1.5rem !important;
  height: 1.5rem !important;
}

@media only screen and (max-width: 600px) {
  /* For tablets: */
  swiper-container::part(pagination) {
    padding-left: 0.5rem;
  }
  swiper-container::part(bullet) {
    width: 1rem !important;
    height: 1rem !important;
  }
}

@media only screen and (max-width: 1000px) {
  /* For tablets: */
  swiper-container::part(pagination) {
    padding-left: 0.5rem;
  }
  swiper-container::part(bullet) {
    width: 1.2rem !important;
    height: 1.2rem !important;
  }
}

@media only screen and (max-width: 1200px) {
  /* For tablets: */
  swiper-container::part(pagination) {
    padding-left: 0.8rem;
  }
  swiper-container::part(bullet) {
    width: 1rem !important;
    height: 1rem !important;
  }
}
</style>
