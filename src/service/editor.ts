import axios, { ResDataType } from "../utils/ajax";

type fileOption = {
  id?: number;
  parentId: number;
  type: number;
  title: string;
};

type fileOptionType = {
  errno: number;
  data: fileOption[];
};

type fileNameType = {
  id: number;
  title: string;
};

// 新增单个文件
export async function addDocument({ parentId, type, title }: fileOption) {
  const url = "/editor/file/addFile";
  const body = { parentId, type, title };
  const data = await axios.post(url, body);
  return data;
}

// 获取文件名称列表
export async function getFileNameList(): Promise<fileOptionType> {
  // fileNameList
  const url = "/editor/file/getFileList";
  const data = (await axios.get(url)) as fileOptionType;
  return data;
}

// 查询单个文件
export async function getDocument(id: number) {
  // fileNameList
  const url = "/editor/file/getDocumentFile";
  const body = { id };
  const data = await axios.post(url, body);
  return data;
}

// 更新单个文件
export async function saveFile(id: number, content: string) {
  // fileNameList
  const url = "/editor/file/saveFile";
  const body = { id, content };
  const data = await axios.post(url, body);
  return data;
}

// 修改名字
export async function editName({ id, title }: fileNameType) {
  const url = "/editor/file/updateTitleName";
  const body = { id, title };
  const data = await axios.post(url, body);
  return data;
}
