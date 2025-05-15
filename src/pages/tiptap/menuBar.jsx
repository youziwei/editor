import React, { useCallback, useState, useEffect, useRef } from "react";
import { Button, message, Dropdown, Space, Popover, ColorPicker } from "antd";
import { useCurrentEditor } from "@tiptap/react";
import { saveFile } from "../../service/editor";
import {
  TextBold,
  TextItalic,
  H1,
  H2,
  H3,
  LevelFourTitle,
  LevelFiveTitle,
  LevelSixTitle,
  Code,
  CodeOne,
  OrderedList,
  ListAdd,
  DividingLine,
  TextUnderline,
  Link,
  AlignTextLeft,
  AlignTextCenter,
  AlignTextRight,
  Undo,
  Redo,
  BackgroundColor,
} from "@icon-park/react";
import styles from "./menuBar.module.scss";

const titleList = [
  {
    label: (
      <div>
        <H1 theme="outline" size="24" fill="#333" strokeWidth={4} />
      </div>
    ),
    key: "1",
  },
  {
    label: (
      <div>
        <H2 theme="outline" size="24" fill="#333" strokeWidth={4} />
      </div>
    ),
    key: "2",
  },
  {
    label: (
      <div>
        <H3 theme="outline" size="24" fill="#333" strokeWidth={4} />
      </div>
    ),
    key: "3",
  },
  {
    label: (
      <div>
        <LevelFourTitle theme="outline" size="24" fill="#333" strokeWidth={4} />
      </div>
    ),
    key: "4",
  },
  {
    label: (
      <div>
        <LevelFiveTitle theme="outline" size="24" fill="#333" strokeWidth={4} />
      </div>
    ),
    key: "5",
  },
  {
    label: (
      <div>
        <LevelSixTitle theme="outline" size="24" fill="#333" strokeWidth={4} />
      </div>
    ),
    key: "6",
  },
];

const alignList = [
  {
    label: (
      <div>
        <AlignTextLeft theme="outline" size="24" fill="#333" strokeWidth={4} />
        <span>左对齐</span>
      </div>
    ),
    key: "left",
  },
  {
    label: (
      <div>
        <AlignTextCenter
          theme="outline"
          size="24"
          fill="#333"
          strokeWidth={4}
        />
        <span>居中对齐</span>
      </div>
    ),
    key: "center",
  },
  {
    label: (
      <div>
        <AlignTextRight theme="outline" size="24" fill="#333" strokeWidth={4} />
        <span>右对齐</span>
      </div>
    ),
    key: "right",
  },
];

const textList = [
  {
    label: <div>Inter</div>,
    key: "Inter",
  },
  {
    label: <div>Comic</div>,
    key: "Comic Sans MS, Comic Sans",
  },
  {
    label: <div>Monospace</div>,
    key: "monospace",
  },
];

const tableList = [
  {
    label: (
      <div>
        <i className="iconfont icon-jurassic_table"></i>
        <span>新增表格</span>
      </div>
    ),
    key: "add-table",
  },
  {
    label: (
      <div>
        <i className="iconfont icon-shanchu"></i>
        <span>删除表格</span>
      </div>
    ),
    key: "delete-table",
  },
  {
    label: (
      <div>
        <i className="iconfont icon-charuxing"></i>
        <span>新增行</span>
      </div>
    ),
    key: "add-row",
  },
  {
    label: (
      <div>
        <i className="iconfont icon-shanchuxing"></i>
        <span>删除行</span>
      </div>
    ),
    key: "delete-row",
  },
  {
    label: (
      <div>
        <i className="iconfont icon-charulie"></i>
        <span>新增列</span>
      </div>
    ),
    key: "add-column",
  },
  {
    label: (
      <div>
        <i className="iconfont icon-shanchulie"></i>
        <span>删除列</span>
      </div>
    ),
    key: "delete-column",
  },
  {
    label: (
      <div>
        <i className="iconfont icon-biaotou-shang"></i>
        <span>切换上表头</span>
      </div>
    ),
    key: "switch-header-top",
  },
  {
    label: (
      <div>
        <i className="iconfont icon-biaotou-zuo"></i>
        <span>切换左表头</span>
      </div>
    ),
    key: "switch-header-left",
  },
  {
    label: (
      <div>
        <i className="iconfont icon-shanchulie"></i>
        <span>合并单元格</span>
      </div>
    ),
    key: "merge-cell",
  },
  {
    label: (
      <div>
        <i className="iconfont icon-shanchulie"></i>
        <span>取消合并单元格</span>
      </div>
    ),
    key: "cancel-merge-cell",
  },
];

