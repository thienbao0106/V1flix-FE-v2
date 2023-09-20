<template>
  <nav
    class="sticky top-0 bg-bgColor bg-gradient-to-b from-black to-transparent z-20 flex items-center justify-center gap-5 text-white py-4 px-5"
  >
    <section class="flex-none w-1/6">Logo</section>
    <section class="flex-1 w-2/6">Genres</section>

    <section aria-label="search" class="flex flex-col w-3/6 h-12 text-white">
      <aside aria-label="input" className="flex flex-row">
        <div
          class="flex justify-center items-center bg-gray-500 bg-opacity-40 px-2 py-4 rounded-md no-underline text-white gap-3"
        >
          <a
            href="/search"
            class="no-underline text-white hover:text-secondColorBrighter flex justify-between items-center"
          >
            <span class="pi pi-search"></span>
          </a>
          <input
            type="text"
            class="bg-transparent w-xl px-2 focus:outline-none caret-transparent border-0 text-white placeholder:text-white placeholder:font-bold"
            placeholder="Search"
            value=""
          />
        </div>
      </aside>
    </section>
  </nav>
</template>
