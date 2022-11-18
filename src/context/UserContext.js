import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Auth } from "@aws-amplify/auth";
import { API, Hub } from "aws-amplify";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  console.log("contextUser", user);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        //fetchUserData(user).catch(err => console.error(err));
        console.log("currentauthenticateduser: ", user);
        setUser(user);
      })
      .catch((err) => {
        console.log("no user found: ", user, "\nerr: ", err);
        setUser(null);
      });
  }, []);

  const login = (usernameOrEmail, password) =>
    Auth.signIn(usernameOrEmail, password)
      .then((cognitoUser) => {
        setUser(cognitoUser);
        return cognitoUser;
      })
      .catch((err) => {
        if (err.code === "UserNotFoundException") {
          err.message = "Invalid username or password";
        }

        throw err;
      });

  const loginWithGoogle = (cognitoUser) => {
    console.log("setting user: ", cognitoUser);
    setUser(cognitoUser);
  };

  const logout = () => {
    console.log("logout called");
    Auth.signOut().then((data) => {
      setUser(null);
      return data;
    });
  };

  const deleteUser = async () => {
    try {
      const result = await Auth.deleteUser();
      console.log(result);
    } catch (err) {
      console.log("Error deleting user", err);
    } finally {
      setUser(null);
    }
  };

  const values = useMemo(
    () => ({
      user,
      loginWithGoogle,
      login,
      logout,
      deleteUser,
    }),
    [user]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("`useUser` must be within a `UserProvider` component");
  }

  return context;
};
