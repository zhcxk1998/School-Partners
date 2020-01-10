import { action, observable, configure } from 'mobx';

configure({ enforceActions: 'observed' });

class Test {
  @observable count=0;

  @action.bound increment() {
    this.count = this.count + 1;
  }

  @action decrement() {
    this.count = this.count - 1;
  }
}

export default Test;
