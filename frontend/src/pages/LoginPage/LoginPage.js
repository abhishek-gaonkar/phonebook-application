import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  Fragment,
} from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import usePostApi from "../../hooks/usePostApi";
import { postLoginAccount, postCreateAccount } from "../../utils/api";
import { genericTransformer } from "../../utils/api-transform";
import useStyles from "./LoginPage.Styles";
import AuthContext from "../../context/AuthContext";
import PageLoader from "../../components/PageLoader";
import PageInfo from "../../components/PageInfo";
import { useHistory } from "react-router-dom";
import { APP_ROUTES } from "../../config/app";

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createAccountSuccess, setCreateAccountSuccess] = useState(false);
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    setUserName,
    setUserPhone,
    setUserContacts,
  } = useContext(AuthContext);

  useEffect(() => {
    if (isUserLoggedIn) {
      history.push(APP_ROUTES.HOME_PAGE.path);
    }
  }, [isUserLoggedIn, history]);

  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });

  const postLoginAccountParams = useMemo(() => [], []);

  const {
    data: postLoginAccountData,
    loading: postLoginAccountLoading,
    error: postLoginAccountError,
    triggerPostApi: postLoginAccountTriggerApi,
  } = usePostApi(postLoginAccount, postLoginAccountParams, genericTransformer);

  const handlePostLoginBtnClick = () => {
    if (loginData?.phone === "" || loginData?.password === "") {
      setIsError(true);
      setErrorMessage("Empty Fields Detected");
    } else {
      setIsError(false);
      setErrorMessage("");
      postLoginAccountTriggerApi({
        phone: parseInt(loginData?.phone),
        password: loginData?.password,
      });
    }
  };

  const handleLoginDataChange = (event) => {
    setLoginData((val) => ({
      ...val,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (postLoginAccountData) {
      setLoginData((val) => ({ ...val, phone: "", password: "" }));
      localStorage.setItem("a-id", postLoginAccountData?.token);
      setIsLoading(false);
      setIsUserLoggedIn(true);
      setUserName(postLoginAccountData?.account.name);
      setUserPhone(postLoginAccountData?.account.phone);
      setUserContacts(postLoginAccountData?.account.contacts);
      window.location.href = "/";
    }
  }, [
    postLoginAccountData,
    setIsLoading,
    setIsUserLoggedIn,
    setUserName,
    setUserContacts,
    setUserPhone,
  ]);

  useEffect(() => {
    if (postLoginAccountError) {
      setIsError(true);
      setErrorMessage(postLoginAccountError?.data);
      setIsLoading(false);
      setIsUserLoggedIn(false);
      setUserName("");
      setUserPhone(-1);
      setUserContacts([]);
    }
  }, [
    postLoginAccountError,
    setIsError,
    setErrorMessage,
    setIsLoading,
    setIsUserLoggedIn,
    setUserName,
    setUserContacts,
    setUserPhone,
  ]);

  const handleErrorMessageExit = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsError(false);
    setErrorMessage("");
  };

  const [createAccountData, setCreateAccountData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const postCreateAccountParams = useMemo(() => [], []);

  const {
    data: postCreateAccountData,
    loading: postCreateAccountLoading,
    error: postCreateAccountError,
    triggerPostApi: postCreateAccountTriggerApi,
  } = usePostApi(
    postCreateAccount,
    postCreateAccountParams,
    genericTransformer
  );

  const handlePostCreateAccountBtnClick = () => {
    if (
      createAccountData?.name === "" ||
      createAccountData?.phone === "" ||
      createAccountData?.password === ""
    ) {
      setIsError(true);
      setErrorMessage("Empty Fields Detected");
    } else {
      setIsError(false);
      setErrorMessage("");
      postCreateAccountTriggerApi({
        name: createAccountData?.name,
        phone: parseInt(createAccountData?.phone),
        password: createAccountData?.password,
      });
    }
  };

  const handleCreateAccountDataChange = (event) => {
    setCreateAccountData((val) => ({
      ...val,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (postCreateAccountData) {
      setCreateAccountData((val) => ({
        ...val,
        name: "",
        phone: "",
        password: "",
      }));
      setCreateAccountSuccess(true);
      setIsLoading(false);
      setInterval(() => {
        setCreateAccountSuccess(false);
      }, 5000);
    }
  }, [postCreateAccountData, setIsLoading]);

  useEffect(() => {
    if (postCreateAccountError) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage(postCreateAccountError?.data);
    }
  }, [postCreateAccountError, setIsLoading]);

  useEffect(() => {
    if (postLoginAccountLoading || postCreateAccountLoading) {
      setIsLoading(true);
    }
  }, [postLoginAccountLoading, postCreateAccountLoading]);

  return (
    <Box>
      <PageLoader display={isLoading} />
      <PageInfo
        display={isError}
        infoMessage={errorMessage}
        handleClose={handleErrorMessageExit}
        severity="error"
      />
      <Container maxWidth="lg" className={classes.root}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          className={classes.header}
        >
          <Typography variant="h5">Login to your Account</Typography>
          <Typography variant="h5">Create a New Account</Typography>
        </Box>
        <Box display="flex" alignItems="flex-start" justifyContent="center">
          <Container maxWidth="sm" className={classes.actionContainer}>
            <TextField
              type="number"
              variant="outlined"
              label="Phone Number"
              name="phone"
              value={loginData.phone}
              onChange={handleLoginDataChange}
              className={classes.textField}
              fullWidth
              required
            />
            <TextField
              type="password"
              variant="outlined"
              label="Password"
              name="password"
              value={loginData.password}
              onChange={handleLoginDataChange}
              className={classes.textField}
              fullWidth
              required
            />
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              onClick={handlePostLoginBtnClick}
              fullWidth
            >
              Login
            </Button>
          </Container>
          <Container maxWidth="sm" className={classes.actionContainer}>
            {createAccountSuccess ? (
              <Box className={classes.successAccountMessage} textAlign="center">
                <Typography variant="subtitle2">
                  Account Successfully Created !!
                </Typography>
              </Box>
            ) : (
              <Fragment></Fragment>
            )}
            <TextField
              type="text"
              variant="outlined"
              label="Name"
              name="name"
              value={createAccountData.name}
              onChange={handleCreateAccountDataChange}
              className={classes.textField}
              fullWidth
              required
            />
            <TextField
              type="number"
              variant="outlined"
              label="Phone Number"
              name="phone"
              value={createAccountData.phone}
              onChange={handleCreateAccountDataChange}
              className={classes.textField}
              fullWidth
              required
            />
            <TextField
              type="password"
              variant="outlined"
              label="Password"
              name="password"
              value={createAccountData.password}
              onChange={handleCreateAccountDataChange}
              className={classes.textField}
              fullWidth
              required
            />
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              onClick={handlePostCreateAccountBtnClick}
              fullWidth
            >
              Create Account
            </Button>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
