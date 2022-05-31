export const getItemFromLocalStorage=(nameItem)=>{
  return  JSON.parse(localStorage.getItem(nameItem)) 
}

export const setItemToLocalStorage=(nameItem,item)=>{
    return localStorage.setItem(nameItem, JSON.stringify(item));
}