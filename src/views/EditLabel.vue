<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <FormItem
     :value="tag.name"
      fileName="标签名"
      placeholder="请输入标签名"
      class="from-wrapper"
      @update:value ='updatetag'
    />
    <div class="button-wrapper">
    <Button @click='remove' > 删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tagModelList } from "@/models/tagListModel";
import FormItem from "@/components/money/FormItem.vue";
import Button from "@/Button.vue";
@Component({
  components: { FormItem, Button },
})
export default class EditLable extends Vue {
  tag? :{id:string,name:string} = undefined;
  created() {
    tagModelList.fetch();
    const tags = tagModelList.data;
    const id = this.$route.params.id;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace("/404");
    }
  }
  updatetag(name:string){
    if(this.tag){
    tagModelList.update(this.tag.id,name)
    }
  }
  remove(){
    if(this.tag){
       if (tagModelList.remove(this.tag.id)){
         this.$router.replace('/labels')
       }else(
         window.alert('删除失败')
       )
       
    }
  }
  goBack(){
    this.$router.back()
  }
}
</script>

<style lang='scss' scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  justify-content: space-between;
  align-items: center;
  display: flex;
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
  > .title {
  }
}
.from-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper{
  text-align: center;
  padding: 16px;
  margin-top: 24px;
}
</style>