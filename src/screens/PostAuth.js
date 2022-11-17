import { Button, Text, View } from "react-native"

const PostAuth = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>You've logged in</Text>
      <Button
        title="Log out"
      />
    </View>
  )
}

export default PostAuth