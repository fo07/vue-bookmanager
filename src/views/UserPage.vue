<template>
  <div>
    <div>
      <h2>マイページ</h2>
      <p>ユーザー名：{{ userInfo.name }}</p>
      <p>メールアドレス：{{ userInfo.email }}</p>
    </div>
    <h3>登録した書籍： {{ booksCount }}冊</h3>
    <template v-if="userInfo.name">
      <router-link :to="{ name: 'upload', params: { displayName: userInfo.name } }">+新規登録</router-link>
    </template>

    <v-list>
      <v-list-item v-for="book in displayLists" :key="book.bookId" class="book_card">
        <router-link :to="{ name: 'book', params: { bookId: book.bookId } }">
          <template v-if="book.imageURL">
            <img :src="book.imageURL" style="width: 70%; height: 70%" alt />
          </template>
          <template v-else>
            <img src="../assets/noImage.png" style="width: 70%; height: 70%" />
          </template>
          <p>{{ book.title }}</p>
        </router-link>
      </v-list-item>
    </v-list>
    <v-pagination
      v-model="page"
      :circle="circle"
      :disabled="disabled"
      :length="length"
      :next-icon="nextIcon"
      :prev-icon="prevIcon"
      :page="page"
      :total-visible="totalVisible"
      @input="pageChange"
    ></v-pagination>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
export default {
  data() {
    return {
      userInfo: {
        name: "",
        email: ""
      },
      books: [],
      booksCount: 0,
      // vuetify-paginate
      circle: true,
      disabled: false,
      length: 0,
      nextIcon: "mdi-menu-right",
      prevIcon: "mdi-menu-left",
      page: 1,
      totalVisible: 7,
      displayLists: [],
      pageSize: 9
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.userInfo.name = user.displayName;
      this.userInfo.email = user.email;
      firebase
        .firestore()
        .collection("/books")
        .where("userInfo.uid", "==", user.uid)
        .orderBy("created_at", "desc")
        .get()
        .then(querySnapshot => {
          this.booksCount = querySnapshot.docs.length;
          querySnapshot.forEach(doc => {
            const docData = doc.data();
            docData.bookId = doc.id;
            this.books.push(docData);
          });
          this.length = Math.ceil(this.books.length / this.pageSize);
          this.displayLists = this.books.slice(0, this.pageSize);
        });
    });
  },
  methods: {
    pageChange: function(pageNumber) {
      this.displayLists = this.books.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    }
  }
};
</script>

<style scoped>
.books {
  padding: 0 60px 0 60px;
}

.book_card {
  display: inline-block;
  width: 30%;
}
</style>
