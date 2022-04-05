type RecodeItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createAt?:Date 
  };

  interface Window{
    tagList:tag[]
  }