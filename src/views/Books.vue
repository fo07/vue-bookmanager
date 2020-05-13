<template>
  <div>
    <h3>書籍一覧</h3>
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
            <p>posted_by:{{ book.userInfo.userName }}</p>
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
      name: "",
      books: [],
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
    firebase
      .firestore()
      .collection(`/books`)
      .orderBy("created_at", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const docData = doc.data();
          docData.bookId = doc.id;
          this.books.push(docData);
        });
        this.length = Math.ceil(this.books.length / this.pageSize);
        this.displayLists = this.books.slice(0, this.pageSize);
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
.book_card {
  display: inline-block;
  width: 30%;
}
.book_card p {
  margin-bottom: 5px;
}
</style>