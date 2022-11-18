# sso-context

steps taken:

`expo init sso-context`
`cd sso-context`

you can skip manual dependency stuff that I did and run `yarn`

followed the docs [here](https://docs.amplify.aws/lib/auth/social/q/platform/react-native/#setup-your-auth-provider)

`amplify init`
`amplify add auth`

I set `exp://192.168.1.2:19000/--/` as the first singin/signout URI
Setting `sso://` *just in case* to second set of URI's

follow docs above for adding other stuff in.

You'll see `Hub.listen` is called erroneously when using the UserContext to store the `user` object
