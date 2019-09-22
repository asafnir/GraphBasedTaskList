import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Layout } from 'antd';
import { ITask } from '../stores/Task';
const { Content } = Layout;

interface IProps extends RouteComponentProps<any> {
    taskListStore?: any,
    node: ITask
};

type IState = {
    task?: ITask
    tasks?: [ITask]
}

@inject('taskListStore')
@observer class TaskPage extends React.Component<IProps, IState> {
    state: IState = {
        task: undefined,
        tasks: undefined
    }

    componentDidMount() {
        const taskId = this.props.match.params.id
        if (!taskId) {
            this.props.history.push('/')
        }
        const task = this.props.taskListStore.findTaskById(taskId)
        
        if (!task) this.props.history.push('/');
        const tasks = this.props.taskListStore.flattenTasksByNode(task);
        this.setState({tasks: tasks, task: task});
    }

    render() {
        const { task, tasks } = this.state;
        
        return(
            <Content style={{paddingTop: 20, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto'}}>
                <Button onClick={() => this.props.history.push('/')}>Back</Button>
                { task &&
                    <div style={{textAlign: 'left'}}>
                        <h3>{task.title}</h3>
                        <div style={{textAlign: 'left', background: '#fff', padding: 20, marginTop: 20}}>
                            {tasks && tasks.map((child: ITask) => {
                                    return (
                                        <div key={child.id}>
                                            <p>{child.title}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                  
                }
            </Content>
        )
    }
}

export default withRouter(TaskPage);
