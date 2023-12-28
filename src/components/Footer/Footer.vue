<template>
  <section aria-label="footer" class="px-8 py-5 lg:space-y-5 space-y-10">
    <div
      class="flex justify-between items-center border-b border-slate-500 text-white py-5"
    >
      <h1>Your logo</h1>
      <div>Content here</div>
    </div>
    <aside
      aria-label="content"
      class="lg:flex lg:flex-row lg:gap-x-5 lg:space-y-0 space-y-10"
    >
      <div class="basis-3/6 space-y-4">
        <h1 class="font-bold text-4xl text-white">V1flix</h1>
        <div class="text-opacity-70 text-white">
          <p>Copyright ©V1fix. All rights reserved.</p>
          <p>
            This site does not store any files on its server. All contents are
            provided by non-affiliated third parties.
          </p>
        </div>
        <div class="text-white space-y-4">
          <h2 class="text-xl">Communities</h2>
          <div class="flex gap-x-10 text-2xl">
            <div class="hover:text-secondColor hover:cursor-pointer">
              <font-awesome-icon icon="fa-brands fa-discord" />
            </div>
            <div class="hover:text-secondColor hover:cursor-pointer">
              <font-awesome-icon icon="fa-brands fa-facebook" />
            </div>
            <div class="hover:text-secondColor hover:cursor-pointer">
              <font-awesome-icon icon="fa-brands fa-youtube" />
            </div>
          </div>
        </div>
      </div>
      <div class="basis-1/6 text-white lg:text-2xl text-base">Help</div>
      <div class="basis-1/6 text-white lg:text-2xl text-base">FAQ</div>
      <div class="basis-1/6 text-white lg:text-2xl text-base">Terms</div>
    </aside>
  </section>
</template>
