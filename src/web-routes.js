import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { poiController } from "./controllers/poi-controller.js";
import { reviewController } from "./controllers/review-controller.js";
import { publicPoiController } from "./controllers/public-poi-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addpoi", config: dashboardController.addPoi },
  { method: "GET", path: "/dashboard/deletepoi/{id}", config: dashboardController.deletePoi },

  { method: "GET", path: "/public", config: publicPoiController.index },
  { method: "POST", path: "/public/addpublicpoi", config: publicPoiController.addPublicPoi },
  { method: "GET", path: "/public/deletepublicpoi/{id}", config: publicPoiController.deletePublicPoi },

  { method: "GET", path: "/poi/{id}", config: poiController.index },
  { method: "POST", path: "/poi/{id}/addreview", config: poiController.addReview },
  { method: "GET", path: "/poi/{id}/deletereview/{reviewid}", config: poiController.deleteReview },
  { method: "POST", path: "/poi/{id}/uploadimage", config: poiController.uploadImage },

  { method: "GET", path: "/review/{id}/editreview/{reviewid}", config: reviewController.index },
  { method: "POST", path: "/review/{id}/updatereview/{reviewid}", config: reviewController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }
];
