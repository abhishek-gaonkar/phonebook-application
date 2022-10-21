import React, { createContext, useEffect, useState, useMemo } from "react";
import useGetApi from "../hooks/useGetApi";
import { getVerifyAccount } from "../utils/api";
import { genericTransformer } from "../utils/api-transform";

const AuthContext = createContext({
  isUserLoggedIn: false,
  userName: "",
  userPhone: -1,
  userContacts: [],
  userToken: "",
  setIsUserLoggedIn: () => {},
  setUserName: () => {},
  setUserPhone: () => {},
  setUserContacts: () => {},
  setUserToken: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState(-1);
  const [userContacts, setUserContacts] = useState([]);
  const [userToken, setUserToken] = useState(localStorage.getItem("a-id"));

  const getVerifyAccountParams = useMemo(() => [userToken], [userToken]);

  const {
    data: getVerifyAccountData,
    error: getVerifyAccountError,
    triggerApi: getVerifyAccountTriggerApi,
  } = useGetApi(getVerifyAccount, getVerifyAccountParams, genericTransformer);

  useEffect(() => {
    if (userToken) {
      getVerifyAccountTriggerApi();
    }
  }, [userToken, getVerifyAccountTriggerApi]);

  useEffect(() => {
    if (getVerifyAccountData) {
      setIsUserLoggedIn(true);
      setUserToken(localStorage.getItem("a-id"));
      setUserName(getVerifyAccountData?.name);
      setUserPhone(getVerifyAccountData?.phone);
    }
  }, [getVerifyAccountData, setIsUserLoggedIn, setUserName, setUserPhone]);

  useEffect(() => {
    if (getVerifyAccountError) {
      setUserToken("");
      localStorage.clear();
      setIsUserLoggedIn(false);
      setUserName("");
      setUserPhone(-1);
    }
  }, [
    getVerifyAccountError,
    setUserToken,
    setIsUserLoggedIn,
    setUserName,
    setUserPhone,
  ]);

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        userToken,
        userName,
        userPhone,
        userContacts,
        setIsUserLoggedIn,
        setUserName,
        setUserPhone,
        setUserContacts,
        setUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
