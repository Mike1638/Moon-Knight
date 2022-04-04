const localStorageKeyName = "tagListList";
type Tag ={
    id:string,
    name:string
}
type TagModelList = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  create: (name: string) => 'success' |'duplicated'| null | undefined;
};
const tagModelList: TagModelList = {
  data: [],
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  create(name:string | null) {
     const names = this.data.map(item =>item.name) 
    if (name === "") {
      window.alert("标签名不能为空！");
    } else if (name === null) {
      return;
    }else if(names.indexOf(name)>=0){
        return 'duplicated';
    } 
    else {
      this.data.push({'id':name,'name':name});
      this.save();
      return 'success';
    }
    
  },
};

export { tagModelList };