const MenuBar = (props) => {
  const { selectIndex } = props;
  const { editor } = useCurrentEditor();
  const [colorOpen, setColorOpen] = useState(false);
  const [colorOpen2, setColorOpen2] = useState(false);
  const menubarRef = useRef(null);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    console.log("url", url);
    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  // 标题
  const handleChangeLevelTitle = (value) => {
    editor
      .chain()
      .focus()
      .toggleHeading({ level: Number(value.key) })
      .run();
  };

  // 字体居中
  const handleChangeTextAlign = (value) => {
    editor.chain().focus().setTextAlign(value.key).run();
  };

  // 字体样式
  const handleChangeTextStyle = (value) => {
    editor.chain().focus().setFontFamily(value.key).run();
  };

  // 字体颜色
  const handleChangeFontColor = (value) => {
    const metaColor = value.metaColor;
    editor
      .chain()
      .focus()
      .setColor(
        `rgba(${metaColor.r}, ${metaColor.g}, ${metaColor.b}, ${metaColor.a})`
      )
      .run();
  };

  // 背景色
  const handleChangeBackground = (value) => {
    const metaColor = value.metaColor;
    editor
      .chain()
      .focus()
      .toggleHighlight({
        color: `rgba(${metaColor.r}, ${metaColor.g}, ${metaColor.b}, ${metaColor.a})`,
      })
      .run();
  };

  // 表格
  const handleChangeTable = (value) => {
    const key = value.key;
    switch (key) {
      case "add-table":
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run();
        break;
      case "delete-table":
        editor.chain().focus().deleteTable().run();
        break;
      case "add-row":
        editor.chain().focus().addRowBefore().run();
        break;
      case "delete-row":
        editor.chain().focus().deleteRow().run();
        break;
      case "add-column":
        editor.chain().focus().addColumnBefore().run();
        break;
      case "delete-column":
        editor.chain().focus().deleteColumn().run();
        break;
      case "switch-header-top":
        editor.chain().focus().toggleHeaderRow().run();
        break;
      case "switch-header-left":
        editor.chain().focus().toggleHeaderColumn().run();
        break;
      case "merge-cell":
        editor.chain().focus().mergeCells().run();
        break;
      case "cancel-merge-cell":
        editor.chain().focus().splitCell().run();
        break;
      default:
        break;
    }
  };

  const handleClickHtml = useCallback(() => {
    // HTML格式
    const html = editor.getHTML();
    message.success("保存成功");
    console.log("selectIndex", selectIndex);
    saveFile(selectIndex.key, html);
  }, [editor, selectIndex]);

  // const handleClickJson = useCallback(() => {
  //   const json = editor.getJSON();
  //   console.log("html", json);
  // }, [editor]);

  // const handleClickText = useCallback(() => {
  //   const text = editor.getText();
  //   console.log("html", text);
  // }, [editor]);

  // 转pdf
  const handleClickToPdf = () => {
    window.print();
  };

  const createStyleFile = () => {
    const cssFile = `
    .tiptap-container {
      border: none !important;
    }
    .tiptap-container div:last-child {
      overflow: visible;
    }`;
    const style = document.createElement("style");
    style.innerHTML = cssFile;
    return style;
  };

  window.onbeforeprint = function (event) {
    // console.log("打印之前");
    if (menubarRef.current) menubarRef.current.style.display = "none";
    const sideBar = document.querySelector(".side-bar-container");
    sideBar.style.display = "none";
    document.body.style.overflow = "scroll";
    const tiptapContainer = document.querySelector(".tiptap-container");
    tiptapContainer.appendChild(createStyleFile());
  };

  window.onafterprint = function (event) {
    // console.log("打印之后");
    if (menubarRef.current) menubarRef.current.style.display = "flex";
    const sideBar = document.querySelector(".side-bar-container");
    sideBar.style.display = "block";
    document.body.style.overflow = "visible";
    const tiptapContainer = document.querySelector(".tiptap-container");
    tiptapContainer.removeChild(
      tiptapContainer.querySelector(".tiptap-container style")
    );
  };

  useEffect(() => {}, []);

  return (
    <div className={styles["menubar-container"]} ref={menubarRef}>
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        icon={
          <TextBold theme="outline" size="24" fill="#333" strokeWidth={4} />
        }
      >
        {/* 粗体 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        icon={
          <TextItalic theme="outline" size="24" fill="#333" strokeWidth={4} />
        }
      >
        {/* 斜体 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        icon={<i className="iconfont icon-strikethrough"></i>}
      >
        {/* 删除线 */}
      </Button>
      <Dropdown menu={{ items: titleList, onClick: handleChangeLevelTitle }}>
        <Space>
          <i className="iconfont icon-h"></i>
        </Space>
      </Dropdown>
      <Button
        onClick={() =>
          editor.chain().focus().toggleCodeBlock({ language: "jsx" }).run()
        }
        className={editor.isActive("codeBlock") ? "is-active" : ""}
        icon={<Code theme="outline" size="24" fill="#333" strokeWidth={4} />}
      >
        {/* 代码块 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        icon={<CodeOne theme="outline" size="24" fill="#333" strokeWidth={4} />}
      >
        {/* 行内代码 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        icon={<i className="iconfont icon-yinyong"></i>}
      >
        {/* 引用 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        icon={<i className="iconfont icon-liebiao"></i>}
      >
        {/* 无序列表 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        icon={
          <OrderedList theme="outline" size="24" fill="#333" strokeWidth={4} />
        }
      >
        {/* 有序列表 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
        icon={<ListAdd theme="outline" size="24" fill="#333" strokeWidth={4} />}
      >
        {/* 多层级列表 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        icon={
          <DividingLine theme="outline" size="24" fill="#333" strokeWidth={4} />
        }
      >
        {/* 分割线 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        icon={<i className="iconfont icon-huanhang"></i>}
      >
        {/* 换行 */}
      </Button>
      <Button
        onClick={addImage}
        icon={<i className="iconfont icon-tupian"></i>}
      >
        {/* 添加图片 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        icon={<i className="iconfont icon-daiban"></i>}
      >
        {/* 待办 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().sinkListItem("taskItem").run()}
        disabled={!editor.can().sinkListItem("taskItem")}
        icon={<i className="iconfont icon-daiban1"></i>}
      >
        {/* 多层级待办 */}
      </Button>
      <div className="font-color-setting">
        <Button
          icon={
            <BackgroundColor
              theme="outline"
              size="24"
              fill="#333"
              strokeWidth={4}
            />
          }
          onClick={() => {
            setColorOpen(!colorOpen);
          }}
        ></Button>
        <ColorPicker open={colorOpen} onChange={handleChangeBackground} />
      </div>
      <Button
        onClick={setLink}
        icon={<Link theme="outline" size="24" fill="#333" strokeWidth={4} />}
      >
        {/* 设置链接 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().setSubscript().run()}
        icon={<i className="iconfont icon-xiabiao1"></i>}
      >
        {/* 下标 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        icon={<i className="iconfont icon-shangbiao"></i>}
      >
        {/* 上标 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        icon={
          <TextUnderline
            theme="outline"
            size="24"
            fill="#333"
            strokeWidth={4}
          />
        }
      >
        {/* 下划线 */}
      </Button>
      {/* 字体颜色 */}
      <div className="font-color-setting">
        <Button
          icon={<i className="iconfont icon-font-colors"></i>}
          onClick={() => {
            setColorOpen2(!colorOpen2);
          }}
        ></Button>
        <ColorPicker open={colorOpen2} onChange={handleChangeFontColor} />
      </div>
      {/* 字体种类 */}
      <Dropdown menu={{ items: textList, onClick: handleChangeTextStyle }}>
        <Space>
          <i className="iconfont icon-zitiyangshi1"></i>
        </Space>
      </Dropdown>
      {/* 文字对齐：left center right */}
      <Dropdown menu={{ items: alignList, onClick: handleChangeTextAlign }}>
        <Space>
          <AlignTextLeft
            theme="outline"
            size="24"
            fill="#333"
            strokeWidth={4}
          />
        </Space>
      </Dropdown>
      {/* 新增表格 */}
      <Dropdown menu={{ items: tableList, onClick: handleChangeTable }}>
        <Space>
          <i className="iconfont icon-jurassic_table"></i>
        </Space>
      </Dropdown>
      <Button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        icon={<Undo theme="outline" size="24" fill="#333" strokeWidth={4} />}
      >
        {/* 撤销 */}
      </Button>
      <Button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        icon={<Redo theme="outline" size="24" fill="#333" strokeWidth={4} />}
      >
        {/* 重做 */}
      </Button>
      <Button
        onClick={handleClickHtml}
        icon={<i className="iconfont icon-save"></i>}
      >
        {/* 保存 */}
      </Button>
      <Button
        onClick={handleClickToPdf}
        icon={<i className="iconfont icon-pdf"></i>}
      ></Button>
    </div>
  );
};

export default MenuBar;
