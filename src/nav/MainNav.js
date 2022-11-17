import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useUser } from "../context/UserContext"
import AuthScreen from "../screens/Auth"
import PostAuth from "../screens/PostAuth"

const Stack = createNativeStackNavigator()

const MainNav = () => {
  const {user} = useUser()
  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Group>
          <Stack.Screen name="Post-Auth" component={PostAuth}/>
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Auth" component={AuthScreen}/>
        </Stack.Group>
      )
      }
    </Stack.Navigator>
  )
}

export default MainNav;