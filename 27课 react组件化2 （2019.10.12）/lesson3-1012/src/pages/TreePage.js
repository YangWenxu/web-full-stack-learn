import React, { Component } from "react";
import TreeNode from "../components/TreeNode";

const treeData = {
  key: 0, //标识唯一性
  title: "全国", //节点名称显示
  children: [
    //子节点数组
    {
      key: 6,
      title: "北方区域",
      children: [
        {
          key: 1,
          title: "黑龙江省",
          children: [
            {
              key: 6,
              title: "哈尔滨",
            },
          ],
        },
        {
          key: 2,
          title: "北京",
        },
      ],
    },
    {
      key: 3,
      title: "南方区域",
      children: [
        {
          key: 4,
          title: "上海",
        },
        {
          key: 5,
          title: "深圳",
        },
      ],
    },
  ],
};

export default class TreePage extends Component {
  render() {
    return (
      <div>
        <h1>TreePage</h1>
        <TreeNode data={treeData} />
      </div>
    );
  }
}
