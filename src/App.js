import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  counterNum: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        [action.name]: state[action.name] + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        [action.name]: state[action.name] - 1,
      };
      case 'RESET':
        return{
          ...state,
          [action.name]: state[action.name] = 0,
        };
    default:
      return state;
  }
};

const useValue = () => useReducer(reducer, initialState);

const Context = createContext(null);

const useGlobalState = () => {
  const value = useContext(Context);
  if (value === null) throw new Error('Error');
  return value;
};

const GlobalStateProvider = ({ children }) => (
  <Context.Provider value={useValue()}>{children}</Context.Provider>
);

const Counter = ({ name }) => {
  const [state, dispatch] = useGlobalState();
  return (
    <div>
      {state[name]}
      <button onClick={() => dispatch({ type: 'INCREMENT', name })}>Incrementar</button>
      <button onClick={() => dispatch({ type: 'DECREMENT', name })}>Decrementar</button>
      <button onClick={() => dispatch({ type: 'RESET', name })}>Resetear</button>
    </div>
  );
};

const App = () => (
  <GlobalStateProvider>
    <h1>Contador</h1>
    <Counter name="counterNum" />
  </GlobalStateProvider>
);

export default App;
