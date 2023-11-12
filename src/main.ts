import { createSSRApp, h } from "vue";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";
import "virtual:uno.css";
import router from "./router";
import { addIcon } from "./../utils/handleIcons";

import { provideApolloClient } from "@vue/apollo-composable";
import { createHead } from "@unhead/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: import.meta.env.VITE_API_URL,
    fetchOptions: {
      mode: import.meta.env.DEV ? "cors" : "no-cors",
    },
  }),
});

/* import font awesome icon component */
addIcon();
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
app.component("font-awesome-icon", FontAwesomeIcon);
// app.mixin(VueHeadMixin);
