import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  TouchableOpacity
} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginService from "./LoginService";

class Detail extends React.Component {
  static navigationOptions = navigation => ({
    headerLeft: null
  });
  constructor(props) {
    super(props);
    this.state = {
      memberType: "",
      name: "",
      memberID: "",
      mobileNumber: ""
    };
    this.phoneNumber = this.props.navigation.getParam("phoneNumber");
  }

  componentDidMount() {
    const payload = this.props.navigation.getParam("payload");
    const { MemberType, MembershipId, MobileNo, Name } = payload;
    this.setState({
      memberType: MemberType,
      name: Name,
      memberID: MembershipId,
      mobileNumber: MobileNo
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="always"
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Welcome {this.state.name}!</Text>
          <View
            style={{
              paddingVertical: 20,
              marginHorizontal: 20,
              alignItems: "center",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 3
            }}
          >
            <Text style={styles.title}>
              Membership ID : {this.state.memberID}
            </Text>
            <Text style={styles.title}>
              Membership Type : {this.state.memberType}
            </Text>
            <Text style={styles.title}>
              Mobile Number : {this.state.mobileNumber}
            </Text>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "rgb(83,73,177)",
    justifyContent: "flex-start"
  },
  header: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
    margin: 10
  },
  title: {
    fontWeight: "500",
    color: "white"
  },
  numberInput: {
    fontSize: 22,
    color: "white",
    fontWeight: "600",
    padding: 0,
    borderColor: "rgb(249,249,249)",
    borderBottomWidth: 1,
    minHeight: 40,
    paddingHorizontal: 10,
    minWidth: 300
  },
  submitContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "white",
    margin: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  submitTitle: {
    color: "white",
    fontSize: 20
  }
});
export default Detail;
