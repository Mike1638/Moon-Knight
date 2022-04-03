<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad />
      <Types />
      <Notes />
      <Tags :datasourse="tags" @update:datasourse="tags = $event" />
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Tags from "@/components/money/Tags.vue";
import Notes from "@/components/money/Notes.vue";
import Types from "@/components/money/Types.vue";

export default {
  data() {
    return {
      tags: ["衣", "食", "住", "行" ,'打游戏'],
    };
  },
  components: { Layout, NumberPad, Tags, Notes, Types },
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>


<style lang='scss' scoped>
@import "~@/assets/style/helper.scss";
</style>