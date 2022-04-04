<template>
  <div class="tags">
    <div class="new">
      <button @click="createtag">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in datasourse"
        :key="tag"
        @click="toggle(tag)"
        :class="{ selected: selectedTag.indexOf(tag) >= 0 ? true : false }"
      >
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script lang= "ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Tags extends Vue {
  @Prop(Array) datasourse: string[] | undefined;
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
  createtag() {
    const name = window.prompt("请输入标签名");
    if (name === "") {
      window.alert("输入的标签名不能为空");
    } else if (name === null) {
      return;
    } else if (this.datasourse) {
      this.$emit("update:datasourse", [...this.datasourse, name]);
    }
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