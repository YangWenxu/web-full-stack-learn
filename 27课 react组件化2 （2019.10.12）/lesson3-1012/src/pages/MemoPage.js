import React, { Component, memo } from "react";

export default class MemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      obj: {
        num: -1,
      },
    };
  }

  setCounter = () => {
    this.setState({
      counter: 1,
      obj: {
        num: 100,
      },
    });
  };
  render() {
    const { counter, obj } = this.state;
    return (
      <div>
        <h1>PureComponentPage</h1>
        <button onClick={this.setCounter}>change</button>
        <Demo counter={counter} obj={obj} />
      </div>
    );
  }
}

const Demo = memo(props => {
  const { counter } = props;
  console.log("render");

  return <div>{counter}</div>;
});

/* class Demo extends PureComponent {
  render() {
    const { counter } = this.props;
    console.log("render");
    return <div>{counter}</div>;
  }
} */
