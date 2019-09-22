import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import MainLayout from './components/shared/MainLayout';
import TaskPage from './components/TaskPage';
import { Layout } from 'antd';
import AppHeader from './components/shared/AppHeader';
import './assets/App.css';

const { Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout className="App">
        <AppHeader/>
        <Switch>
          <Route exact path="/"  component={MainLayout} />
          <Route exact path="/task/:id" component={TaskPage} />
          <Redirect to="/" />
        </Switch>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    );
  }
}

export default App;
