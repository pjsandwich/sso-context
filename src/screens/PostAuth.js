import { Button, Text, View } from "react-native";
import { useUser } from "../context/UserContext";

const PostAuth = () => {
  const { user, logout, deleteUser } = useUser();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>You've logged in</Text>
      <Text>{user && user.getUsername()}</Text>
      <Button title="Log out" onPress={() => logout()} />
    </View>
  );
};

export default PostAuth;
