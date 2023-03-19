export const removeExisting = (list, myServices) => {
  for (let i=0; i<list.length; i++)
    for (let j=0; j<myServices.length; j++)
      if (list[i].typeID == myServices[j].typeID){
          list.splice(i, 1); 
          i--; break;
      }

  return list
}