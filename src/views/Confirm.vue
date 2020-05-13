<template>
  <div>
    <h3>入力内容確認</h3>
    <div v-if="base64Data.base64Data">
      <img :src="base64Data.base64Data" style="width: 350px; height: 350px" />
    </div>
    <div v-else>
      <img src="../assets/noImage.png" style="width: 350px; height: 350px" />
    </div>
    <p>タイトル：{{ bookInfo.title }}</p>
    <p>著者：{{ bookInfo.author }}</p>
    <p>ISBN：{{ bookInfo.isbn }}</p>
    <p>出版日：{{ bookInfo.date }}</p>
    <p>URL：{{ bookInfo.url }}</p>
    <div v-if="bookInfo.isPurchased === 'done'">
      <p style="color: reen;">購入済み</p>
      <p>読み込み度：{{ bookInfo.done.progress }}</p>
      <p>おすすめ対象：{{ bookInfo.done.level }}</p>
      <p>感想・メモ</p>
      {{ bookInfo.done.impression }}
    </div>
    <div v-if="bookInfo.isPurchased === 'yet'">
      <p style="color: orange;">購入予定</p>
      <p>理由・メモ</p>
      {{ bookInfo.yet.reason }}
    </div>
    <v-btn color="primary" class="mr-4" @click="addBook">登録</v-btn>
    <v-btn color="error" class="mr-4" @click="back">修正</v-btn>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
export default {
  data() {
    return {
      bookInfo: {
        userInfo: {
          uid: null,
          userName: null
        },
        title: "",
        author: "",
        isbn: "",
        date: "",
        imageName: "",
        imageURL: "",
        url: "",
        isPurchased: "",
        done: {
          progress: "",
          level: "",
          impression: ""
        },
        yet: {
          reason: ""
        },
        created_at: ""
      },
      base64Data: null,
      imageFile: "",
      bookId: "",
      books: []
    };
  },
  created() {
    this.bookInfo.userInfo.uid = this.$store.state.userInfo.uid;
    this.bookInfo.userInfo.userName = this.$store.state.userInfo.displayName;
    this.bookInfo.title = this.$store.state.bookInfo.title;
    this.bookInfo.author = this.$store.state.bookInfo.author;
    this.bookInfo.isbn = this.$store.state.bookInfo.isbn;
    this.bookInfo.date = this.$store.state.bookInfo.date;
    this.bookInfo.imageName = this.$store.state.bookInfo.imageName;
    this.bookInfo.url = this.$store.state.bookInfo.url;
    this.bookInfo.isPurchased = this.$store.state.bookInfo.isPurchased;
    this.bookInfo.done.progress = this.$store.state.bookInfo.done.progress;
    this.bookInfo.done.level = this.$store.state.bookInfo.done.level;
    this.bookInfo.done.impression = this.$store.state.bookInfo.done.impression;
    this.bookInfo.yet.reason = this.$store.state.bookInfo.yet.reason;
    this.bookInfo.created_at = new Date();
    this.base64Data = this.$store.state.base64Data;
    this.imageFile = this.$store.state.imageFile;

    if (!this.bookInfo.userInfo.uid) {
      alert("入力し直して下さい");
      this.$router.push({ name: "upload" });
    }

    firebase
      .firestore()
      .collection(`/books`)
      .where("userInfo.uid", "==", this.bookInfo.userInfo.uid)
      .where("isbn", "==", this.bookInfo.isbn)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.books.push(doc.data());
        });
        // console.log(this.books.length);
        if (this.books.length) {
          {
            alert("この本は既に登録されています");
            this.$router.go(-1);
          }
        }
      });
  },
  methods: {
    addBook() {
      firebase
        .firestore()
        .collection(`books/`)
        .add(this.bookInfo)
        .then(docRef => {
          this.bookId = docRef.id;
          if (this.imageFile) {
            firebase
              .storage()
              .ref()
              .child("bookImages/" + this.bookId)
              .put(this.imageFile)
              .then(() => {
                firebase
                  .storage()
                  .ref()
                  .child("bookImages/" + this.bookId)
                  .getDownloadURL()
                  .then(url => {
                    firebase
                      .firestore()
                      .collection(`books/`)
                      .doc(this.bookId)
                      .update({
                        imageURL: url
                      });
                  });
              });
          }
          this.$router.push({ name: "complete" });
        });
    },
    back() {
      this.$store.state.base64Data = null;
      this.$router.push({ name: "upload" });
    }
  }
};
</script>
