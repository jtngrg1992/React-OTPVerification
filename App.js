/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginService from "./LoginService";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: "+91",
      phoneNumber: "",
      loaderVisible: false
    };
  }

  get inputValue() {
    return `${this.state.countryCode}-${this.state.phoneNumber}`;
  }

  processLogin = () => {
    const { phoneNumber } = this.state;
    if (phoneNumber.trim().length == 10) {
      let service = new LoginService();
      this.setState({
        loaderVisible: true
      });
      service
        .requestOTP(phoneNumber)
        .then(data => {
          console.log(data);
          this.props.navigation.navigate("OTP", { phoneNumber: phoneNumber });
        })
        .catch(error => {
          alert(error.message);
        })
        .finally(() => {
          setTimeout(() => {
            this.setState({
              loaderVisible: false
            });
          }, 300);
        });
    } else {
      alert("Enter a valid phone number");
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="always"
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Login!</Text>
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              marginBottom: 50,
              paddingHorizontal: 30
            }}
          >
            <Text style={styles.instructions}>
              Please enter your phone number
            </Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.numberInput}
              value={this.inputValue}
              onChangeText={text => {
                const parts = text.split("-");
                if (parts.length === 2) {
                  this.setState({
                    phoneNumber: parts[1].trim()
                  });
                }
              }}
            />
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={this.processLogin}
            >
              <Text style={styles.submitTitle}>Submit!</Text>
            </TouchableOpacity>
          </View>
          {this.state.loaderVisible ? (
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
    paddingHorizontal: 30
  },
  header: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    color: "#fff",
    marginBottom: 30
  },
  numberInput: {
    fontSize: 22,
    color: "white",
    fontWeight: "600",
    padding: 0,
    borderColor: "rgb(249,249,249)",
    borderBottomWidth: 1,
    minHeight: 40,
    paddingHorizontal: 10
  },
  submitContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "white",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  submitTitle: {
    color: "white",
    fontSize: 20
  }
});
