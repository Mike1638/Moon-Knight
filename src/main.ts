import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";
import { tagModelList } from "@/models/tagListModel";
import {modelList} from "@/models/modelList"

Vue.config.productionTip = false;
Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icon", Icon);



// recode store

window.recodeList = modelList.fetch();
window.createList = (recode :RecodeItem)=>{modelList.create(recode);}





// tag store
window.tagList = tagModelList.fetch();
window.findTag =(id:string)=>{
  return window.tagList.filter(t=>t.id === id)[0]
}
window.createTag = (name:string) => {
  const message = tagModelList.create(name);
  if (message === "duplicated") {
    window.alert("亲 保存的标签名重复啦！");
  } else if (message === "success") {
    window.alert("亲 标签名已保存！");
  }
};

window.removeTag = (id:string) => {
  if (tagModelList.remove(id)) {
    return true;
  } else {
    return false;
  }
};

window.updateTag=(id:string,name:string)=>{
   return tagModelList.update(id,name)
}








new Vue({
  router: router,
  store,
  render: (h) => h(App),
}).$mount("#app");
