<template>
  <div class="numberpad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputNumber">1</button>
      <button @click="inputNumber">2</button>
      <button @click="inputNumber">3</button>
      <button @click="deleteNumber">删除</button>
      <button @click="inputNumber">4</button>
      <button @click="inputNumber">5</button>
      <button @click="inputNumber">6</button>
      <button @click="removeNumber">清空</button>
      <button @click="inputNumber">7</button>
      <button @click="inputNumber">8</button>
      <button @click="inputNumber">9</button>
      <button class="ok" @click="ok">OK</button>
      <button class="zero" @click="inputNumber">0</button>
      <button @click="inputNumber">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {
  output = "0";
  inputNumber(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent as string;
    if (this.output.length >= 18) {
      return;
    }
    if (this.output.indexOf(".") !== -1) {
      if (input === ".") {
        return;
      }
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) !== -1) {
        this.output = input;
      } else {
        this.output += input;
      }
    } else {
      this.output += input;
    }
  }
  deleteNumber(){
    if(this.output.length === 1){
      this.output= '0'
    }else{
      this.output = this.output.slice(0,-1)
    }
  }
  removeNumber(){
    this.output= '0'
  }
  ok(){
    this.$emit('update:value',this.output)
    this.$emit('setrecodeList',this.output)
    this.removeNumber()
  }
}
</script>
<style lang='scss' scoped>
@import "~@/assets/style/helper.scss";
.numberpad {
  > .output {
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
    @extend %innershadow;
  }
  .buttons {
    @extend %clearfix;
    > button {
      float: left;
      background: transparent;
      border: none;
      width: 25%;
      height: 64px;
      &.ok {
        height: 128px;
        float: right;
      }
      &.zero {
        width: 50%;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($color: $bg, $amount: 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($color: $bg, $amount: 8%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($color: $bg, $amount: 12%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($color: $bg, $amount: 16%);
      }
      &:nth-child(12) {
        background: darken($color: $bg, $amount: 24%);
      }
      &:nth-child(14) {
        background: darken($color: $bg, $amount: 20%);
      }
    }
  }
}
</style>