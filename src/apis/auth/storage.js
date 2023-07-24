import * as SecureStore from "expo-secure-store";

const saveToken = async (token) => {
  try {
    const token = await SecureStore.setItemAsync("token", token);
    return token;
  } catch (error) {
    console.log("error while saving token", error);
  }
};

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    return token;
  } catch (error) {
    console.log("error while getting token", error);
  }
};
const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync("token");
  } catch (error) {
    console.log("error while removing token", error);
  }
};

export { removeToken, getToken, saveToken };
