
import React, { FunctionComponent } from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const AppHeader: FunctionComponent<{}> = (props: any) => {
    return <Header>
      <div className="logo">Graph Based Task List</div>
  </Header>
}

export default AppHeader;
