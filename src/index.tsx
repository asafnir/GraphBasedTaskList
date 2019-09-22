import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import TaskListStore from './stores/TaskListStore';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider taskListStore={TaskListStore}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root') as HTMLElement
);
  


serviceWorker.unregister();
