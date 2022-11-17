import { Auth, Hub } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Button } from "react-native"
import { useUser } from "../context/UserContext";

const AuthScreen = () => {
  const {loginWithGoogle} = useUser()
  const [authUser,setAuthUser] = useState(null)
  const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
    console.log("event", event);
    console.log("data", data);
    switch (event) {
      case "signIn":
        console.log("data from signup: ",data)
        setAuthUser(data);
        break;
      case "signOut":
        setAuthUser(null);
        break;
      case "customOAuthState":
        setCustomState(data);
    }
  })

  useEffect(() => {
    if (authUser) {
      console.log("authuser activated")
      unsubscribe()
      loginWithGoogle(authUser)
    }
  },[authUser])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Button
        title="Login with Google"
        onPress={() => Auth.federatedSignIn({provider: "Google"})}
      />
    </View>
  )
}

export default AuthScreen