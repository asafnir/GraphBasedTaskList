import { observable, computed, action, toJS } from 'mobx';

let nextTodoId = 0;

export interface ITask {
  title: string
  completed: boolean
  id: number
  parent: ITask
  children: []
  index: number
  isRoot: () => boolean
}

class Task {
  @observable title: string;
  @observable id: number;
  @observable completed: boolean;
  @observable parent: any;
  @observable children: any = [];
  
  constructor(parent = undefined, title = '') {
    this.title = title;
    this.id = nextTodoId;
    nextTodoId += 1;
    this.completed = false;
    this.parent = parent;
  }
  
  @computed get isRoot() {
    return (typeof toJS(this.parent) === 'undefined');
  }

  @computed get index() {
    if (this.isRoot || !this.parent) {
      return undefined;
    }
    // findIndex returns the index of the first element in an array that pass a test (provided as a function).
    const result = this.parent.children.findIndex((node: any) => node === this);
    return result;
  }

  @computed get previous() {
    if (this.index === 0 || !this.parent) {
      return undefined;
    }
    return this.parent.children[this.index - 1];
  }

  // do I need @computed get depth() ??
  @computed get depth() {
    let t: any = this;
    let depthLevel = 0;
    while (!t.isRoot) {
      t = t.parent;
      depthLevel += 1;
    }
    return depthLevel;
  }

  @action.bound
  update(title: string) {
    this.title = title;
  }

  @action.bound
  delete() {
    this.parent && this.parent.children.remove(this);
  }
  
  @action.bound
  setStatus(newStatus: boolean) {
    this.completed = newStatus;
    // for (const c of this.children) {
    //   c.setStatus(newStatus);
    // }
  }

  @action.bound
  toggle() {
    let nextHigherNode;
    this.setStatus(!this.completed);

    if (this.completed === false) {
      nextHigherNode = this.parent;
    }
  }

  @action.bound
  addChild() {
    const newNode = new Task();
    newNode.parent = this;
    this.children.push(newNode);
    return newNode;
  }

}

export default Task;