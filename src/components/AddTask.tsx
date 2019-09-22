import React from 'react';
import { inject, observer } from 'mobx-react'
import { Button, Icon } from 'antd';
import TaskListStore from '../stores/TaskListStore';

type Props = {
    taskListStore?: any,
};

@inject('taskListStore')
@observer
class AddTask extends React.Component<Props> {
    render() {
        return(
            <Button 
                onClick={ e => {
                    e.preventDefault();
                    this.props.taskListStore && this.props.taskListStore.addTask();    
                }}
                type="link">
                <Icon type="plus" />
                Add Task
            </Button>
        );
    }
}
export default AddTask;