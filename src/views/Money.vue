<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad @update:value="onUpdateOK" />
      <Types :value.sync='recode.type'  />
      <Notes @update:value="onUpdateNotes" />
      <Tags :datasourse.sync="tags" @update:value="onUpdateTags" />
      {{recode}}
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/components/Layout.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Tags from "@/components/money/Tags.vue";
import Notes from "@/components/money/Notes.vue";
import Types from "@/components/money/Types.vue";
import { Component } from "vue-property-decorator";
type Recode = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
};
@Component({
  components: { Layout, NumberPad, Tags, Notes, Types },
})
export default class Money extends Vue {
  recode: Recode = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  tags = ["衣", "食", "住", "行", "打游戏"];
  onUpdateTags(value: string[]) {
    this.recode.tags = value;
  }
  onUpdateNotes(value: string) {
    this.recode.notes = value;
  }
  onUpdateOK(value: string) {
    this.recode.amount = parseFloat(value);
  }
}
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