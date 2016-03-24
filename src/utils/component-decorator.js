export const Component = config => {
  return target => {
    config.controller = target;
    return config;
  };
};
