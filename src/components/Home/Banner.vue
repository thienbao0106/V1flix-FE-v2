<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { register } from "swiper/element/bundle";
import { seriesBannerQuery } from "../../queries/series";
import BannerCard from "./BannerCard.vue";

register();
export default {
  props: ["setLoading"],
  data() {
    return {
      series: [] as any[],
    };
  },
  setup() {
    const { onResult: resultFn, loading } = useQuery(seriesBannerQuery(5));
    return {
      resultFn,
      loading,
    };
  },
  mounted() {
    this.setLoading(this.loading);
    this.resultFn((result) => {
      this.setLoading(this.loading);

      if (result.data) this.series = result.data.series.series;
    });
  },
  components: { BannerCard },
};
</script>

<template>
  <section aria-label="banner" className="lg:h-auto ">
    <swiper-container
      :centered-slides="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :pagination="{
        hideOnClick: true,
      }"
    >
      <swiper-slide v-for="s in series">
        <BannerCard
          :key="s._id"
          :id="s._id"
          :title="s.title"
          :description="s.description"
          :images="s.images"
        />
      </swiper-slide>
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
  swiper-container::part(bullet-active) {
    background-color: #e89b26 !important;
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
