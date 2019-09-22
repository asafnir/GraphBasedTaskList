import React from 'react';
import TaskList from '../TaskList';
import { Layout } from 'antd';

const { Content } = Layout;

class MainLayout extends React.Component {
    render() {
        return (
            <Content style={{ padding: '40px' }}>
                <TaskList/>
            </Content>
        )
    }
}

export default MainLayout;
