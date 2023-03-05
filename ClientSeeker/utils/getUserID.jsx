import * as SecureStore from 'expo-secure-store';

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export const getUserID = async() => {
  let result = await getValueFor('user').then( result => {
    if(result) {
      parsed = JSON.parse(result);
      return parsed.userID
    }
  })
  return result;
}