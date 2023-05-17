import { useNavigation } from "@react-navigation/core"; // to navigate
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";
import styles from "../styles/general"; // import styling
import { useState } from "react"; // to declare state
import axios from "axios"; // to be able to send request

// IMPORT COMPONENTS
import LogoAirBnB from "../components/LogoAirBnB";

export default function SignInScreen({ setToken }) {
  // DECLARE VARIABLES FOR IMPORTS
  const navigation = useNavigation();
  // DECLARE STATES
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // DECLARE FUNCTION TO CREATE ALERT IF LOGIN SUCESSFULL
  // once the alert 'OKed' it calls the function setToken that saves in in the state
  const loginAlert = (token) => {
    // console.log(token);
    return Alert.alert("Login", "you've successfully logged in", [
      // { text: `OK` },
      { text: `OK`, onPress: () => setToken(token) },
    ]);
  };

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
        // console.log(response.data);
        loginAlert(response.data.token);
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
    <View style={styles.pageContainer}>
      <ScrollView>
        {/* ------ LOGO AND PAGE NAME ------*/}
        <View style={styles.logoTitle}>
          <LogoAirBnB />
          <Text style={styles.title}>Sign In </Text>
        </View>
        {/* ------ FORM ------*/}
        <View style={styles.allFields}>
          <TextInput
            style={styles.eachField}
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text.toLowerCase());
            }}
            value={email}
          />
          <TextInput
            style={styles.eachField}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
        </View>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : ""}
        {/* ------ FORM VALIDATION ------*/}
        <View style={[styles.flexCenterHor]}>
          <TouchableHighlight
            style={[styles.buttonSignInUp, styles.flexAllCenter]}
            onPress={async () => {
              // const userToken = "secret-token";
              // setToken(userToken);
              handleSubmit();
            }}
          >
            <Text>Sign in</Text>
          </TouchableHighlight>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>No Account? Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
