<template>
  <div>
    <label class="fromItem">
      <span class="name"> {{ this.fileName }}</span>
      <input type="text" :placeholder="placeholder" :value="value" @input="onValueChange($event.target.value)" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop} from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop({default:''}) readonly value! :string;

  @Prop({ required: true }) fileName!: string;
  @Prop({ required: true }) placeholder!: string;


  onValueChange(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/style/helper.scss";
.fromItem {
  display: flex;
  font-size: 14px;
  padding-left: 16px;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>