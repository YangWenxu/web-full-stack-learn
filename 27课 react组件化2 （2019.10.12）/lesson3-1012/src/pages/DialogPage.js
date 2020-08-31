import React, { Component } from "react";
import { Button } from "antd";
import Dialog from "../components/Dialog";

export default class DialogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
  }
  handleShowDialog = () => {
    this.setState({
      showDialog: !this.state.showDialog,
    });
  };
  render() {
    const { showDialog } = this.state;
    return (
      <div className="dialogPage">
        <h1>DialogPage</h1>
        <Button onClick={this.handleShowDialog}>dialog toggle</Button>
        {showDialog && (
          <Dialog hideDialog={this.handleShowDialog} hide={true}>
            这是一个弹窗
          </Dialog>
        )}
      </div>
    );
  }
}
