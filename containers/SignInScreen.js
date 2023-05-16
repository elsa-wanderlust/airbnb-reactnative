import { useNavigation } from "@react-navigation/core"; // to navigate
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react"; // to declare state
import axios from "axios"; // to be able to send request

export default function SignInScreen({ setToken }) {
  // DECLARE VARIABLES FOR IMPORTS
  const navigation = useNavigation();
  // DECLARE STATES
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [alert, setAlert] = useState(false);

  // DECLARE FUNCTION TO CREATE ALERT IF LOGIN SUCESSFULL
  const loginAlert = () =>
    Alert.alert("Login", "you've successfully logged in", [
      { text: "OK", onPress: () => setToken(data.token) },
    ]);

  // DECLARE FUNCTION TO HANDLE SUBMIT
  const handleSubmit = async () => {
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("please provide both an email address and a password");
    } else {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          { email, password }
        );
        setData(response.data);
        loginAlert();
      } catch (error) {
        if (error.response.status === 401) {
          setErrorMessage("your password and/or email are not correct");
        } else {
          setErrorMessage(
            "please provide both an email address and a password"
          );
        }
      }
    }
  };

  return (
    <View>
      <View>
        <Text>{password}</Text>
        <TextInput
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text.toLowerCase());
          }}
          value={email}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text.toLowerCase());
          }}
          value={password}
        />
        <Button
          title="Sign in"
          onPress={async () => {
            // const userToken = "secret-token";
            // setToken(userToken);
            handleSubmit();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>No Account? Register</Text>
        </TouchableOpacity>
        {errorMessage ? <Text>{errorMessage}</Text> : ""}
      </View>
    </View>
  );
}
