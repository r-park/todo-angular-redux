import { Component } from 'src/utils';


@Component({
  controllerAs: 'app',
  template: `
    <header class="header">
      <div class="g-row">
        <div class="g-col">
          <h1 class="header__title">Todo Angular Redux</h1>
          <a class="header__link" href="https://github.com/r-park/todo-angular-redux"></a>
        </div>
      </div>
    </header>

    <main class="main" ui-view="main"></main>
  `
})

export class AppComponent {}
