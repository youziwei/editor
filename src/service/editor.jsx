import axios, { ResDataType } from "../utils/ajax";

// 新增单个文件
export async function addDocument({ parentId, type, title }) {
  const url = "/editor/file/addFile";
  const body = { parentId, type, title };
  const data = await axios.post(url, body);
  return data;
}

// 获取文件名称列表
export async function getFileNameList() {
  // fileNameList
  const url = "/editor/file/getFileList";
  const data = await axios.get(url);
  return data;
}

// 查询单个文件
export async function getDocument(id) {
  // fileNameList
  const url = "/editor/file/getDocumentFile";
  const body = { id };
  const data = await axios.post(url, body);
  return data;
}

// 更新单个文件
export async function saveFile(id, content) {
  // fileNameList
  const url = "/editor/file/saveFile";
  const body = { id, content };
  const data = await axios.post(url, body);
  return data;
}

// 修改名字
export async function editName(props) {
  const url = "/editor/file/updateTitleName";
  const body = { ...props };
  const data = await axios.post(url, body);
  return data;
}
