<template>
  <div class="tags">
    <div class="new">
      <button @click="createTags">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        @click="toggle(tag)"
        :class="{ selected: selectedTag.indexOf(tag) >= 0 ? true : false }"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang= "ts">
import TagHelper from "@/mixins/TagHelper";
import { mixins } from "vue-class-component";
import { Component} from "vue-property-decorator";
@Component({
  computed:{
    tagList(){
      return this.$store.state.tagList
    }
  }
})
export default class Tags extends mixins(TagHelper) {
  created(){
    this.$store.commit('fetchTags')
  }
  selectedTag: string[] = [];
  toggle(tag: string) {
    const index = this.selectedTag.indexOf(tag);
    if (index >= 0) {
      this.selectedTag.splice(index, 1);
    } else {
      this.selectedTag.push(tag);
    }
    this.$emit("update:value", this.selectedTag);
  }
}
</script>
<style lang='scss' scoped>
@import "~@/assets/style/helper.scss";
.tags {
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  background-color: #fff;
  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    > li {
      background: #d9d9d9;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      padding: 0 16px 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($color: #333, $amount: 0.5);
        color: white;
      }
    }
  }
  .new button {
    background: transparent;
    border: none;
    color: #999;
    border-bottom: 1px solid;
    padding: 10px 3px;
  }
}
</style>