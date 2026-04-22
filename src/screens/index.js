import { registerRootComponent } from 'expo';

import App from '../../App';
export { default as registerScreen } from './registerScreen';
export { default as loginScreen } from './loginScreen';
export { default as initialScreen } from './initialScreen';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
