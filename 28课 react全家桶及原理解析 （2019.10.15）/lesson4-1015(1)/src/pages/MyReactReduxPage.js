import React, { Component } from "react";
import { connect } from "../kReact-redux";

class MyReactReduxPage extends Component {
  render() {
    console.log("props", this.props);
    const { counter, add } = this.props;
    return (
      <div>
        <h1>MyReactReduxPage</h1>
        <p>counter:{counter}</p>
        <button onClick={add}>add</button>
      </div>
    );
  }
}
export default connect(
  state => {
    return { counter: state };
  },
  //mapDispatchToProps
  {
    add: () => {
      return { type: "add" };
    },
  },
)(MyReactReduxPage);
