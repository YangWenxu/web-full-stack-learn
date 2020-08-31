import React, { Component } from "react";
import { Consumer } from "../AppContext";

export default class TabBar extends Component {
  render() {
    return <Consumer>{ctx => <TabBarHandle {...ctx} />}</Consumer>;
  }
}

function TabBarHandle(props) {
  return <div className="tabBar">TabBarHandle</div>;
}
