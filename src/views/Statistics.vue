<template>
  <div>
    <Layout>
      <Tabs classPrefix="type" :dataSource="typeList" :value.sync="type" />
      <!-- <Tabs
        classPrefix="interval"
        :dataSource="intervalList"
        :value.sync="interval"
      /> -->
        <ol>
          <li v-for="(group,index) in result " :key="index">
            <h3 class="title">{{beautify(group.title)}} <span>{{group.total}}</span></h3>
            <ol>
              <li class="record" v-for="item in group.items" :key="item.id">
                  <span>{{tagString(item.tags)}}</span> 
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
import dayjs from 'dayjs'
import clone from "@/lib/clone";
type Tag = {
  id: string;
  name: string;
};
type Rootstate = {
  recodeList: RecodeItem[];
  tagList: Tag[];
  currentTag?: Tag;
};

type RecodeItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createAt?: string;
};


@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  beautify(string:string){
     const day = dayjs(string);
     if(day.isSame(dayjs(),'day')){
       return '今天'
     }else if(day.isSame(dayjs().subtract(1,'day'),'day')){
       return '昨天'
     } else if(day.isSame(dayjs().subtract(2,'day'),'day')){
       return '前天'
     } else {
       return day.format('YYYY年MM月DD日')
     }
  }
  tagString(tags:Tag[]){
    console.log(tags);
    
    return   tags.length === 0? '无' : tags.join('.');
  }
  get recodeList() {
    return (this.$store.state as Rootstate).recodeList;
  }
  get result() {
    type GroupList={title:string,total:number,items:RecodeItem[]}[]
    const { recodeList } = this;
    const newRecordList = clone(recodeList).filter(r=>r.type === this.type).sort((a,b)=>dayjs(b.createAt).valueOf()-dayjs(a.createAt).valueOf())
    if(newRecordList.length === 0){return [] as GroupList}
    const groupList = [{'title':dayjs(newRecordList[0].createAt).format('YYYY/MM/DD'),total:0,items:[newRecordList[0]]}]
     for(let i = 1;i<newRecordList.length;i++){
        const current = newRecordList[i];
        const last = groupList[groupList.length-1]
        if(dayjs(last.title).isSame(dayjs(current.createAt),'day')){
             last.items.push(current);
        }else{
            groupList.push({title:dayjs(current.createAt).format('YYYY/MM/DD'),total:0,items:[current]})
        }
     }
     groupList.map(group=>{group.total = group.items.reduce((sum,item)=>sum+item.amount,0)})

     console.log(groupList);
     
     return  groupList
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