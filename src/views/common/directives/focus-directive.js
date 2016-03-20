export const focusDirective = ['$timeout', $timeout => {
  return {
    restrict: 'A',

    link: (scope, $element, attrs) => {
      let timeout;

      function doFocus() {
        $element[0].focus();
      }

      scope.$watch(attrs.focus, focus => {
        if (timeout) $timeout.cancel(timeout);
        if (focus) timeout = $timeout(doFocus);
      });
    }
  };
}];
