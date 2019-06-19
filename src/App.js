import React from 'react';
// import { Provider } from 'react-redux';
// import { createStore, compose, applyMiddleware } from 'redux';
import LoginWrapper from './login-wrapper';
import './App.css';
// const store = createStore(rootReducer);

function App() {
  return (
    <div className="App">
       {/* <Provider store={store}> </Provider> */}
       <LoginWrapper />
    </div>
  );
}

export default App;
