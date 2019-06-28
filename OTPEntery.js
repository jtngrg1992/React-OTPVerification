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

class OTPEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      isLoaderVisible: false
    };
    this.phoneNumber = this.props.navigation.getParam("phoneNumber");
  }

  processOTP = () => {
    const { otp } = this.state;

    if (otp.trim().length < 6) {
      alert("OTP should be atleast 6 characters");
    } else {
      let service = new LoginService();
      this.setState({
        isLoaderVisible: true
      });
      service
        .login(this.phoneNumber, otp)
        .then(data => {
          console.log(data);
          const { MemberType, MembershipId, MobileNo, Name } = data;
          if (MemberType && MembershipId && MobileNo && Name) {
            this.props.navigation.navigate("Detail", {
              payload: data
            });
          } else {
            alert("Invalid information encountered");
          }
        })
        .catch(e => {
          alert(e.message);
        })
        .finally(() => {
          setTimeout(() => {
            this.setState({
              isLoaderVisible: false
            });
          }, 300);
        });
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="always"
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Enter the OTP!</Text>
          <View style={{ paddingVertical: 100 }}>
            <View style={{ paddingHorizontal: 40, alignItems: "center" }}>
              <TextInput
                style={styles.numberInput}
                textContentType="oneTimeCode"
                onChangeText={text => this.setState({ otp: text })}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={this.processOTP}
            >
              <Text style={styles.submitTitle}>Submit!</Text>
            </TouchableOpacity>
          </View>
          {this.state.isLoaderVisible ? (
            <View
              style={{
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0, 0.5)"
              }}
            >
              <ActivityIndicator />
            </View>
          ) : (
            <View />
          )}
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
  textInputContainer: {
    marginBottom: 20
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
export default OTPEntry;
