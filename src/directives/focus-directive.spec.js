import { focusDirective } from './focus-directive';


describe('focus directive', () => {
  let element;
  let scope;
  let timeout;


  beforeEach(() => {
    angular.module('test', [])
      .directive('focus', focusDirective);

    angular.mock.module('test');

    inject(($rootScope, $compile, $timeout) => {
      scope = $rootScope.$new();
      scope.shouldFocus = false;

      timeout = $timeout;

      element = $compile('<input focus="shouldFocus" type="text">')(scope);
      element[0].focus = sinon.spy();

      scope.$digest();
    });
  });


  it('should focus input when attribute `focus` evaluates to `true`', () => {
    scope.shouldFocus = true;
    scope.$digest();
    timeout.flush();
    expect(element[0].focus.callCount).toBe(1);
  });
});
