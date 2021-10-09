import { Navigation } from 'react-native-navigation';
import urlAndPageId from '../../route/routeData';

class configureNavigate {
  constructor() {
    this.maxHistoryLength = 100;
    this.routes = {};
    this.history = [];
    this.pageIdAndUrl = {};
    for (let prop in urlAndPageId) {
      this.pageIdAndUrl[urlAndPageId[prop]] = prop;
    }
  }

  registerRoutes = ({ pageId, componentId, rootTag }) => {
    pageId = Number(pageId);
    this.routes[pageId] = {
      pageId,
      componentId,
      rootTag,
      url: this.pageIdAndUrl[pageId],
    };
    // Navigation.mergeOptions(componentId, {
    //   topBar: {
    //     visible: false,
    //   },
    // });
    if (this.history.length === 0) {
      this.history.push({
        pageId,
        componentId,
        rootTag,
        url: this.pageIdAndUrl[pageId],
        payload: {},
      });
    }
  };

  getLocation = (url, payload) => {
    let pageId = 10000;
    let urlArr = [];
    let pathname = '';
    if (String(url).startsWith('lrn://')) {
      url = url.split('//')[1];
      urlArr = String(url).split('?');
      pageId = urlArr[0];
      pathname = this.pageIdAndUrl[pageId];
    } else {
      urlArr = String(url).split('?');
      pathname = urlArr[0] || `/${this.rootModelName}/index`;
      pageId = urlAndPageId[pathname];
    }
    if (urlArr[1]) {
      payload = urlArr[1].split('&').reduce((accumulator, v) => {
        if (v && v.includes('=')) {
          const temp = v.split('=');
          accumulator[temp[0]] = temp[1];
        }
        return accumulator;
      }, payload || {});
    }
    return {
      url: pathname,
      pageId: Number(pageId),
      payload,
    };
  };

  goTo = ({ url, payload = {}, options = {} } = {}) => {
    // Navigation.push()
    // Navigation.setDefaultOptions()
    // Navigation.registerComponent('Home', () => HomeScreen);
    if (String(url).startsWith('lrn://') || String(url).startsWith('/')) {
      if (options && options.replace) {
        this.redirect({ url, payload, options });
        return;
      }
      const currentPage = this.history[this.history.length - 1];
      const location = this.getLocation(url, payload);
      const componentId = this.routes[currentPage.pageId].componentId;
      Navigation.push(componentId, {
        component: {
          name: location.pageId,
          passProps: location.payload,
        },
      });
      if (this.history.length >= this.maxHistoryLength) {
        this.history = this.history.slice(1);
      }
      this.history.push(location);
      return;
    }
    // 跳转到固定的webview页面打开外链
    if (String(url).startsWith('https:') || String(url).startsWith('http:')) {
      //   window.open(
      //     appendQuery(url, payload),
      //     options.target ? 'target' : '_self',
      //     '',
      //     options.replace || false
      //   );
      //   return;
    }
    console.warn(`${url} 不符合规则，无法进行跳转。`);
    return;
  };

  goBack = ({ delta, url = '', payload = {} } = {}) => {
    // Navigation.popTo('Component1');
    console.log('goBack');
    if (!delta && !url) {
      const currentPage = this.history[this.history.length - 1];
      this.popTo(currentPage);
      this.history = this.history.slice(0, -1);
      return;
    }

    if (delta && delta < 0) {
      this.history = this.history.slice(0, delta);
      const currentPage = this.history[this.history.length - 1];
      this.popTo(currentPage);
      return;
    }

    if (url) {
      const location = this.getLocation(url, payload);
      const tempIndex = this.history.findIndex((v) => {
        return Number(v.pageId) === Number(location.pageId);
      });
      if (tempIndex <= 0) {
        this.popTo(location);
        this.history = this.history.slice(0, tempIndex + 1);
        return;
      } else {
        this.goTo(location);
        return;
      }
    }

    const currentPage = this.history[this.history.length - 1];
    this.popTo(currentPage);
    this.history = this.history.slice(0, -1);
    return;
  };

  popTo = (currentPage) => {
    const componentId = this.routes[currentPage.pageId].componentId;
    Navigation.popTo(componentId);
    // Update props
    Navigation.updateProps(componentId, currentPage.payload);
  };

  redirect = ({ url, payload = {}, options = {} } = {}) => {
    if (String(url).startsWith('lrn://') || String(url).startsWith('/')) {
      const currentPage = this.history[this.history.length - 1];
      const location = this.getLocation(url, payload);
      const componentId = this.routes[currentPage.pageId].componentId;
      Navigation.push(componentId, {
        component: {
          name: location.pageId,
          passProps: location.payload,
        },
      });
      return;
    }
    // 跳转到固定的webview页面打开外链
    if (String(url).startsWith('https:') || String(url).startsWith('http:')) {
      //   window.open(
      //     appendQuery(url, payload),
      //     options.target ? 'target' : '_self',
      //     '',
      //     options.replace || false
      //   );
      //   return;
    }
    console.warn(`${url} 不符合规则，无法进行跳转。`);
    return;
  };
}

export default new configureNavigate();
