export const escapeDirective = () => {
  const ESCAPE_KEY_CODE = 27;

  return {
    restrict: 'A',

    link: (scope, $element, attrs) => {
      $element.on('keyup', event => {
        if (event.keyCode === ESCAPE_KEY_CODE) {
          scope.$apply(attrs.escape);
        }
      });

      scope.$on('$destroy', () => {
        $element.unbind('keyup');
      });
    }
  };
};
