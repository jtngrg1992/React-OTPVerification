/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { createStackNavigator, createAppContainer } from "react-navigation";
import OTPEntry from "./OTPEntery";
import Detail from "./Detail";
const Router = createStackNavigator(
  {
    Login: App,
    OTP: OTPEntry,
    Detail: Detail
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "rgb(83,73,177)",
        shadowColor: "transparent",
        shadowRadius: 0,
        shadowOffset: {
          height: 0
        },
        borderBottomWidth: 0
      }
    }
  }
);

const AppContainer = createAppContainer(Router);
AppRegistry.registerComponent(appName, () => AppContainer);
