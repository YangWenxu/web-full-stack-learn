export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState = undefined;
  let currentListeners = [];
  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.map(cl => cl());
  }
  function subscribe(listener) {
    currentListeners.push(listener);
  }

  dispatch({ type: "@IMOOC/KKB-REDUX" });
  return {
    getState,
    dispatch,
    subscribe,
  };
}

export function applyMiddleware(...middlewares) {
  return createStore => (...arg) => {
    const store = createStore(...arg);
    const midApi = {
      getState: store.getState,
      dispatch: store.dispatch,
    };
    const chain = middlewares.map(mw => mw(midApi));
    const dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  };
}

function compose(...funcs) {
  const len = funcs.length;
  if (len === 0) {
    return arg => arg;
  }
  if (len === 1) {
    return funcs[0];
  }
  return funcs.reduce((left, right) => (...args) => right(left(...args)));
}
