import Vue from "vue";
import VueRouter from "vue-router";
import Books from "../views/Books.vue";
import Book from "../views/Book.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import UserPage from "../views/UserPage.vue";
import Upload from "../views/Upload.vue";
import Confirm from "../views/Confirm.vue";
import Complete from "../views/Complete.vue";
import * as firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "top",
    component: Books
  },
  {
    path: "/book/:bookId",
    name: "book",
    component: Book
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter(to, from, next) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next("/");
        } else {
          next();
        }
      });
    }
  },
  {
    path: "/userpage/:displayName",
    name: "userPage",
    component: UserPage,
    beforeEnter(to, from, next) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next();
        } else {
          next("/");
        }
      });
    }
  },
  {
    path: "/userpage/:displayName/upload",
    name: "upload",
    component: Upload,
    beforeEnter(to, from, next) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next();
        } else {
          next("/");
        }
      });
    }
  },
  {
    path: "/userpage/:displayName/confirm",
    name: "confirm",
    component: Confirm,
    beforeEnter(to, from, next) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next();
        } else {
          next("/");
        }
      });
    }
  },
  {
    path: "/complete",
    name: "complete",
    component: Complete
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
