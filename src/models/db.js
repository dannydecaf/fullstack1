import { userMemStore } from "./mem/user-mem-store.js";
import { poiMemStore } from "./mem/poi-mem-store.js";
import { reviewMemStore } from "./mem/review-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { poiJsonStore } from "./json/poi-json-store.js";
import { reviewJsonStore } from "./json/review-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { poiMongoStore } from "./mongo/poi-mongo-store.js";
import { reviewMongoStore } from "./mongo/review-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  poiStore: null,
  reviewStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.poiStore = poiJsonStore;
        this.reviewStore = reviewJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.poiStore = poiMongoStore;
        this.reviewStore = reviewMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.poiStore = poiMemStore;
        this.reviewStore = reviewMemStore;
    }
  },
};
