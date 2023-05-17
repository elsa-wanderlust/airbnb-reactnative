import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
} from "react-native";
import styles from "../styles/general"; // import styling
import { useState } from "react"; // to declare state
import axios from "axios"; // to be able to send request
import { Feather } from "@expo/vector-icons"; // import icons

// IMPORT COMPONENTS
import LogoAirBnB from "../components/LogoAirBnB";

export default function SignUpScreen({ setToken }) {
  // DECLARE VARIABLES FOR IMPORTS
  const navigation = useNavigation();
  // DECLARE STATES
  const [data, setData] = useState("");
  const [fields, setFields] = useState([
    { name: "email", input: "", error: false },
    { name: "username", input: "", error: false },
    { name: "description", input: "", error: false },
    { name: "password", input: "", error: false },
    { name: "confirm password", input: "", error: false },
  ]);
  const [pwVisible, setPwVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // DECLARE FUNCTION TO CREATE ALERT IF LOGIN SUCESSFULL
  const loginAlert = () =>
    Alert.alert("Signin", "your account has been created", [
      { text: "OK", onPress: () => setToken(data.token) },
    ]);

  // DECLARE FUNCTION TO HANDLE SUBMIT
  const handleSubmit = async () => {
    // will only do the axios request IF error number === 0, which mistake no user mis-entry
    let errorNumber = 0;
    setErrorMessage("");
    for (let i = 0; i < fields.length; i++) {
      // reset the error to false for all fields
      fieldsCopy = [...fields];
      fieldsCopy[i].error = false;
      setFields(fieldsCopy);
      // change error to true if a field is empty + update error message
      if (fields[i].input === "") {
        fieldsCopy = [...fields];
        fieldsCopy[i].error = true;
        setFields(fieldsCopy);
        setErrorMessage("all fields must be filled");
        errorNumber++;
        // or if the password are not identical + update error message
      } else if (fields[3].input !== fields[4].input) {
        fieldsCopy = [...fields];
        fieldsCopy[3].error = true;
        fieldsCopy[4].error = true;
        setFields(fieldsCopy);
        setErrorMessage("the passwords must be identical");
        errorNumber++;
      }
    }
    if (errorNumber === 0) {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
          {
            email: fields[0].input,
            username: fields[1].input,
            description: fields[2].input,
            password: fields[3].input,
          }
        );
        setData(response.data);
        loginAlert();
      } catch (error) {
        console.log(`issue ${error.response.data.error}`);
        if (error.response.data.error === "This email already has an account") {
          fieldsCopy = [...fields];
          fieldsCopy[0].error = true;
          setErrorMessage("This email already has an account");
          setFields(fieldsCopy);
        }
        if (
          error.response.data.error === "This username already has an account."
        ) {
          fieldsCopy = [...fields];
          fieldsCopy[1].error = true;
          setErrorMessage("This username is not available");
          setFields(fieldsCopy);
        }
      }
    }
  };

  // DECLARE FUNCTION TO VIEW PASSWORD
  const viewPassword = () => {
    setPwVisible(!pwVisible);
  };

  return (
    <KeyboardAwareScrollView style={styles.pageContainer}>
      {/* ------ LOGO AND PAGE NAME ------*/}
      <View style={styles.logoTitle}>
        <LogoAirBnB />
        <Text style={styles.title}>Sign Up </Text>
      </View>
      {/* ------ FORM ------*/}
      <View style={styles.allFields}>
        <TextInput
          style={!fields[0].error ? styles.eachField : styles.eachFieldError}
          placeholder="email"
          onChangeText={(text) => {
            fieldsCopy = [...fields];
            fieldsCopy[0].input = text.toLowerCase();
            fieldsCopy[0].error = false;
            setFields(fieldsCopy);
          }}
          value={fields[0].input}
        />

        <TextInput
          style={!fields[1].error ? styles.eachField : styles.eachFieldError}
          placeholder="username"
          onChangeText={(text) => {
            fieldsCopy = [...fields];
            fieldsCopy[1].input = text;
            fieldsCopy[1].error = false;
            setFields(fieldsCopy);
          }}
          value={fields[1].input}
        />

        <TextInput
          style={!fields[2].error ? styles.eachField : styles.eachFieldError}
          multiline
          placeholder="describe yourself in a few words"
          onChangeText={(text) => {
            fieldsCopy = [...fields];
            fieldsCopy[2].input = text;
            fieldsCopy[2].error = false;
            setFields(fieldsCopy);
          }}
          value={fields[2].input}
        />

        <View
          style={!fields[3].error ? styles.eachField : styles.eachFieldError}
        >
          <TextInput
            placeholder="password"
            secureTextEntry={pwVisible ? false : true}
            onChangeText={(text) => {
              fieldsCopy = [...fields];
              fieldsCopy[3].input = text;
              fieldsCopy[3].error = false;
              setFields(fieldsCopy);
            }}
            value={fields[3].input}
          />
          {pwVisible ? (
            <Feather
              name="eye"
              size={24}
              color="black"
              onPress={viewPassword}
            />
          ) : (
            <Feather
              name="eye-off"
              size={24}
              color="black"
              onPress={viewPassword}
            />
          )}
        </View>

        <View
          style={!fields[4].error ? styles.eachField : styles.eachFieldError}
        >
          <TextInput
            placeholder="confirm password"
            secureTextEntry={pwVisible ? false : true}
            onChangeText={(text) => {
              fieldsCopy = [...fields];
              fieldsCopy[4].input = text;
              fieldsCopy[4].error = false;
              setFields(fieldsCopy);
            }}
            value={fields[4].input}
          />
          {pwVisible ? (
            <Feather
              name="eye"
              size={24}
              color="black"
              onPress={viewPassword}
            />
          ) : (
            <Feather
              name="eye-off"
              size={24}
              color="black"
              onPress={viewPassword}
            />
          )}
        </View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <View style={[styles.flexCenterHor]}>
          <TouchableHighlight
            style={[styles.buttonSignInUp, styles.flexAllCenter]}
            onPress={async () => {
              // const userToken = "secret-token";
              // setToken(userToken);
              handleSubmit();
            }}
          >
            <Text>Sign up</Text>
          </TouchableHighlight>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
