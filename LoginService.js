import { Platform } from "react-native";

function LoginService() {
  let requestParameters = ({ phoneNumber, otp }) => {
    return {
      MobileNo: phoneNumber,
      OTP: otp,
      DeviceId: "DeviceId",
      OSType: Platform.OS
    };
  };

  this.requestOTP = async phoneNumber => {
    const url = "http://skldemo.netcarrots.in/API/AllServices.svc/LoginAPI";
    const parameters = requestParameters({ phoneNumber, otp: "" });
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parameters)
    });
    const responseJSON = await response.json();
    return responseJSON;
  };

  this.login = async (phoneNumber, otp) => {
    const url = "http://skldemo.netcarrots.in/API/AllServices.svc/LoginAPI";
    const parameters = requestParameters({ phoneNumber, otp: otp });
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parameters)
    });
    const responseJSON = await response.json();
    return responseJSON;
  };
}

export default LoginService;
