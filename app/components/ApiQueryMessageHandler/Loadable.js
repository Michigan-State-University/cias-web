import loadable from 'utils/loadable';

export default loadable(() =>
  import('components/ApiQueryMessageHandler/index'),
);
