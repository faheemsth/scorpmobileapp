
const base_url = 'https://api.scorp.co/api/'; // Private variable
const keys = {
  token: 'TOKEN',
  user: 'USER',
  clockedIn: 'CLOCKED_IN',
  clockedInTime: 'CLOCKED_IN_TIME',
  clockedOutTime: 'CLOCKED_OUT_TIME',
};

const storeData = async (key, data) => {
  try {
    const d = typeof data == 'string' ? data : JSON.stringify(data);
    console.log('storing ', key, typeof d, d);
    await AsyncStorage.setItem(key, d);
  } catch (error) {
    throw error;
  }
};
const getData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    throw error;
  }
};
export {base_url, keys, storeData, getData}