<script lang="ts">
export default {};
</script>

<template>
  <div
    role="status"
    class="rounded shadow animate-pulse flex flex-row py-2 px-4 gap-x-8 bg-mainColor hover:bg-gray-500 gap-x-2"
  >
    <div class="w-[15%]">
      <svg
        class="w-full h-[87px] text-gray-200 dark:text-gray-600"
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
    <div class="w-[85%] flex flex-col justify-between pr-2 py-2">
      <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      <div class="-mt-2">
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      </div>
      <div class="flex flex-row gap-x-5 justify-between items-center">
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      </div>
    </div>
  </div>
</template>
