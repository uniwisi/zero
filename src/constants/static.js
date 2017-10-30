
import { Dimensions, Platform, PixelRatio } from 'react-native';


// 设备屏幕宽高
export const dimWidth = Dimensions.get('window').width;
export const perWidth = Dimensions.get('window').width / 100;
export const dimHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24;
