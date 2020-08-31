import React, { Component } from "react";
import TabBar from "../components/TabBar";

export default class Layout extends Component {
  componentDidMount() {
    const { title = "商城" } = this.props;
    document.title = title;
  }
  render() {
    const { children, showTabBar = true } = this.props;
    const a = [];
    if (children.$$typeof) {
      a.push(children);
    } else {
      for (let item in children) {
        a.push(children[item]);
      }
    }
    console.log("props", this.props);
    return (
      <div>
        {a.map((item, index) => {
          return <div key={"child" + index}>{item}</div>;
        })}
        {showTabBar && <TabBar />}
      </div>
    );
  }
}
