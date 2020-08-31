import React, { Component } from "react";
import { Button } from "antd";

const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};
const foo2 = Cmp => props => {
  return (
    <div className="border" style={{ border: "solid 1px red" }}>
      <Cmp {...props} />
    </div>
  );
};

@foo2
@foo
class Child extends Component {
  render() {
    return <div>child</div>;
  }
}
/* function Child(props) {
  return <div>child</div>;
} */

@foo
class HocPage extends Component {
  render() {
    //const Foo = foo2(foo(Child));
    return (
      <div>
        <h1>HocPage</h1>
        {/* <Foo /> */}
        <Child />
        <Button type="dashed">submit</Button>
      </div>
    );
  }
}

export default HocPage;

// export default foo(HocPage);
