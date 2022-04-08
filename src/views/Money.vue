<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad @update:value="onUpdateOK" @setrecodeList="setrecodeList" />
      <Tabs :value.sync="recode.type" :dataSource="typeList" />
      <div class="notes">
        <FormItem
          fileName="备注"
          placeholder="请在这里输入备注"
          @update:value="onUpdateNotes"
        />
      </div>
      <Tags  @update:value='recode.tags = $event' />
    </Layout>
  </div>
</template>



<script lang="ts">
import Vue from "vue";
import Layout from "@/components/Layout.vue";
import FormItem from "@/components/money/FormItem.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Tags from "@/components/money/Tags.vue";
import Tabs from "@/components/Tabs.vue"
import typeList from "@/constants/recordTypeList"
import { Component } from "vue-property-decorator";




type RecodeItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
}; // 此处声明的变量类型转移不到custom.d.ts  就是说在custom.d.ts中获取不到RecodeItem ?????

@Component({
  components: { Layout, NumberPad, Tags, FormItem, Tabs },
  computed:{
    recodeList(){
      return this.$store.state.recodeList;
    },
    tags(){
      return this.$store.state.tags;
    }
  }
})

export default class Money extends Vue {
  typeList =typeList
  recode: RecodeItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  }; // 初始值

  created(){
    this.$store.commit('fetchRecords')
  }

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
    this.$store.commit('createList',  this.recode);
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
