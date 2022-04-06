type RecodeItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
};


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
  remove: ({ id:string  }) => boolean;
  create: (name: string) => "success" | "duplicated" | null | undefined;
};




interface Window {
  store:{
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
}
