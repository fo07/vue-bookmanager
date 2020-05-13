<template>
  <div>
    <p>完了しました。</p>
    <router-link :to="{ name: 'top' }">TOPへ</router-link>/
    <template v-if="userInfo.name">
      <router-link
        :to="{ name: 'userPage', params: { displayName: userInfo.name } }"
        >マイページへ</router-link
      >
    </template>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
export default {
  data() {
    return {
      userInfo: {
        uid: "",
        name: ""
      }
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userInfo.uid = user.uid;
        this.userInfo.name = user.displayName;
      }
    });
  }
};
</script>
