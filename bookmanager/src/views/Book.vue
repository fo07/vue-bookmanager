<template>
  <div>
    <div>
      <div v-if="bookInfo.imageURL">
        <img :src="bookInfo.imageURL" style="width: 350px; height: 350px" alt />
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
        <p>購入済み</p>
        <p>読み込み度：{{ bookInfo.done.progress }}</p>
        <p>おすすめ対象：{{ bookInfo.done.level }}</p>
        <p>感想・メモ</p>
        {{ bookInfo.done.impression }}
      </div>
      <div v-if="bookInfo.isPurchased === 'yet'">
        <p>購入予定</p>
        <p>理由・メモ</p>
        {{ bookInfo.yet.reason }}
      </div>
    </div>
    <span class="btn">
      <span>
        <v-btn rounded color="primary" class="mr-4 rounded" @click="backPage">戻る</v-btn>
      </span>
      <span v-if="uid === docUid">
        <v-btn rounded color="error" class="mr-4" @click="deleteBook">削除</v-btn>
      </span>
    </span>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
export default {
  data() {
    return {
      uid: null,
      displayName: null,
      docUid: null,
      bookInfo: {}
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
    firebase
      .firestore()
      .collection(`/books`)
      .doc(this.$route.params.bookId)
      .get()
      .then(doc => {
        this.docUid = doc.data().userInfo.uid;
        const docData = doc.data();
        docData.bookId = doc.id;
        this.bookInfo = docData;
      });
  },
  methods: {
    deleteBook() {
      const checked = confirm("本当に削除しますか？");
      if (checked) {
        firebase
          .firestore()
          .collection(`/books`)
          .doc(this.$route.params.bookId)
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          });
        if (this.bookInfo.imageURL) {
          firebase
            .storage()
            .ref()
            .child("bookImages/" + this.$route.params.bookId)
            .delete()
            .then(function() {
              console.log("File deleted successfully");
            });
        }
        this.$router.push({
          name: "complete"
        });
      }
    },
    backPage() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.btn {
  margin: 100px 0 30px 0;
}
</style>>
