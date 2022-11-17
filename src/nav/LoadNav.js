import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import LoadingScreen from "../screens/LoadingScreen";
import MainNav from "./MainNav";

const Stack = createNativeStackNavigator();

export default function LoadNav() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      const loadData = async () => {
          await new Promise((r) => setTimeout(r, 3500));
          setIsLoading((isLoading) => !isLoading);
      };
      loadData();
  },[]);

  return (
    <Stack.Navigator>
      { isLoading ? (
          <Stack.Group>
            <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown: false}}/>
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="MainNav" component={MainNav} options={{headerShown: false}}/>
          </Stack.Group>
        )
      }
    </Stack.Navigator>
  )
}