import createId from "@/lib/createId";
const localStorageKeyName = "tagListList";
type Tag = {
  id: string;
  name: string;
};
type TagModelList = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  update: (
    id: string,
    name: string
  ) => "success" | "not found" | "duplicated" ;
  remove: ({ id:string }) => boolean;
  create: (name: string) => "success" | "duplicated" | null | undefined;
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
  update(id, name) {
    const idList = this.data.map((item) => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        return "duplicated";
      } else {
        const tag = this.data.filter((item) => item.id === id)[0];
        tag.id= tag.name = name;
        this.save();
        return "success";
      }
    } else {
      return "not found ";
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  },
  create(name: string | null) {
    const names = this.data.map((item) => item.name);
    const id = createId().toString() 
    if (name === "") {
      window.alert("标签名不能为空！");
    } else if (name === null) {
      return;
    } else if (names.indexOf(name) >= 0) {
      return "duplicated";
    } else {
      this.data.push({ id: id, name: name });
      this.save();
      return "success";
    }
  },
};

export { tagModelList };
