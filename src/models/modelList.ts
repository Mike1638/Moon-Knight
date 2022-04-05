import clone from "@/lib/clone";
const localStorageKeyName = "recordList";
const modelList = {
  data: [] as RecodeItem[],
  fetch() {
    return JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecodeItem[];
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  create(recode:RecodeItem){
    const recode2: RecodeItem = clone(recode) 
    recode2.createAt = new Date();
    this.data.push(recode2);
    this.save()
  }
};

export { modelList };
