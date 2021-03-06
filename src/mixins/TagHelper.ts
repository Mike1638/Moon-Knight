import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class TagHelper extends Vue{
  createTags() {
    const name = window.prompt("请输入标签名");
    if (name === "") {
      window.alert("输入的标签名不能为空");
    } else if (name === null) {
      return;
    } else{
      this.$store.commit('createTag',name)
    }
}
}

export default TagHelper