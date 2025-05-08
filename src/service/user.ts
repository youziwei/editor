import axios, { ResDataType } from "../utils/ajax";

export async function loginPage(
  username: string,
  password: string
): Promise<ResDataType> {
  const url = "editor/user/login";
  const body = { username, password };
  const data = await axios.post(url, body);
  return data;
}

export async function registerService(username: string, password: string) {
  const url = "editor/user/register";
  const body = { username, password };
  const data = await axios.post(url, body);
  return data;
}
