let id : number = parseInt(window.localStorage.getItem('_IdMax') || '0') || 0

function createId(){
   id ++;
   window.localStorage.setItem('_IdMax',id.toString()) 
   return id
}

export default createId