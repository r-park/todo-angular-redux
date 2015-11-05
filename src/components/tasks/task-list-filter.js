export function taskListFilter() {
  return (list, filterType) => {
    if (!filterType || !filterType.length) {
      return list;
    }

    switch (filterType) {
      case 'active':
        return list.filter(task => !task.completed);

      case 'completed':
        return list.filter(task => task.completed);

      default:
        return list;
    }
  };
}
