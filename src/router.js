import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/bookmarks",
      name: "bookmarks",
      component: () => import("./components/BookmarksList")
    },
    {
      path: "/bookmarks/:id",
      name: "bookmarks-details",
      component: () => import("./components/Bookmark")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddBookmark")
    }
  ]
});
