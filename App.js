import 'react-native-gesture-handler';
import Main from './src/App';
import { UserProvider } from './src/context/UserContext';


import * as WebBrowser from "expo-web-browser"
import * as React from 'react';

import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { Linking } from 'react-native';

const isLocalhost = Boolean(__DEV__)

const [
  localRedirectSignIn,
  productionRedirectSignIn
] = awsconfig.oauth.redirectSignIn.split(",");

const [
  localRedirectSignOut,
  productionRedirectSignOut
] = awsconfig.oauth.redirectSignOut.split(",");

// console.log(productionRedirectSignIn,localRedirectSignIn)

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (type === "success" && Platform.OS === "ios") {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

const updatedConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
    urlOpener,
  },
}
Amplify.configure(updatedConfig)

export default function App() {
  return (
    <UserProvider>
      <Main/>
    </UserProvider>
  );
}
