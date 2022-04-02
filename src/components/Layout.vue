<template>
  <div>
    <div class="nav-wrapper">
      <div class="content">
        <slot />
      </div>
      <Nav />
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>
<style lang='scss' scoped>

.nav-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex-grow: 1;
  overflow: auto;
}
</style>