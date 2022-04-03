// import { userMemStore } from "./mem/user-mem-store.ts";
// import { countyMemStore } from "./mem/county-mem-store.ts";
// import { placeMemStore } from "./mem/place-mem-store.ts";

import { userJsonStore } from "./json/user-json-store.js";
import { countyJsonStore } from "./json/county-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";

export const db = {
  userStore: null,
  countyStore: null,
  placeStore: null,

  init() {
    this.userStore = userJsonStore;
    this.countyStore = countyJsonStore;
    this.placeStore = placeJsonStore;
  },
};
