import { PixelRatio, DeviceEventEmitter, Linking, ToastAndroid } from 'react-native';
import Toast from 'react-native-simple-toast';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';
// import { ipConfig, urlConfig } from './config';
import { dimHeight, dimWidth, datePickerData } from './static';

const util = {
  // 用户信息
  userInfo: {},

  // 获取设备缩放比例
  deviceSize(size) {
    const defaultPixel = 2; // iphone6的像素密度
    // px转换成dp
    const w2 = 750 / defaultPixel;
    const h2 = 1334 / defaultPixel;
    const scale = Math.max(dimHeight / h2, dimWidth / w2);   // 获取缩放比例

    const pixelRatio = PixelRatio.get(); // 设备的像素密度
    let pixelRatioFix = 1; // 修正后的设备像素密度
    pixelRatioFix = pixelRatio > defaultPixel ? ((pixelRatio - defaultPixel) / 10) + defaultPixel : defaultPixel - ((defaultPixel - pixelRatio) / 10);

    return (((size * scale) + 0.5) * pixelRatioFix) / defaultPixel;
  },

  // 文字大小自适应设备分辨率
  textSize(size) {
    const fontScale = PixelRatio.getFontScale(); // 返回字体大小缩放比例
    return Math.round(util.deviceSize(size) / fontScale);
  },

  // 尺寸大小自适应设备分辨率
  scaleSize(size) {
    return Math.round(util.deviceSize(size));
  },

  // 打印当前路由信息，并执行相关操作
  doWithRouteChange(prevState, currentState) {
    const getCurrentRouteName = (navigationState) => {
      if (!navigationState) {
        console.log('未获取到路由状态');
        return null;
      }
      const route = navigationState.routes[navigationState.index];

      if (route.routes) {
        return this.getCurrentRouteName(route);
      }
      return route.routeName;
    };

    const currentScreen = getCurrentRouteName(currentState);
    const prevScreen = getCurrentRouteName(prevState);
    if (prevScreen !== currentScreen) {
      DeviceEventEmitter.emit('NavigationEvent', currentScreen);
      console.log(`---------原视图:${prevScreen}---------`);
      console.log(`---------新视图:${currentScreen}---------`);
    }

    let $Log = '';
    if (!global.appRouteSave || prevScreen === 'Login') {
      global.appRouteSave = [{ routeName: 'home' }];
      $Log = 'bug login';
      return;
    }
      // if (global.appRouteSave.length !== )
    if (!global.appRouteSave.length || !global.appRouteIsPop || !global.appRouteIsPush) {
      global.appRouteIsPop = [];
      global.appRouteIsPush = [];
      $Log = 'bug length';
      return;
    }
      // //  控制状态栏颜色
      // if (global.appRouteSave.length === 1 && global.appRouteSave[0].routeName === 'home') {
      //   StatusBar.setBarStyle('dark-content', true);
      // } else {
      //   StatusBar.setBarStyle('light-content', true);
      // }
      // 判断，是否为硬件操作
    const routeList = global.appRouteSave;
    const routeLength = routeList.length;
      //  pop
    if (global.appRouteIsPop.length) {
        //  非硬件返回
      $Log = '非硬件返回：';
      global.appRouteIsPush = [];
      util.popRouteHandle(global.appRouteIsPop.pop());
    } else if (global.appRouteIsPush.length) {
        //  push页面
      $Log = 'push: ';
      util.pushRouteHandle(global.appRouteIsPush.pop());
        // global.appRouteIsPush++;
    } else if ((routeList[routeLength - 2].routeName) === currentScreen) {
        //  android硬件返回
      $Log = '硬件返回: ';
      util.popRouteHandle();
    } else if (routeLength === 2 && currentScreen === 'Main') {
        //  android硬件返回最外层
      $Log = '硬件返回最外层: ';
      util.popRouteHandle();
    } else {
        // console.log(routeList, '无匹配-----appRouteSave出bug了');
      $Log = '意料之外的bug: ';
    }
    console.log(`$$$${$Log}`, global.appRouteSave);
  },

  // 参数对象的拼接
  concatParams(params) {
    let paramStr = '';

    for (const key in params) {
      // 检查对象是否拥有不在原型链上的自定义属性
      if (params.hasOwnProperty(key)) {
        paramStr += `${key}=${params[key]}&`;
      }
    }

    return paramStr.length ? paramStr.substring(0, paramStr.length - 1) : '';
  },

  /**
   * promise版get请求
   *
   * @param {any} url
   * @returns
   */
//   getFetch(url, params, successFun, failureFun) {
//     function doGetFetch(path) {
//       fetch(path, {
//         method: 'get',
//         headers: new Headers({
//           Accept: '*/*',
//         }),
//       }).then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         console.log(`服务器繁忙，请稍后再试；\r\nCode:${path}:${response.status}`);
//       }).then((json) => {
//         if (json.success) {
//           successFun(json);
//           console.log(`${path}请求成功：`);
//           console.log(json);
//         } else {
//           failureFun(json);
//           console.log(`${path}请求失败`);
//         }
//       }).catch((err) => {
//         console.log(`其他错误；\r\n:${err}`);
//       });
//     }

//     // 请求发送之前先判断userInfo.token是否存在
//     global.storage.loadData('userInfo', (userInfo) => {
//       if (userInfo && userInfo.token) {
//         params.token = userInfo.token;
//         const path = `${ipConfig.ip + url}?${this.concatParams(params)}`;

//         doGetFetch(path);
//       } else {
//         const navigator = global.navigation.state.nav;
//         const routeName = navigator.routes[navigator.index].routeName;
//         if (routeName !== 'Login') {
//           this.resetNav();
//           Toast.showWithGravity('登录超时，请重新登录', Toast.LONG, Toast.CENTER);
//         }
//       }
//     }, (err) => {
//       const navigator = global.navigation.state.nav;
//       const routeName = navigator.routes[navigator.index].routeName;
//       if (routeName !== 'Login') {
//         this.resetNav();
//         Toast.showWithGravity('登录超时，请重新登录', Toast.LONG, Toast.CENTER);
//       }
//       console.log(err);
//     });
//   },
//   /**
//    * promise版post
//    *
//    * @param {any} params
//    * @returns
//    */
//   postFetch(url, params, successFun, failureFun) {
//     function doPostFetch(data, path) {
//       fetch(path, {
//         method: 'POST',
//         body: data,
//         headers: new Headers({
//           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//           Accept: '*/*',
//         }),
//       }).then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         console.log(`服务器繁忙，请稍后再试；\r\nCode:${url}?${data}:${response.status}`);
//       }).then((json) => {
//         if (json.success) {
//           successFun(json);
//           console.log(`${url}?${data}请求成功：`);
//           console.log(json);
//         } else {
//           failureFun(json);
//           console.log(`${url}?${data}请求失败`);
//         }
//       }).catch((err) => {
//         console.log(`其他错误；\r\n:${err}`);
//       });
//     }

//     const path = ipConfig.ip + url;
//     params.token = '';

//     // 请求发送之前先判断userInfo.token是否存在
//     global.storage.loadData('userInfo', (userInfo) => {
//       if (userInfo && userInfo.token) {
//         params.token = userInfo.token;
//         const data = this.concatParams(params);
//         doPostFetch(data, path);
//       } else if (urlConfig.checkLoginInfo === url) {
//         params.token = '';
//         const data = this.concatParams(params);
//         doPostFetch(data, path);
//       } else {
//         // 根据当前路由判断是否要跳转到Login页面
//         const navigator = global.navigation.state.nav;
//         const routeName = navigator.routes[navigator.index].routeName;
//         if (routeName !== 'Login') {
//           this.resetNav();
//           Toast.showWithGravity('登录超时，请重新登录', Toast.LONG, Toast.CENTER);
//         }
//       }
//     }, () => {
//       // 对无需token的post请求进行过滤
//       if (urlConfig.checkLoginInfo === url) {
//         params.token = '';
//         const data = this.concatParams(params);
//         doPostFetch(data, path);
//       } else {
//         const navigator = global.navigation.state.nav;
//         const routeName = navigator.routes[navigator.index].routeName;
//         if (routeName !== 'Login') {
//           this.resetNav();
//           Toast.showWithGravity('登录超时，请重新登录', Toast.LONG, Toast.CENTER);
//         }
//       }
//     });
//   },

  // 重置导航页
  resetNav(routeName = 'Login') {
    const nav = global.navigation;
    if (routeName === 'Login') {
      global.storage.saveData('userInfo', {});
      global.storage.saveData('save', 0);
      util.userInfo = {};
      // TODO: 需要重新定义退出登录接口
      console.log('清空userInfo信息');
    }

    if (nav) {
      try {
        nav.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName }),
          ],
        }));
      } catch (e) {
        console.log(`未能获取到${routeName}：`);
        console.log(e);
      }
    } else {
      console.log('未获取到导航信息');
    }
  },
  //  保存路由信息
  pushRouteHandle(data) {
    const { routeName, params } = data;
    if (!global.appRouteSave) {
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    }
    //  顶部状态栏 变白
    // StatusBar.setBarStyle('light-content', true);
    //  添加。。。
    global.appRouteSave.push({
      routeName,
      params,
    });
  },
  //  跳转路由执行设置popCallback,返回时自动执行
  /**
   * 后退公共方法
   * 当push页面时添加参数{popCallback: () => {}}, 当pop时将调用该方法
   */
  popRouteHandle(params) {
    //  没有appRouteSave时，方法不执行
    if (!global.appRouteSave || !global.appRouteSave.length) return;
    //  返回回调
    const lastObj = global.appRouteSave.pop();
    //  执行popCallback
    if (lastObj.params && lastObj.params.popCallback) {
      lastObj.params.popCallback(params);
    }
  },
  // 页面路由跳转，routeName必须在appNavigator组件中注册，params为跳转时携带的参数
  viewTo(routeName, params = {}) {
    // 当前时间
    const time = (new Date()).getTime();
    // 路由名称相同时
    if (global.appRouteSave && global.appRouteSave[global.appRouteSave.length] !== routeName) {
      // 1s跳转未完成的路由无效
      if (global.appRouteTime && (time - global.appRouteTime <= 500)) {
        console.log('有一个跳转未完成，无法继续下一次跳转');
        return;
      }
    } else if (global.appRouteTime && (time - global.appRouteTime <= 1000)) {
      console.log('有一个跳转未完成，无法继续下一次跳转');
      return;
    }
    // 路由跳转失败
    if (global.appRouteIsPush && global.appRouteIsPush.length) {
      console.log(global.appRouteIsPush[0], '跳转超时1s, 跳转路由失效');
      global.appRouteIsPush = [];
    }

    global.appRouteTime = time;
    global.appRouteIsPush = [{ params, routeName }];
    console.log(global.appRouteIsPush);
    try {
      const nav = global.navigation;
      nav.dispatch(NavigationActions.navigate({ routeName, params }));
    } catch (e) {
      console.log(`未能获取到${routeName}：`);
      console.log(e);
    }
  },
  /**
   * 当push页面时添加参数{popCallback: () => {}}, 当pop时将调用该方法
   * 可传递参数给popCallback
   */
  // 导航栏返回
  viewBack(params = {}) {
    if (!global.appRouteIsPop) {
      global.appRouteIsPop = [];
    }
    global.appRouteIsPop.push(params);
    try {
      // util.popRouteHandle(params);
      const nav = global.navigation;
      nav.dispatch(NavigationActions.back());
    } catch (e) {
      console.log('路由回退失败：');
      console.log(e);
    }
  },

  /**
   * 监听Android返回键
   */
  onBackHandler() {
    const nav = global.navigation.state.nav;
    console.log(nav);
    // 正常后退
    if (nav.index > 0 && nav.routes[nav.length] !== 'GestureUnlock') {
      util.viewBack();
      return true;
    }
    // 到达首页后一秒内点击两次返回键退出应用
    if (this.lastBackPressed && this.lastBackPressed + 1000 >= Date.now()) {
      // 最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;
  },
  /**
   * 调用原生打电话、发短信、发邮件等
   * @param {string} type  tel ：电话 smsto ：短信 http： 网页
   * @param {number|string} text 号码||网址
   */
  contact(type, text) {
    Linking.openURL(`${type}:${text}`);
  },
  openUrl(url, callback) {
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        console.log(`不支持打开url: ${url}`);
      } else {
        if (callback) {
          callback();
        }
        Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  },

  /**
   * 删除数组
   * @param {any} array
   * @param {any} ele
   */
  removeArrayElement(array, ele) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === ele) {
        array.splice(i, 1);
        break;
      }
    }
  },

  /**
   * 获取当前年月
   * 格式201708
   * @returns
   */
  getNowYeadMonth() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = (month < 10 ? `0${month}` : month);
    const mydate = (year.toString() + month.toString());
    return mydate;
  },

  /**
   * 刷新时间选择组件数据
   * @param {any} data
   * @param {any} year
   * @param {any} month
   */
  updateDatePickerData(data, year, month) {
    const datePicker = data || [[], [], []];
    if (datePicker[0].length === 0) {
      for (let yearMFC = 0; yearMFC < 20; yearMFC++) {
        datePicker[0].push({ id: `${2007 + yearMFC}`, name: `${2007 + yearMFC}年` });
      }
      for (let monthMFC = 1; monthMFC < 13; monthMFC++) {
        datePicker[1].push({ id: `${monthMFC}`, name: `${monthMFC}月` });
      }
    }
    const date = new Date();
    const cyear = year || date.getFullYear();
    const cmonth = month || date.getMonth() + 1;
    const d = new Date(cyear, cmonth, 0);
    const days = d.getDate();
    const temp = [];
    if (datePicker[2].length !== days) {
      for (let day = 1; day < days + 1; day++) {
        temp.push({ id: `${day}`, name: `${day}日` });
      }
      datePicker[2] = temp;
    }
    return datePicker;
  },
  /**
       * 验证手机号码是否正确
       * @param sj
       * @returns {boolean}
       */
  checkMobileTelephone(sj) {
    const sjmar = /^1[3|4|5|7|8][0-9]{9}$/;
    if (sj && sj !== '' && sjmar.test(sj)) {
      return true;
    }
    return false;
  },
  // 邮箱验证
  checkEmail(Email) {
    const Emailsmar = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if (Email && Email !== '' && Emailsmar.test(Email)) {
      return true;
    }
    return false;
  },

  // 身份证验证
  checkID(ID) {
    if (typeof ID !== 'string') {
      // return '非法字符串';
      return false;
    }
    const city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外',
    };
    const birthday = `${ID.substr(6, 4)}/${Number(ID.substr(10, 2))}/${Number(ID.substr(12, 2))}`;
    const d = new Date(birthday);
    const newBirthday = `${d.getFullYear()}/${Number(d.getMonth() + 1)}/${Number(d.getDate())}`;
    const currentTime = new Date().getTime();
    const time = d.getTime();
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let sum = 0;
    let i;
    if (!/^\d{17}(\d|x)$/i.test(ID)) {
      // return '非法身份证';
      return false;
    }
    if (city[ID.substr(0, 2)] === undefined) {
      // return '非法地区';
      return false;
    }
    if (time >= currentTime || birthday !== newBirthday) {
      // return '非法生日';
      return false;
    }
    for (i = 0; i < 17; i++) {
      sum += ID.substr(i, 1) * arrInt[i];
    }
    const residue = arrCh[sum % 11];
    if (residue !== ID.substr(17, 1)) {
      // return '非法身份证哦';
      return false;
    }
    // return `${city[ID.substr(0, 2)]},${birthday},${ID.substr(16, 1) % 2 ? ' 男':'女'}`;
    return true;
  },

  // 通用picker组件中，日期格式值的生成函数
  genDatePickerData(date, format = 'YYYY-MM-DD') {
    const pickerData = [];
    if (format.includes('Y')) {
      pickerData.push(datePickerData.yearArr);
    }

    if (format.includes('M')) {
      pickerData.push(datePickerData.monthArr);
    }

    if (format.includes('D')) {
      const formatDate = date ? moment(date, format) : moment();
      const dayInMon = formatDate.daysInMonth();
      const tempDateArr = [].concat(datePickerData.dateArr);
      pickerData.push(tempDateArr.slice(0, dayInMon));
    }

    if (format.includes('H')) {
      pickerData.push(datePickerData.hourArr);
    }

    if (format.includes('m')) {
      pickerData.push(datePickerData.minuteArr);
    }

    return pickerData;
  },
  // 去token 比较
  isEqualParams(first, second, keyList) {
    // first.token = token;
    if (keyList) {
      for (const key in keyList) {
        if (first[key] !== second[key]) {
          return false;
        }
      }
    } else {
      for (const key in first) {
        if (key !== 'token' && first[key] !== second[key]) {
          return false;
        }
      }
    }
    return true;
  },
  //  保存对象到storage
  saveObj(name, key, value) {
    global.storage.loadData(name, (data) => {
      if (!data) {
        console.log(name, '不存在');
        return;
      }
      data[key] = value;
      global.storage.saveData(name, data);
    });
  },
  //  删除字符串中非数字
  getNumber(def, value) {
    if (!str || (typeof str === 'object')) {
      return def === undefined ? str : def;
    }
    if (value) {
      return str.replace(/[^0-9]/g, value);
    }
    return Number(str.replace(/[^0-9]/g, ''));
  },
};


export default util;
