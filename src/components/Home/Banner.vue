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
      index: 0,
      width: window.innerWidth,
    };
  },
  setup() {
    const { onResult: resultFn, loading } = useQuery(seriesBannerQuery(5));

    return {
      resultFn,
      loading,
    };
  },
  methods: {
    onResize: function () {
      this.width = window.innerWidth;
    },
  },
  mounted() {
    this.setLoading(this.loading);
    this.resultFn((result) => {
      this.setLoading(this.loading);
      if (result.data) this.series = result.data.series.series;
    });
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });

    const swiperEl: any = document.querySelector("swiper-container");
    if (!swiperEl) return;
    // swiper parameters
    const swiperParams = {
      slidesPerView: 1,
      navigation: "true",
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      on: {
        slideChange: (swiper: any) => {
          this.index = swiper.realIndex;
        },
      },
    };
    // now we need to assign all parameters to Swiper element
    Object.assign(swiperEl, swiperParams);
    // and now initialize it
    swiperEl.initialize();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  components: { BannerCard },
};
</script>

<template>
  <section class="relative" aria-label="banner">
    <div
      v-if="series.length > 0"
      class="absolute xl:bottom-[12px] lg:bottom-[10px] bottom-[15px] xl:left-[82%] lg:left-[79%] left-[47.5%] font-bold lg:text-2xl text-xl"
      :class="index !== 0 ? 'text-white ' : 'text-secondColor'"
    >
      {{ width > 1024 ? `NO. ${index + 1}` : `${index + 1}/${series.length}` }}
    </div>
    <swiper-container init="false">
      <swiper-slide :key="s._id" v-for="(s, index) in series">
        <BannerCard
          :index="index"
          :id="s._id"
          :title="s.title"
          :description="s.description"
          :images="s.images"
          :season="s.season"
          :type="s.type"
          :duration="s.duration"
          :rating="s.avg_score"
        />
      </swiper-slide>
    </swiper-container>
  </section>
</template>

<style scoped>
@media only screen and (min-width: 1024px) {
  swiper-container::part(button-prev) {
    left: 89% !important;
  }

  swiper-container::part(button-next) {
    right: 4% !important;
  }
  swiper-container::part(button-prev),
  swiper-container::part(button-next) {
    width: 15px;
    top: 90% !important;
  }
}
swiper-container::part(button-prev),
swiper-container::part(button-next) {
  color: #e89b26;
  width: 10px;
  top: 93% !important;
}
</style>
