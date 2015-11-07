import { escapeDirective } from './escape-directive';


describe('escape directive', () => {
  let element;
  let scope;


  beforeEach(() => {
    angular.module('test', [])
      .directive('escape', escapeDirective);

    angular.mock.module('test');

    inject(($rootScope, $compile) => {
      scope = $rootScope.$new();
      scope.escapeHandler = sinon.spy();

      element = $compile('<input escape="escapeHandler()" type="text">')(scope);

      scope.$digest();
    });
  });


  function triggerKeyup() {
    let event = new Event('keyup');
    event.keyCode = 27;
    element[0].dispatchEvent(event);
  }


  it('should call handler function when escape key is released (keyup event)', () => {
    triggerKeyup();
    expect(scope.escapeHandler.callCount).toBe(1);
  });


  it('should unbind from `keyup` event when scope is destroyed', () => {
    triggerKeyup();
    expect(scope.escapeHandler.callCount).toBe(1);

    scope.$destroy();

    triggerKeyup();
    expect(scope.escapeHandler.callCount).toBe(1);
  });

});
