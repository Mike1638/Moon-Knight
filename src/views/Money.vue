<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad @update:value="onUpdateOK" @setrecodeList="setrecodeList" />
      <Types :value.sync="recode.type" />
      <div class="notes">
        <FormItem
          fileName="备注"
          placeholder="请在这里输入备注"
          @update:value="onUpdateNotes"
        />
      </div>
      <Tags :datasourse.sync="tags" @update:value="onUpdateTags" />
      {{ recodeList }}
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/components/Layout.vue";
import FormItem from "@/components/money/FormItem.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Tags from "@/components/money/Tags.vue";
import Types from "@/components/money/Types.vue";
import { Component, Watch } from "vue-property-decorator";
import { modelList } from "@/models/modelList";
import { tagModelList } from "@/models/tagListModel";

const recodeList = modelList.fetch();
type RecodeItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
};
@Component({
  components: { Layout, NumberPad, Tags, FormItem, Types },
})
export default class Money extends Vue {
  recode: RecodeItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  recodeList: RecodeItem[] = recodeList; //****** */
  tags = window.tagList;
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
   modelList.create(this.recode)
  }
  @Watch("recodeList")
  
  onRecodeListchanged() {
    modelList.save(); //***** */
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>


<style lang='scss' scoped>
@import "~@/assets/style/helper.scss";
</style>