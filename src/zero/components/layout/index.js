import React, { Fragment } from 'react';
// import Header from './header'
// import Footer from './footer'
import Content from './content';
import { globalSelectors } from '../../redux';
import { connect } from 'react-redux';
// import { View } from '../basic';
import { AppConfigContext } from '../../core/configureContext';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = AppConfigContext;

  render() {
    const {
      children,
      // currentPage: { hideHeader, isTabBar },
    } = this.props;
    return (
      <>
        {/* {!hideHeader && <Header isTabBar={isTabBar} />} */}
        <Content>
          <Fragment>{children}</Fragment>
        </Content>
        {/* <Footer isTabBar={isTabBar} /> */}
      </>
    );
  }
}

export default connect((state) => {
  const { currentPage = {} } = globalSelectors.getRoute(state);
  const env = globalSelectors.getEnv(state);
  return { currentPage, appName: env.appName };
})(Layout);
