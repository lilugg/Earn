import React from 'react';
import './App.css';
import RouterView from './router/RouterView'
import { routes } from './router/Routerconfig'
import { BrowserRouter } from 'react-router-dom'
import './fonts/iconfont.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <RouterView routes={routes} />
        </BrowserRouter>
      </Provider>

    </div>
  );
}

export default App;
