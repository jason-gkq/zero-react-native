import { connect } from 'react-redux';
import Content from '../components/Content';

export default connect(
  (state, { $model, $globalSelectors }) => {
    return {};
  },
  (dispatch, { $model, $globalActions }) => {
    return {
      goAction(url) {
        dispatch($globalActions.navigate.goTo({ url }));
      },
    };
  }
)(Content);
