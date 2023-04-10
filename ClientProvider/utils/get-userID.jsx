import * as SecureStore from 'expo-secure-store';

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export const getUserID = async() => {
  let token = await getValueFor('access_token').then( result => {
    return result
  })
  
  if (!token) return null;
  let result = await getValueFor('user').then( result => {
    if(result) {
      parsed = JSON.parse(result);
      return parsed.userID
    }
  })
  return result;
}