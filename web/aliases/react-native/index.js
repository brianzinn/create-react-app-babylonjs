// ref to https://levelup.gitconnected.com/react-native-typescript-and-react-native-web-an-arduous-but-rewarding-journey-8f46090ca56b

import {Text as RNText, Image as RNImage} from 'react-native-web';
import RNModal from 'modal-enhanced-react-native-web';
// Let's export everything from react-native-web
export * from 'react-native-web';

// And let's stub out everything that's missing!
export const ViewPropTypes = {
  style: () => {},
};
RNText.propTypes = {
  style: () => {},
};
RNImage.propTypes = {
  style: () => {},
  source: () => {},
};

export const Text = RNText;
export const Image = RNImage;
export const Modal = RNModal;
// export const ToolbarAndroid = {};
export const requireNativeComponent = () => {};
