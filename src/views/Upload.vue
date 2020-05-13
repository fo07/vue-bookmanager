<template>
  <div>
    <validation-observer v-slot="v">
      <div>
        <h3>書籍情報</h3>
        <validation-provider v-slot="v" rules="required">
          <label for="title">タイトル：</label>
          <input v-model="bookInfo.title" id="タイトル" type="text" />
          <br />
          <span>{{ v.errors[0] }}</span>
        </validation-provider>
        <br />
        <validation-provider v-slot="v" rules="required">
          <label for="author">著者：</label>
          <input v-model="bookInfo.author" id="著者" type="text" />
          <br />
          <span>{{ v.errors[0] }}</span>
        </validation-provider>
        <br />
        <validation-provider v-slot="v" rules="required">
          <label for="isbn">ISBN：</label>
          <input v-model="bookInfo.isbn" id="ISBN" type="text" />
          <br />
          <span>{{ v.errors[0] }}</span>
        </validation-provider>
        <br />
        <validation-provider v-slot="v" rules="required">
          <label for="date">出版日：</label>
          <input v-model="bookInfo.date" id="出版日" type="text" />
          <br />
          <span>{{ v.errors[0] }}</span>
        </validation-provider>
        <br />
        <img :src="base64Data" style="width: 200px; height: 200px" />
        <br />
        <label for="image"></label>
        <input type="file" accept="image/*" @change="onImageChange" />
        <br />
        <br />
        <label for="url">書籍URL：</label>
        <input v-model="bookInfo.url" id="url" type="text" />
        <br />
        <br />
      </div>
      <div>
        <input type="radio" id="done" value="done" v-model="bookInfo.isPurchased" />
        <label for="done">購入済み</label>
        <input type="radio" id="yet" value="yet" v-model="bookInfo.isPurchased" />
        <label for="yet">購入予定</label>
        <div v-show="bookInfo.isPurchased === 'done'">
          <Done @sendDoneData="setDoneData" ref="done" />
        </div>
        <div v-show="bookInfo.isPurchased === 'yet'">
          <Yet @sendYetData="setYetData" ref="yet" />
        </div>
      </div>
      <v-btn color="primary" class="mr-4" @click="addBook" :disabled="v.invalid || !v.validated">確認</v-btn>
      <v-btn color="error" class="mr-4" @click="cancel">取り消す</v-btn>
    </validation-observer>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import Done from "../components/bookPurchased/Done";
import Yet from "../components/bookPurchased/Yet.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    Done,
    Yet,
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      userInfo: {
        uid: "",
        userName: ""
      },
      bookInfo: {
        title: "",
        author: "",
        isbn: "",
        date: "",
        imageName: null,
        url: "",
        isPurchased: "done",
        done: {
          progress: "",
          level: "",
          impression: ""
        },
        yet: {
          reason: ""
        }
      },
      base64Data: "",
      imageFile: ""
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userInfo.uid = user.uid;
        this.userInfo.userName = user.displayName;
      }
    });
  },
  methods: {
    onImageChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      const reader = new FileReader();
      reader.onload = e => {
        this.base64Data = e.target.result;
      };
      reader.readAsDataURL(files[0]);
      this.bookInfo.imageName = files[0]["name"];
      this.imageFile = files[0];
    },
    setDoneData(progress, level, impression) {
      this.bookInfo.done.progress = progress;
      this.bookInfo.done.level = level;
      this.bookInfo.done.impression = impression;
    },
    setYetData(reason) {
      this.bookInfo.yet.reason = reason;
    },
    addBook() {
      this.$store.commit("setBase64Data", { base64Data: this.base64Data });
      if (this.bookInfo.isPurchased === "done") {
        this.$refs.done.sendDoneData();
        this.clearYet();
        this.$store.commit("setUserInfo", this.userInfo);
        this.$store.commit("setBookInfo", this.bookInfo);
        this.$store.commit("setImageFile", this.imageFile);
        this.$router.push({ name: "confirm" });
      }
      if (this.bookInfo.isPurchased === "yet") {
        this.$refs.yet.sendYetData();
        this.clearDone();
        this.$store.commit("setUserInfo", this.userInfo);
        this.$store.commit("setBookInfo", this.bookInfo);
        this.$store.commit("setImageFile", this.imageFile);
        this.$router.push({ name: "confirm" });
      }
    },
    clearYet() {
      this.bookInfo.yet.reason = "";
    },
    clearDone() {
      this.bookInfo.done.progress = "";
      this.bookInfo.done.level = "";
      this.bookInfo.done.impression = "";
    },
    cancel() {
      this.$router.push({ name: "userPage" });
    }
  }
};
</script>
<style scoped>
input {
  border: 1px solid lightblue;
}
</style>
