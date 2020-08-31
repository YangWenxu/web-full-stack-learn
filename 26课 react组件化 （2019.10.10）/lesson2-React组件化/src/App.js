import React from "react";
import Home from "./pages/Home";
import User from "./pages/User";
import HooksPage from "./pages/HooksPage";
import HooksReducer from "./pages/HooksReducer";
import HooksContext from "./pages/HooksContext";
/* import Home from "./pages/Home";
import { Provider, Consumer } from "./AppContext";
import User from "./pages/User";

const ContextTem = React.createContext();
const ProviderTem = ContextTem.Provider;
const ConsumerTem = ContextTem.Consumer;

const store = {
  home: {},
  user: {
    name: "xiaoming",
    age: 1,
  },
};
const store2 = {
  home: {},
  user: {
    name: "Tom",
    age: 2,
  },
};
function App() {
  return (
    <div className="app">
      <Provider value={{ store, store2 }}>
        <Home />
      </Provider>
      <ProviderTem value={store2}>
        <ConsumerTem>{ctx => <User {...ctx} />}</ConsumerTem>
      </ProviderTem>
    </div>
  );
} */

function Child(props) {
  return <div>Child</div>;
}

const foo = Cmp => props => {
  return (
    <div style={{ border: "solid 1px black" }}>
      <Cmp {...props} />
    </div>
  );
};

const foo2 = Cmp => props => {
  return (
    <div style={{ border: "solid 1px red", padding: "10px" }}>
      <Cmp {...props} />
    </div>
  );
};

function App() {
  const Foo = foo2(foo(Child));
  return (
    <div className="app">
      {/* <Child />
      <Foo /> */}
      {/*  <User /> */}
      {/* <HooksPage /> */}
      {/* <HooksReducer /> */}
      <HooksContext />
    </div>
  );
}

export default App;
