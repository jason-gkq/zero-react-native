import { createModel } from '../../zero/redux';

export default createModel({
  name: 'index',
  config: {
    pageId: '10000',
    isNeedLogin: true,
    hideHeader: true,
  },
  state: {
    systemName: '小程序',
  },
  reducers: {
    changeName(state, { payload }) {
      return {
        ...state,
        systemName: payload,
      };
    },
  },
  sagas: {
    *didMount() {
      console.log('pages/index/index.model.js/saga/didMount');
    },
  },
  selector: {},
});
