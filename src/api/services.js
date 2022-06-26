import axiosInstance from "./config";

export async function getAllUsers() {
  const response = await axiosInstance.get("users");
  return response.data;
}

export async function getUser(id) {
  const response = await axiosInstance.get(`users/${id}`);
  return response.data;
}

export async function createUser(user) {
  const response = await axiosInstance.post("users", user);
  return response.data;
}

export async function updateUser(user) {
  const response = await axiosInstance.put(`users/${user.id}`, user);
  return response.data;
}


