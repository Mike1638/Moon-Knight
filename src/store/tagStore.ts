import createId from "@/lib/createId";
const localStorageKeyName = "tagListList";


const tagStore = {
    tagList :[] as Tag[],

    findTag (id: string){
      return this.tagList.filter((t: { id: string; })=> t.id === id)[0];
    },

    saveTags() {
      window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
    },
    
    fetchTags() {
      this.tagList = JSON.parse(
        window.localStorage.getItem(localStorageKeyName) || "[]"
      );
      return this.tagList;
    },

  
 
    createTag(name: string){
      const names = this.tagList.map((item: { name: string; }) => item.name);
      const id = createId().toString() 
      if (name === "") {
        window.alert("标签名不能为空！");
      } else if (name === null) {
        return;
      } else if (names.indexOf(name) >= 0) {
        window.alert("亲 保存的标签名重复啦！");
        return "duplicated";
      } else {
        this.tagList.push({ id: id, name: name });
        this.saveTags();
        window.alert("亲 标签名已保存！");
        return "success";
      }
    },
  
    removeTag(id:string){
      let index = -1;
      for (let i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      this.tagList.splice(index, 1);
      this.saveTags();
      return true;
    },
  


    updateTag (id: string, name: string) {
      const idList = this.tagList.map((item: { id: string; }) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = this.tagList.map((item: { name: string; }) => item.name);
        if (names.indexOf(name) >= 0) {
          return "duplicated";
        } else {
          const tag = this.tagList.filter((item: { id: string; }) => item.id === id)[0];
          tag.name = name;
          this.saveTags();
          return "success";
        }
      } else {
        return "not found ";
      }
    },
}


tagStore.fetchTags()

export default tagStore