const localStorageKeyName = "tagListList";
type TagModelList = {
  data: string[];
  fetch: () => string[];
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
    if (name === "") {
      window.alert("标签名不能为空！");
    } else if (name === null) {
      return;
    }else if(this.data.indexOf(name)>=0){
        return 'duplicated';
    } 
    else {
      this.data.push(name);
      this.save();
      return 'success';
    }
    
  },
};

export { tagModelList };
