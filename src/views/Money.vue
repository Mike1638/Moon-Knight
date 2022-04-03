<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad @update:value="onUpdateOK" @setrecodeList="setrecodeList" />
      <Types :value.sync="recode.type" />
      <Notes @update:value="onUpdateNotes" />
      <Tags :datasourse.sync="tags" @update:value="onUpdateTags" />
      {{ recodeList }}
    </Layout>
  </div>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Notes from "@/components/money/Notes.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Tags from "@/components/money/Tags.vue";
import Types from "@/components/money/Types.vue";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
type Recode = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?:Date 
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
  recodeList: Recode[] = JSON.parse(window.localStorage.getItem('recodeList') || '[]')
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
  setrecodeList(){
    const recode2:Recode = JSON.parse(JSON.stringify(this.recode))
    recode2.createAt = new Date()
    this.recodeList.push(recode2);
   console.log(this.recodeList);
   
}
  @Watch("recodeList")
  onRecodeListchanged() {
    window.localStorage.setItem("recodeList", JSON.stringify(this.recodeList));
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