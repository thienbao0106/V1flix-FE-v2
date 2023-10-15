import { createSSRApp, h } from "vue";

import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";
import "virtual:uno.css";
import router from "./router";
import { provideApolloClient } from "@vue/apollo-composable";
import { createHead } from "@unhead/vue";

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  cache,
  uri: import.meta.env.VITE_API_URL,
});

const app = createSSRApp({
  setup() {
    provideApolloClient(apolloClient);
  },
  render: () => h(App),
});
const head = createHead();

app.use(router);
app.mount("#app");
app.use(head);
// app.mixin(VueHeadMixin);
