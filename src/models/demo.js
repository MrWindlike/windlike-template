import { fromJS } from 'immutable';
import modelsCreator from 'Utils/models';
import demoServices from '../services/demo';

export default modelsCreator({

  namespace: 'demo',

  state: {
    oneState: fromJS({
      value: 'Hello Windlike',
    }),
  },

  effects: {
    fetch: {
      service: demoServices.fetch,
      save: 'oneState',
    },
  },

});
