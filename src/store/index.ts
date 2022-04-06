import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
type Rootstate={
  recodeList : RecodeItem[],
  tagList : Tag[],
  currentTag?:Tag,
}
const store =  new Vuex.Store({
  state: {
   recodeList : [] as RecodeItem[],
   tagList : [] as Tag[],
   currentTag:undefined
  } as Rootstate,
  mutations:{
    fetchRecords(state) {
       state.recodeList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecodeItem[];
    },
    createList (state,recode: RecodeItem) {
      const recode2: RecodeItem = clone(recode);
      recode2.createAt = new Date();
      state.recodeList.push(recode2);
      console.log(recode);
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem("recordList", JSON.stringify(state.recodeList));
    },



    fetchTags(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagListList") || "[]");
    },
    saveTags(state) {
      window.localStorage.setItem("tagListList", JSON.stringify(state.tagList));
    },
    setCurrentTag (state,id: string){
      state.currentTag = state.tagList.filter((t: { id: string; })=> t.id === id)[0];
    },
    updateTag (state,payload:{id: string, name: string}) {
      const {id,name} = payload;
      const idList = state.tagList.map((item: { id: string; }) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item: { name: string; }) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了')
        } else {
          const tag = state.tagList.filter((item: { id: string; }) => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags')
        }
      } 
    },
    removeTag(state,id:string){
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if(index >=0){
        state.tagList.splice(index, 1);
        store.commit('saveTags')
        router.back();
      }else{
        window.alert('删除失败')
      }
  },
  
    createTag(state,name: string){
      const names = state.tagList.map((item: { name: string; }) => item.name);
      const id = createId().toString() 
      if (name === "") {
        window.alert("标签名不能为空！");
      } else if (name === null) {
        return;
      } else if (names.indexOf(name) >= 0) {
        window.alert("亲 保存的标签名重复啦！");
        return "duplicated";
      } else {
        state.tagList.push({ id: id, name: name });
        store.commit('saveTags')
        window.alert("亲 标签名已保存！");
        return "success";
      }
    },
  

  }
 
})
export default store