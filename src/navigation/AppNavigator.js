/**
 * react-navigation路由配置
 * 所有组件的路由指向在这配置
 */
import { StackNavigator } from 'react-navigation';
import LoadingView from '../components/LoadingView';
// import Main from '../containers/Main';
import HomeContainer from '../containers/HomeContainer';
import MineContainer from '../containers/MineContainer';

const AppNavigator = StackNavigator({
  Loading: { screen: LoadingView },
//  Main: { screen: Main },
HomeContainer: { screen: HomeContainer },
MineContainer: { screen: MineContainer },
}, {
  initialRouteName: 'HomeContainer',
  headerMode: 'none',
});

export default AppNavigator;
