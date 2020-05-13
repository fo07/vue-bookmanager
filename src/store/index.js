import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import * as firebase from "firebase/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userInfo: {
      uid: null,
      displayName: null
    },
    bookInfo: {
      title: null,
      author: null,
      isbn: null,
      date: null,
      imageName: null,
      url: null,
      isPurchased: null,
      done: {
        progress: null,
        level: null,
        impression: null
      },
      yet: {
        reason: null
      }
    },
    imageFile: null,
    base64Data: null
  },

  getters: {
    idToken: state => state.idToken,
    uid: state => state.userInfo.uid
  },

  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
    setUserInfo(state, userInfo) {
      state.userInfo.uid = userInfo.uid;
      state.userInfo.displayName = userInfo.userName;
    },
    setBookInfo(state, bookInfo) {
      state.bookInfo.title = bookInfo.title;
      state.bookInfo.author = bookInfo.author;
      state.bookInfo.isbn = bookInfo.isbn;
      state.bookInfo.date = bookInfo.date;
      state.bookInfo.imageName = bookInfo.imageName;
      state.bookInfo.url = bookInfo.url;
      state.bookInfo.isPurchased = bookInfo.isPurchased;
      state.bookInfo.done.progress = bookInfo.done.progress;
      state.bookInfo.done.level = bookInfo.done.level;
      state.bookInfo.done.impression = bookInfo.done.impression;
      state.bookInfo.yet.reason = bookInfo.yet.reason;
    },
    setImageFile(state, imageFile) {
      state.imageFile = imageFile;
    },
    setBase64Data(state, base64Data) {
      state.base64Data = base64Data;
    }
  },

  actions: {
    register(state, authData) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then(({ user }) => {
          user
            .updateProfile({
              displayName: authData.displayName
            })
            .then(() => {
              router.push({ name: "complete" });
            });
        });
    },
    login(state, formData) {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .catch(() => {
          console.log("ログインに失敗しました");
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.replace("/", () => {});
        });
    }
  }
});
