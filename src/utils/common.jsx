export const handledTree = (arr) => {
  // 用于id和TreeNode的映射
  const idToTreeNode = new Map();

  let root = [];
  arr.forEach((item) => {
    const { id, title, type, parentId } = item;

    // 定义treeNode并加入map
    const treeNode = { key: id, label: title, type };
    idToTreeNode.set(id, treeNode);

    // 找到parentNode并加入到它的children
    const parentNode = idToTreeNode.get(parentId);
    if (parentNode) {
      if (parentNode.children == null) parentNode.children = [];
      parentNode.children.push(treeNode);
    }

    // 找到根节点
    if (parentId === 0) root.push(treeNode);
  });

  return root;
};

// 密码加密，该crypto.subtle.digest方法只在https环境下有效
export async function sha256(msg) {
  const msgBuffer = new TextEncoder().encode(msg);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
