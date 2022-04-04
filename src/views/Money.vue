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
import Vue from "vue";
import Layout from "@/components/Layout.vue";
import Notes from "@/components/money/Notes.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Tags from "@/components/money/Tags.vue";
import Types from "@/components/money/Types.vue";
import { Component, Watch } from "vue-property-decorator";
import { modelList } from "@/models/modelList";
import { tagModelList } from "@/models/tagListModel";

const recodeList = modelList.fetch();
const tagList = tagModelList.fetch();
type RecodeItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
};
@Component({
  components: { Layout, NumberPad, Tags, Notes, Types },
})
export default class Money extends Vue {
  recode: RecodeItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  recodeList: RecodeItem[] = recodeList; //****** */
  tags = tagList;
  onUpdateTags(value: string[]) {
    this.recode.tags = value;
  }
  onUpdateNotes(value: string) {
    this.recode.notes = value;
  }
  onUpdateOK(value: string) {
    this.recode.amount = parseFloat(value);
  }
  setrecodeList() {
    const recode2: RecodeItem = JSON.parse(JSON.stringify(this.recode));
    recode2.createAt = new Date();
    this.recodeList.push(recode2);
    console.log(this.recodeList);
  }
  @Watch("recodeList")
  onRecodeListchanged() {
    modelList.save(this.recodeList); //***** */
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