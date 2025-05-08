const KEY = "USER_TOKEN";

// 设置
export function setToken(token: string) {
  localStorage.setItem(KEY, token);
}

// 获取
export function getToken() {
  return localStorage.getItem(KEY) || "";
}

// 删除
export function removeToken() {
  localStorage.removeItem(KEY);
}
