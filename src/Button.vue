<template>
  
    <button class="button" @click="$emit('click',$event)"><slot/></button>
</template>

<script>
export default {};
</script>
<style lang='scss' scoped>
.button {
  background: #767676;
  color: white;
  border: none;
  border-radius: 4px;
  height: 40px;
  padding: 0 16px;
}
</style>