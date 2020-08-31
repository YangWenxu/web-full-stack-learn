import React, { Component, Children } from "react";
import { createPortal } from "react-dom";

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    const doc = window.document;
    this.node = doc.createElement("div");
    doc.body.appendChild(this.node);
  }
  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }
  render() {
    const { children, hideDialog, hide } = this.props;
    let tem = hide ? "hidden" : "";
    console.log("hide", tem);
    return createPortal(
      <div className="dialog" style={{ visibility: tem }}>
        <h1>Dialog</h1>
        <button onClick={hideDialog}>close</button>
        {children}
      </div>,
      this.node,
    );
  }
}
