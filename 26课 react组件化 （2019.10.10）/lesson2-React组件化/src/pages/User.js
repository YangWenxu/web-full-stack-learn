import React, { Component } from "react";
import { consumerHandle } from "../AppContext";

import Layout from "./Layout";

/* export default class User extends Component {
  render() {
    return <Consumer>{ctx => <UserHandle {...ctx} />}</Consumer>;
  }
} */

function UserHandle(props) {
  return (
    <Layout title="用户信息页面">
      <div>
        <h1>Home</h1>
      </div>
    </Layout>
  );
}

export default consumerHandle(UserHandle);
