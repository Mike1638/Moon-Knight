const localStorageKeyName = "recordList";
const modelList = {
    clone(data:RecodeItem[]|RecodeItem){
        JSON.parse(JSON.stringify(data))
    },
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecodeItem[];
  },
  save(data:RecodeItem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
};

export { modelList };
