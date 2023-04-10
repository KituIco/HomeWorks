export const removeRequest = async(specsID, requests) => {
  for (let i=0; i<requests.length; i++) {
    if (requests[i].specsID == specsID ) {
      delete requests.splice(i,1);
      return requests;
    }
  }
  return null;
}