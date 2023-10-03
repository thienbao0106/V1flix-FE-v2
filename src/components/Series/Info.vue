<script lang="ts">
export default {
  props: [
    "images",
    "id",
    "description",
    "title",
    "type",
    "view",
    "total_episodes",
    "status",
    "genres",
  ],
  methods: {
    getCoverImage: function (images: any[]): string {
      if (!images) return "";
      return images.find((image) => image.type === "cover").source;
    },
  },
};
</script>

<template>
  <main
    class="flex lg:flex-row md:flex-row flex-col w-full gap-x-4 bg-opacityText p-4 rounded-lg"
  >
    <section aria-label="image" className="basis-1/5 ">
      <img
        :src="getCoverImage(images)"
        :alt="`img-${id}`"
        className="w-full md:h-full h-[200px] object-cover"
      />
    </section>
    <section
      aria-label="content"
      className="basis-4/5 space-y-4 h-full xl:mt-0 mt-5"
    >
      <div className="flex justify-between">
        <h3 className="lg:text-4xl text-xl font-bold">{{ title }}</h3>
      </div>
      <h4 className="font-extralight">{{ title }}</h4>
      <p className="font-light lg:text-xl text-sm w-full">{{ description }}</p>

      <div className="lg:text-base text-sm">
        <ul
          className="grid sm:grid-cols-2 grid-cols-1 lg:gap-y-2 gap-y-0.5 list-none"
        >
          <li>
            Type:
            <span className="text-secondColor ml-3 font-bold">{{ type }}</span>
          </li>
          <li>
            View:
            <span className="text-secondColor ml-3 font-bold">{{ view }}</span>
          </li>
          <li>
            Episodes:
            <span className="text-secondColor ml-3 font-bold">
              {{ total_episodes }}
            </span>
          </li>
          <li>
            Genres:
            <span
              v-for="g in genres"
              className="text-secondColor ml-3 font-bold"
            >
              {{ g.name }}
            </span>
          </li>
          <li>
            Status:
            <span className="text-secondColor ml-3 font-bold  ">
              {{ status }}
            </span>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
