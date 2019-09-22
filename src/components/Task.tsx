import React, { Ref } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router'
import { List, Input, Checkbox, Icon, Button, Modal } from 'antd';
import { Tree } from 'antd';

const { TreeNode } = Tree;
const { Item }  = List;

interface IProps extends RouteComponentProps<any> {
    taskListStore?: any,
    depth: number
    arrayIndex: number
    completed: boolean
    id: number
    key: number
    node: {id: number}
    title: string
    update: (val: string) => void
    deleteMe: ()=> void
    toggle: () => void
    addChild: ()=> void
}

const INDENT_SIZE = 25;

@inject('taskListStore')
@observer class Task extends React.Component<IProps> {
    state = {
        openModal: false,
        parentId: undefined
    }

    componentDidMount() {
        // this.inputRef.focus();
    }


    render() {
        const {
            depth,
            id,
            node,
            title,
            update,
            completed,
            deleteMe,
            toggle,
            addChild
        } = this.props;
        const marginLeft = `${(depth - 1) * INDENT_SIZE}pt`;
        
        return (
            <Item style={{border: 'none', opacity: completed ? 0.5 : 1,  display: 'flex', flexWrap: 'nowrap', padding: '10px', alignItems: 'center',marginLeft}}>
                <span>{id}</span>
                <Checkbox onClick={toggle} checked={completed} style={{display: 'inline-block', width: '', margin: '0', marginRight: 16, marginLeft: 10, verticalAlign: 'center',}}/>
                <Input 
                    id={`${node.id}textfield`}
                    value={title}
                    onChange={(e: any) => update(e.target.value)}
                    disabled={completed}
                    style={{border: 'none', borderRadius: 0, background: 'transparent', borderBottom: '1px solid', margin: 0, display: 'inline-block',flexGrow: 2, marginRight: 10}}
                    />
                <Icon type="copy" onClick={()=> this.setState({openModal: true})} style={{marginRight: 10}}/>
                <Modal
                    title="Copy task - select the id of the parent task"
                    onCancel={()=>this.setState({openModal: true})}
                    onOk={()=> { 
                        this.props.taskListStore.copyMe(this.state.parentId, node)
                        this.setState({openModal: false})
                    }}
                    visible={this.state.openModal}
                >
                    <Input placeholder="Enter parent ID" value={this.state.parentId} onChange={(e) => this.setState({parentId: e.target.value})}></Input>
                </Modal>
                
                <Icon style={{marginRight: 10}} onClick={()=> addChild()} type="plus" />
                <Icon onClick={()=> deleteMe()} type="delete" />
                <Button 
                    type="link" 
                    icon="link" 
                    onClick={()=>this.props.history.push(`/task/${id}`)}/>
            </Item>
        )
    }
}

export default withRouter(Task);
