import * as SecureStore from 'expo-secure-store';

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export const getUserID = () => {
  getValueFor('access_token')
  .then(result => {
    if(result) {
      // parsed = JSON.parse(result)
      // return parsed['userID']
    }
  })
}