import { createModel } from '../../zero/redux';

export default createModel({
  name: 'user',
  config: {
    pageId: '10013',
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
      console.log('pages/user/index.model.js/saga/didMount');
    },
  },
  selector: {},
});
