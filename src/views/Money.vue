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
import { Component } from "vue-property-decorator";




type RecodeItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
}; // 此处声明的变量类型转移不到custom.d.ts  就是说在custom.d.ts中获取不到RecodeItem ?????

@Component({
  components: { Layout, NumberPad, Tags, FormItem, Types },
})

export default class Money extends Vue {
  recode: RecodeItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  }; // 初始值
  recodeList = window.recodeList; //****** */

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
    window.createList(this.recode);
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

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>
