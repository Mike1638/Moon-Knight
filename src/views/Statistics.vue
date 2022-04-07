<template>
  <div>
    <Layout>
      <Tabs classPrefix="type" :dataSource="typeList" :value.sync="type" />
      <Tabs
        classPrefix="interval"
        :dataSource="intervalList"
        :value.sync="interval"
      />
        <ol>
          <li v-for="(group,index) in result" :key="index">
            <h3 class="title">{{group.title}}</h3>
            <ol>
              <li class="record" v-for="item in group.items" :key="item.id">
                  <span>{{tagString(item.Tags)}}</span> 
                  <span class="note">{{item.notes}}</span>
                  <span>￥{{item.amount}}</span>
                </li>
            </ol>
          </li>
        </ol>
    </Layout>
  </div>
</template>

<style lang="scss" scoped>
%item{
  padding: 8px 16px;
  min-height:24px;
  display: flex;
  justify-content: space-between;
  align-content:center;
}
.title{
  @extend %item;
}
.record{
  @extend %item;
  background-color: white;
}
.note{
  margin-right: auto;
  margin-left:8px;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import typeList from "@/constants/recordTypeList";
import intervalList from "@/constants/intervalList";

type Tag = {
  id: string;
  name: string;
};

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  tagString(tags:Tag[]){
    return   tags;
  }
  get recodeList() {
    return (this.$store.state as Rootstate).recodeList;
  }
  get result() {
    const { recodeList } = this;

    type HashTableValue ={title:string ,items:RecodeItem[]}
    const hashTable:{[key:string]:HashTableValue} = {};

    for (let i = 0; i < recodeList.length; i++) {
        const [data,time] =  recodeList[i].createAt!.split('T');

        hashTable[data] = hashTable[data] || {title:data,items:[]}
        hashTable[data].items.push(recodeList[i])
   }
    console.log(hashTable);
    
    return hashTable;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  type = "-";
  typeList = typeList;
  interval = "day";
  intervalList = intervalList;
}
</script>



<style lang='scss' scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}
</style>