import React from "react";
import { EditorProvider, FloatingMenu, BubbleMenu } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import styles from "./index.module.scss";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
// 下标
import Subscript from "@tiptap/extension-subscript";
// 上标
import Superscript from "@tiptap/extension-superscript";
// 下划线
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
// 文字对齐
import TextAlign from "@tiptap/extension-text-align";
// 字体家族
import FontFamily from "@tiptap/extension-font-family";

// 表格
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

import MenuBar from "./menuBar";

const lowlight = createLowlight(all);

const Tiptap = (props) => {
  const { data, selectIndex } = props;
  // 配置
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
    CodeBlockLowlight.configure({ lowlight }),
    Document,
    Paragraph,
    Text,
    Image,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    Highlight.configure({ multicolor: true }),
    Link.configure({
      // openOnClick: false,
      // autolink: true,
      defaultProtocol: "https",
    }),
    Subscript,
    Superscript,
    Underline,
    Placeholder.configure({
      // Use a placeholder:
      placeholder: "请输入 …",
      // Use different placeholders depending on the node type:
      // placeholder: ({ node }) => {
      //   if (node.type.name === 'heading') {
      //     return 'What’s the title?'
      //   }

      //   return 'Can you add some further context?'
      // },
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    FontFamily,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ];

  return (
    <div className={styles["tiptap-container"]}>
      {data && (
        <EditorProvider
          // 在之前插入一段内容
          slotBefore={<MenuBar selectIndex={selectIndex} />}
          // slotAfter：之后插入
          extensions={extensions}
          content={data}
        ></EditorProvider>
      )}
    </div>
  );
};

export default Tiptap;
