<template>
  <div>
    <div>
      <p>読み込み度：</p>
      <input type="radio" id="onTheWay" value="未完" v-model="progress" />
      <label for="onTheWay">未完</label>
      <input type="radio" id="one" value="１周目" v-model="progress" />
      <label for="one">１周</label>
      <input type="radio" id="two" value="２周目" v-model="progress" />
      <label for="two">２周</label>
      <input type="radio" id="well" value="３周以上" v-model="progress" />
      <label for="well">３周以上</label>
      <br />
    </div>
    <div>
      <p>おすすめ対象：</p>
      <input type="radio" id="firstTime" value="入門" v-model="level" />
      <label for="firstTime">入門</label>
      <input type="radio" id="beginner" value="初級" v-model="level" />
      <label for="beginner">初級</label>
      <input type="radio" id="intermediate" value="中級" v-model="level" />
      <label for="intermediate">中級</label>
      <input type="radio" id="advanced" value="上級" v-model="level" />
      <label for="advanced">上級</label>
      <br />
    </div>
    <div>
      <p>感想・メモ</p>
      <textarea name="impression" rows="4" cols="40" v-model="impression"></textarea>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: "未完",
      level: "入門",
      impression: null
    };
  },
  methods: {
    sendDoneData: function() {
      this.$emit("sendDoneData", this.progress, this.level, this.impression);
    }
  }
};
</script>
<style scoped>
input {
  border: 1px solid lightblue;
}
textarea {
  border: 1px solid lightblue;
}
</style>
