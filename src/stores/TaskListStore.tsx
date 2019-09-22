import { observable, computed, action } from 'mobx';
import Task, { ITask } from './Task';

export class TaskListStore {
    
  @observable taskRoot: any;

  constructor() {
    this.taskRoot = new Task();
  }

  @computed get tasks() {
    const flattenChildren = (startNode: ITask): any => {
      let result = [];

      if (!startNode.isRoot) {
        result.push(startNode);
      }
      
      for (const n of startNode.children) {
        result = result.concat(flattenChildren(n));
      }
      return result;
    };

    return flattenChildren(this.taskRoot);
  }
  
  @action.bound
  flattenTasksByNode(node: ITask) {
    const flattenChildren = (startNode: ITask): any => {
      let result = [];

      if (!startNode.isRoot) {
        result.push(startNode);
      }

      for (const n of startNode.children) {
        result = result.concat(flattenChildren(n));
      }
      return result;
    };

    return flattenChildren(node);
  }

  @action.bound
  findTaskById(id: number, startNode = this.taskRoot): any {
    for (const n of startNode.children) {
      if (n.id.toString() === id) {
        return n;
      }
      const result = this.findTaskById(id, n);
      if (result) {
        return result;
      }
    }
    return undefined;
  }

  @action.bound
  addTask(title = '') {
    const newNode = new Task(this.taskRoot, title);
    this.taskRoot.children.push(newNode);
    return newNode;
  }

  @action.bound
  copyMe(parentId: number, node: ITask) {
    const parent = this.findTaskById(parentId)
    const tmpNode = new Task(parent, node.title);
    if (!!tmpNode.children.length) tmpNode.children.splice(0,tmpNode.children.length)
    parent.children.push(tmpNode)
  }

}
const taskListStore = new TaskListStore();
export default taskListStore;