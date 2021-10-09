import { createModel } from '../../zero/redux';

export default createModel({
  name: 'home',
  config: {
    pageId: '10012',
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
      console.log('pages/home/index.model.js/saga/didMount');
    },
  },
  selector: {},
});
