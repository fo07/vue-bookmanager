<template>
  <div>
    <h2>ログイン</h2>
    <p v-if="errored">ログインに失敗しました。</p>
    <validation-observer v-slot="v">
      <validation-provider v-slot="v" rules="required">
        <p>メールアドレス</p>
        <input v-model="email" id="メールアドレス" type="email" />
        <br />
        <span>{{ v.errors[0] }}</span>
      </validation-provider>
      <validation-provider v-slot="v" rules="required|min:6">
        <p>パスワード</p>
        <input v-model="password" id="パスワード" type="password" />
        <br />
        <span>{{ v.errors[0] }}</span>
      </validation-provider>
      <br />
      <br />
      <v-btn color="primary" class="mr-4" @click="login" :disabled="v.invalid || !v.validated">
        ログイン
      </v-btn>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import * as firebase from "firebase/app";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      email: "",
      password: "",
      errored: false
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(() => {
          console.log("ログインに失敗しました");
          this.errored = true;
        });
      this.email = "";
      this.password = "";
    }
  }
};
</script>
<style scoped>
input {
  border: 1px solid lightblue;
}
</style>
