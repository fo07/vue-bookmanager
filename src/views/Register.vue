<template>
  <div>
    <h2>登録</h2>
    <p v-if="errored">メールアドレスは既に使われているか、無効な値が入力されました。</p>
    <validation-observer v-slot="v">
      <validation-provider v-slot="v" rules="required|min:2">
        <p>ユーザー名</p>
        <input v-model="name" id="ユーザー名" type="text"/>
        <br />
        <span>{{ v.errors[0] }}</span>
      </validation-provider>
      <br />
      <validation-provider v-slot="v" rules="required|email">
        <p>メールアドレス</p>
        <input v-model="email" id="メールアドレス" type="email" />
        <br />
        <span>{{ v.errors[0] }}</span>
      </validation-provider>
      <br />
      <validation-provider v-slot="v" rules="required|min:8|confirmed:confirmation">
        <p>パスワード</p>
        <input v-model="password" id="パスワード" type="password" />
        <br />
        <span>{{ v.errors[0] }}</span>
        <br />
      </validation-provider>
      <validation-provider v-slot="v" vid="confirmation">
        <p>パスワード確認：</p>
        <input v-model="confirmation" id="confirmation" type="password" />
        <br />
        <span>{{ v.errors[0] }}</span>
        <br />
      </validation-provider>
      <br />
      <v-btn color="primary" class="mr-4" @click="register()" :disabled="v.invalid || !v.validated">登録</v-btn>
    </validation-observer>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmation: "",
      errored: false,
      registered: false
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.registered = true;
      }
    });
  },
  methods: {
    register() {
      if (this.registered) {
        alert("既にログインしています");
        this.$router.push({ name: "top" });
        return;
      }
      if (!this.registered) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(({ user }) => {
            user
              .updateProfile({
                displayName: this.name
              })
              .then(() => {
                this.$emit("login");
                this.$router.push({ name: "complete" });
              });
          })
          .catch(() => {
            this.errored = true;
            return false;
          });
      }
    }
  }
};
</script>
<style scoped>
input {
  border: 1px solid lightblue;
}
</style>
