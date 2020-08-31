import React, { Component } from "react";
import { consumerHandle } from "../AppContext";
import Layout from "./Layout";

/* export default class Home extends Component {
  render() {
    return <Consumer>{ctx => <HomeHandle {...ctx} />}</Consumer>;
  }
} */

/* function HomeHandle(props) {
  return (
    <Layout title="商城首页">
      {{
        btn: <button>按钮</button>,
        content: "我是内容",
      }}
    </Layout>
  );
} */

function HomeHandle(props) {
  return (
    <Layout title="商城首页">
      <div>
        <h1>Home</h1>
      </div>
    </Layout>
  );
}

export default consumerHandle(HomeHandle);
