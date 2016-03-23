import template from './task-item.html';


export const TaskItemComponent = {
  bindings: {
    model: '<',
    deleteTask: '&',
    updateTask: '&'
  },
  controllerAs: 'taskItem',
  restrict: 'E',
  template,
  controller: class TaskItem {
    constructor() {
      this.editing = false;
      this.statusUpdated = false;
    }

    cancelEdit() {
      this.editing = false;
    }

    edit() {
      this.title = this.model.title;
      this.editing = true;
    }

    delete() {
      this.deleteTask({task: this.model});
    }

    save() {
      if (this.editing) {
        if (this.model.title !== this.title) {
          this.model.title = this.title;
          this.updateTask({task: this.model});
        }
        this.editing = false;
      }
    }

    toggleCompleted() {
      this.model.completed = !this.model.completed;
      this.updateTask({task: this.model});
      this.statusUpdated = this.model.completed;
    }
  }
}