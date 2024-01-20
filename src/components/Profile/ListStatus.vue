<script lang="ts">
export default {
  data() {
    return {
      isCollapse: window.innerWidth < 1024 ? false : true,
      keyword: "",
      historyList: [] as any,
      favoriteList: [] as any,
    };
  },
  setup(props) {
    console.log(props.isOwner);
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    toggleList: function (isCollapse: boolean) {
      this.isCollapse = !isCollapse;
    },
    onResize: function () {
      if (window.innerWidth < 1024) return;
      if (this.isCollapse === false) this.isCollapse = true;
    },
    handleSearch: function () {
      if (this.currentType === "all") {
        this.setListSeries(
          this.userList.filter((item: any) =>
            item.series.title.main_title
              .toLowerCase()
              .includes(this.keyword.toLowerCase())
          )
        );
        return;
      }
      if (this.currentType === "favorite") {
        if (this.keyword === "") return this.favoriteList;
        this.setListSeries(
          [...this.favoriteList].filter((item: any) =>
            item.series.title.main_title
              .toLowerCase()
              .includes(this.keyword.toLowerCase())
          )
        );
        return;
      }

      this.setListSeries(
        this.userList.filter((item: any) => {
          return (
            item.status === this.currentType.toLowerCase() &&
            item.series.title.main_title
              .toLowerCase()
              .includes(this.keyword.toLowerCase())
          );
        })
      );
    },
    showFavorite: function () {
      this.setCurrentType("favorite");
      this.favoriteList = this.favorList.map((series: any) => {
        return {
          series,
        };
      });
      this.setListSeries(this.favoriteList);

      return;
    },
  },
  props: [
    "count",
    "typeList",
    "setCurrentType",
    "setListSeries",
    "currentType",
    "userList",
    "isOwner",
    "favorList",
  ],
};
</script>

<template>
  <section class="lg:w-1/5 w-full lg:mb-0 mb-5">
    <div class="w-full mb-5">
      <h1 class="font-bold text-xl my-1.5">Filters</h1>

      <input
        type="text"
        v-model="keyword"
        placeholder="Please input your search"
        @input="handleSearch"
        class="w-full text-white font-bold pl-2 py-2 rounded-md bg-mainColor"
      />
    </div>

    <div class="my-5">
      <h1
        @click="showFavorite()"
        class="cursor-pointer hover:text-secondColor font-bold text-xl my-1.5"
      >
        Favorites
      </h1>
    </div>
    <div class="flex flex-row justify-between items-center w-full">
      <h1 class="font-bold text-xl">Lists</h1>
      <button
        @click="toggleList(isCollapse)"
        class="bg-mainColor lg:invisible visible text-white hover:bg-secondColor font-bold rounded-lg"
      >
        <font-awesome-icon
          v-if="!isCollapse"
          icon="fa-solid fa-arrow-down"
          class="px-3 py-1.5"
        />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-arrow-up"
          class="px-3 py-1.5"
        />
      </button>
    </div>
    <ul v-if="isCollapse" class="pt-5">
      <li
        v-for="(type, index) in typeList"
        class="hover:bg-secondColor hover:cursor-pointer hover:font-bold py-3 px-3"
        @click="setCurrentType(type)"
      >
        <div class="flex flex-row justify-between items-center">
          <span>
            {{ type }}
          </span>
          <span> {{ count[index] }} </span>
        </div>
      </li>
    </ul>
  </section>
</template>
