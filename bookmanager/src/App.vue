<template>
  <v-app>
    <header>
      <h1>
        <router-link to="/">BookManager</router-link>
      </h1>
      <div class="header-items">
        <template v-if="uid">
          <span>ユーザー名：</span>
          <router-link
            :to="{ name: 'userPage', params: { displayName: name } }"
            class="header-item"
          >{{ name }}</router-link>/
          <span @click="logout" class="header-item" style="color: red;">ログアウト</span>
        </template>
        <template v-if="!uid">
          <router-link to="/login" class="header-item">ログイン</router-link>
          <router-link to="/register" class="header-item">ユーザー登録</router-link>
        </template>
      </div>
    </header>
    <router-view @login="login"></router-view>
  </v-app>
</template>
<script>
import * as firebase from "firebase/app";
export default {
  data() {
    return {
      uid: null,
      name: null,
      email: null
    };
  },
  created() {
    this.login();
  },
  methods: {
    login() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.uid = user.uid;
          this.name = user.displayName;
          this.email = user.email;
        }
      });
    },
    logout() {
      const checked = confirm("ログアウトしますか？");
      if (checked) {
        this.$store.dispatch("logout");
        this.uid = "";
        this.name = "";
        this.email = "";
      }
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
a {
  text-decoration: none;
}
</style>
<style scoped>
h1 {
  margin-bottom: 20px;
}
header {
  margin: 30px 0 40px 0;
}
.header-item {
  padding: 10px 20px 10px 0;
  cursor: pointer;
}
</style>
