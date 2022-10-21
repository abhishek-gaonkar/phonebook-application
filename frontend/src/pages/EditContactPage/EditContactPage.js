import React, { Fragment, useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Container,
  Button,
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import PhoneIcon from "@material-ui/icons/Phone";
import { useHistory, useRouteMatch } from "react-router-dom";
import useStyles from "./EditContactPage.Styles";
import { getSingleContact, patchEditContact } from "../../utils/api";
import AuthContext from "../../context/AuthContext";
import { APP_ROUTES } from "../../config/app";
import PageLoader from "../../components/PageLoader";
import PageInfo from "../../components/PageInfo";

const EditContactPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { params } = useRouteMatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isInfo, setisInfo] = useState(false);
  const [isSeverity, setIsSeverity] = useState("error");
  const [infoMessage, setinfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [singleContactData, setSingleContactData] = useState({});

  const [patchContact, setPatchContact] = useState({});

  const { isUserLoggedIn, userToken, setUserContacts } =
    useContext(AuthContext);

  useEffect(() => {
    if (isUserLoggedIn) {
      if (params?.cPhone) {
        setErrorMessage("");
        setIsLoading(true);
        getSingleContact(params.cPhone, userToken)
          .then((res) => {
            setSingleContactData(res.contactResult);
            setPatchContact({
              contactName: res.contactResult?.contactName,
              contactPhone: res.contactResult?.contactPhone,
            });
          })
          .catch((err) => {
            setErrorMessage(err.response.data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        history.push(APP_ROUTES.HOME_PAGE.path);
      }
    } else {
      history.push(APP_ROUTES.LOGIN_PAGE);
    }
  }, [isUserLoggedIn, params?.cPhone, history, userToken]);

  const handlePatchContactFieldChange = (event) => {
    setPatchContact((contact) => ({
      ...contact,
      [event.target.name]: event.target.value,
    }));
  };

  const handleInfoMessageExit = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setisInfo(false);
    setinfoMessage("");
  };

  const handlePatchContactBtnClick =
    (update, contactName, contactPhone) => () => {
      setIsLoading(true);
      setisInfo(false);
      setIsSeverity("error");
      setinfoMessage("");
      patchEditContact(
        { update, contactName, contactPhone: parseInt(contactPhone) },
        userToken
      )
        .then((res) => {
          setUserContacts(res.data?.contactResultArray);
          setisInfo(true);
          setIsSeverity("success");
          setinfoMessage("Edit successfull");
        })
        .catch((err) => {
          setisInfo(true);
          setIsSeverity("error");
          setinfoMessage(err.response?.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

  const handleBackToHomeBtnClick = () => {
    history.push(APP_ROUTES.HOME_PAGE.path);
  };

  return (
    <Box className={classes.root}>
      <PageLoader display={isLoading} />
      <PageInfo
        display={isInfo}
        infoMessage={infoMessage}
        handleClose={handleInfoMessageExit}
        severity={isSeverity}
      />
      {errorMessage ? (
        <Box m={2} className={classes.errorMessageBox} textAlign="center">
          <Typography variant="h4">Error: {errorMessage}</Typography>
        </Box>
      ) : (
        <Fragment></Fragment>
      )}
      <Container maxWidth="sm">
        <Box m={3} className={classes.editFormBox} textAlign="center">
          <Typography variant="h5">Edit your Contact</Typography>
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Box mr={1}>
              <FaceIcon fontSize="large" />
            </Box>
            <TextField
              type="text"
              variant="outlined"
              name="contactName"
              value={patchContact?.contactName || ""}
              onChange={handlePatchContactFieldChange}
              className={classes.textField}
              fullWidth
              required
            />
            <Box ml={2}>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                onClick={handlePatchContactBtnClick(
                  "contactName",
                  patchContact?.contactName,
                  singleContactData?.contactPhone
                )}
              >
                Edit
              </Button>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Box mr={1}>
              <PhoneIcon fontSize="large" />
            </Box>
            <TextField
              type="number"
              variant="outlined"
              name="contactPhone"
              value={patchContact?.contactPhone || ""}
              onChange={handlePatchContactFieldChange}
              className={classes.textField}
              fullWidth
              required
            />
            <Box ml={2}>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                onClick={handlePatchContactBtnClick(
                  "contactPhone",
                  singleContactData?.contactName,
                  patchContact?.contactPhone
                )}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box textAlign="center">
        <Button variant="outlined" onClick={handleBackToHomeBtnClick}>
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default EditContactPage;
