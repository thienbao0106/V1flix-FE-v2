<script lang="ts">
export default {
  props: ["rank"],
};
</script>

<template>
  <div
    className="flex flex-row w-full h-auto gap-3 bg-mainColor bg-opacity-50 shadow animate-pulse "
  >
    <div
      className="xl:basis-[20%] lg:basis-[10%] basis-[20%] flex justify-center items-center"
    >
      <span
        :class="
          parseInt(rank) === 1
            ? 'first'
            : parseInt(rank) === 2
            ? 'second'
            : parseInt(rank) === 3
            ? 'third'
            : 'other'
        "
        class="text-5xl text-opacityText font-extrabold"
      >
        {{ rank }}
      </span>
    </div>
    <div className=" xl:basis-1/4 md:basis-[10%] sm:basis-[15%] basis-1/5">
      <svg
        class="w-full h-[100px] text-gray-200 dark:text-gray-600 py-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 20"
      >
        <path
          d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"
        />
        <path
          d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"
        />
      </svg>
    </div>
    <div
      className="flex flex-col lg:basis-[80%]  md:basis-[70%] sm:basis-[65%] basis-3/5   my-auto space-y-3 py-1.5 pr-2"
    >
      <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[93%]"></div>
      <section class="flex justify-between items-center w-full">
        <div
          class="w-fit flex justify-center items-center gap-2 bg-detail rounded-br-xl rounded-l-md rounded-t-md px-2"
        >
          <font-awesome-icon
            icon="fa-solid fa-eye"
            size="1x"
            class="text-white lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
          />
          <div
            class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[30px]"
          ></div>
        </div>
        <div
          className="flex flex-row items-start justify-between pr-5 py-0.5  rounded-b-md"
        >
          <div
            class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[30px]"
          ></div>
        </div>
      </section>

      <div
        class="w-fit flex justify-center items-center gap-2 bg-detail rounded-br-xl rounded-l-md rounded-t-md px-2 mb-5"
      >
        <font-awesome-icon
          icon="fa-solid fa-star"
          size="1x"
          class="text-secondColor lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
        />
        <div
          class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[30px]"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.first {
  text-shadow: 1px 0 #8789c0, -1px 0 #8789c0, 0 1px #8789c0, 0 -1px #8789c0;
}
.second {
  text-shadow: 1px 0 #5dfdcb, -1px 0 #5dfdcb, 0 1px #5dfdcb, 0 -1px #5dfdcb;
}
.third {
  text-shadow: 1px 0 #7cc6fe, -1px 0 #7cc6fe, 0 1px #7cc6fe, 0 -1px #7cc6fe;
}
.other {
  text-shadow: 1px 0 #c2cae8, -1px 0 #c2cae8, 0 1px #c2cae8, 0 -1px #c2cae8;
}
</style>
