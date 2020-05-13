<template>
  <div>
    <p>理由・メモ</p>
    <textarea name="reason" rows="4" cols="40" v-model="reason"></textarea>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      reason: ""
    };
  },
  methods: {
    sendYetData: function() {
      this.$emit("sendYetData", this.reason);
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
