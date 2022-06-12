import { userApi } from "./api/user-api.js";
import { poiApi } from "./api/poi-api.js";
import { reviewApi } from "./api/review-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/pois", config: poiApi.create },
  { method: "DELETE", path: "/api/pois", config: poiApi.deleteAll },
  { method: "GET", path: "/api/pois", config: poiApi.find },
  { method: "GET", path: "/api/pois/{id}", config: poiApi.findOne },
  { method: "DELETE", path: "/api/pois/{id}", config: poiApi.deleteOne },

  { method: "GET", path: "/api/reviews", config: reviewApi.find },
  { method: "GET", path: "/api/reviews/{id}", config: reviewApi.findOne },
  { method: "POST", path: "/api/pois/{id}/reviews", config: reviewApi.create },
  { method: "DELETE", path: "/api/reviews", config: reviewApi.deleteAll },
  { method: "DELETE", path: "/api/reviews/{id}", config: reviewApi.deleteOne },
];