<template>
  <Layout>
      <Icon name = 'left'/>
      <div>编辑标签</div>

  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tagModelList } from "@/models/tagListModel";
@Component
export default class EditLable extends Vue {
  created() {
    tagModelList.fetch();
    const tags = tagModelList.data;
    const id = this.$route.params.id;
    const tag = tags.filter(t=>t.id === id)[0]
    if(tag){
        console.log(tag);
    }else{
        this.$router.replace('/404')
    }
  }
}
</script>
<style lang='scss' scoped>
</style>