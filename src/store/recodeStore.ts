import clone from "@/lib/clone";

const localStorageKeyName = "recordList";

const recodeStore = {
  recodeList: [] as RecodeItem[],
  fetchRecords() {
    this.recodeList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecodeItem[];
    return this.recodeList;
  },

  saveRecords() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recodeList));
  },

  createList (recode: RecodeItem) {
    const recode2: RecodeItem = clone(recode);
    recode2.createAt = new Date().toISOString();
    this.recodeList && this.recodeList.push(recode2);
    recodeStore.saveRecords();
  },
};

recodeStore.fetchRecords()

export default recodeStore