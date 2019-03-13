import {
  createStackNavigator,
} from 'react-navigation';
import { Home } from '../scenes';
import { withConnectionAlert } from '../hoc';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
});

export default AppNavigator;
