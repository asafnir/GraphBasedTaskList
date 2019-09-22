import React from 'react';
import { observer, inject } from 'mobx-react';
import Task from './Task';
import { List } from 'antd';
import AddTask from './AddTask';

type IProps = {
    taskListStore?: any,
};

@inject('taskListStore')
@observer class TaskList extends React.Component<IProps> {
    
    render() {

        const items = this.props.taskListStore && this.props.taskListStore.tasks.map((task: any, index: number) => (
            <Task
                key={task.id}
                depth={task.depth}
                arrayIndex={index}
                completed={task.completed}
                id={task.id}
                node={task}
                title={task.title}
                update={task.update}
                deleteMe={task.delete}
                toggle={task.toggle}
                addChild={task.addChild}
            />
        ));
        console.log(this.props.taskListStore.tasks)
        return(
            <div style={{paddingTop: 20}}>
                <List size="large" style={{background: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.20)'}}>
                    {items}
                    <AddTask/>
                </List>
            </div>
        )
    }
}

export default TaskList;
