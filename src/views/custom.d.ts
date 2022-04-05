type RecodeItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
};

interface Window {
  // tag
  tagList: tag[];
  findTag:(id:string)=>Tag
  createTag: (name: string) => void;
  removeTag: (id: string) => boolean;
  updateTag: (
    id: string,
    name: string
  ) => "success" | "not found" | "duplicated";

  //recodeList
  recodeList:RecodeItem[];
  createList:(recode:RecodeItem)=>void;
}
