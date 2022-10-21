import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
  TextField,
  SwipeableDrawer,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { APP_ROUTES } from "../../config/app";
import useStyles from "./HomePage.Styles";
import ContactCard from "../../components/ContactCard";
import useGetApi from "../../hooks/useGetApi";
import usePostApi from "../../hooks/usePostApi";
import {
  postCreateContact,
  getAllContacts,
  deleteSingleContact,
} from "../../utils/api";
import { genericTransformer } from "../../utils/api-transform";
import PageLoader from "../../components/PageLoader";
import PageInfo from "../../components/PageInfo";

const HomePage = () => {
  const history = useHistory();
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [isInfo, setisInfo] = useState(false);
  const [isSeverity, setIsSeverity] = useState("error");
  const [loggedUserMessage, setLoggedUserMessage] = useState(false);
  const [infoMessage, setinfoMessage] = useState("");
  const [createNewContact, setCreateNewContact] = useState({
    contactName: "",
    contactPhone: "",
  });
  const [createContactDrawer, setCreateContactDrawer] = useState(false);

  const { isUserLoggedIn, userContacts, userToken, setUserContacts } =
    useContext(AuthContext);

  const getAllContactsParams = useMemo(() => [userToken], [userToken]);

  const {
    data: getAllContactsData,
    loading: getAllContactsLoading,
    error: getAllContactsError,
    triggerApi: getAllContactsTriggerApi,
  } = useGetApi(getAllContacts, getAllContactsParams, genericTransformer);

  useEffect(() => {
    if (isUserLoggedIn) {
      getAllContactsTriggerApi();
    }
  }, [isUserLoggedIn, getAllContactsTriggerApi]);

  const postCreateContactParams = useMemo(() => [userToken], [userToken]);

  const {
    data: postCreateContactData,
    loading: postCreateContactLoading,
    error: postCreateContactError,
    triggerPostApi: postCreateContactTriggerApi,
  } = usePostApi(
    postCreateContact,
    postCreateContactParams,
    genericTransformer
  );

  const handleOpenDrawerClick = () => {
    setCreateContactDrawer(true);
  };

  const handleCloseDrawerClick = () => {
    setCreateContactDrawer(false);
  };

  const handleinfoMessageExit = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setisInfo(false);
    setinfoMessage("");
  };

  const handleCreateNewContactChange = (event) => {
    setCreateNewContact((val) => ({
      ...val,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCreateContactBtnClick = () => {
    if (
      createNewContact?.contactName === "" ||
      createNewContact?.contactPhone === ""
    ) {
      setisInfo(true);
      setinfoMessage("Empty Fields Detected");
    } else {
      setisInfo(false);
      setinfoMessage("");
      setCreateContactDrawer(false);
      postCreateContactTriggerApi({
        contactName: createNewContact?.contactName,
        contactPhone: parseInt(createNewContact?.contactPhone),
      });
    }
  };

  const handleEditContactBtnClick = (cPhone) => () => {
    history.push(`${APP_ROUTES.EDIT_CONTACT_PAGE.path}/${cPhone}`);
  };

  const handleDeleteContactBtnClick = (contactId) => () => {
    setisInfo(false);
    setIsSeverity("error");
    setinfoMessage("");
    setIsLoading(true);
    deleteSingleContact(contactId, userToken)
      .then((res) => {
        setisInfo(true);
        setIsSeverity("success");
        setinfoMessage("Contact Deleted Successfully");
      })
      .catch((err) => {
        setisInfo(true);
        setIsSeverity("error");
        setinfoMessage(err?.data);
      })
      .finally(() => {
        setUserContacts(
          userContacts.filter((contact) => contact.contactPhone !== contactId)
        );
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (getAllContactsData) {
      setUserContacts(getAllContactsData?.contactResultArray);
      setIsLoading(false);
    }
  }, [getAllContactsData, setUserContacts]);

  useEffect(() => {
    if (postCreateContactData) {
      setisInfo(true);
      setIsSeverity("success");
      setinfoMessage("Contact Created Successfully");
      setUserContacts((contacts) => [
        ...contacts,
        {
          contactName: createNewContact?.contactName,
          contactPhone: parseInt(createNewContact?.contactPhone),
        },
      ]);
      setIsLoading(false);
    }
  }, [
    postCreateContactData,
    createNewContact,
    setisInfo,
    setIsSeverity,
    setinfoMessage,
    setUserContacts,
    setIsLoading,
  ]);

  useEffect(() => {
    if (postCreateContactLoading || getAllContactsLoading) {
      setisInfo(false);
      setIsSeverity("error");
      setinfoMessage("");
      setIsLoading(true);
    }
  }, [
    postCreateContactLoading,
    getAllContactsLoading,
    setisInfo,
    setIsSeverity,
    setinfoMessage,
    setIsLoading,
  ]);

  useEffect(() => {
    if (postCreateContactError) {
      setisInfo(true);
      setIsSeverity("error");
      setinfoMessage(postCreateContactError?.data);
    }
  }, [postCreateContactError, setisInfo, setIsSeverity, setinfoMessage]);

  useEffect(() => {
    if (getAllContactsError) {
      setisInfo(true);
      setIsSeverity("error");
      setinfoMessage(getAllContactsError?.data);
    }
  }, [getAllContactsError, setisInfo, setIsSeverity, setinfoMessage]);

  useEffect(() => {
    if (!isUserLoggedIn) {
      setLoggedUserMessage(true);
    } else {
      setLoggedUserMessage(false);
    }
  }, [isUserLoggedIn, setLoggedUserMessage]);

  if (loggedUserMessage) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        className={classes.errorRoot}
      >
        <PageLoader display={isLoading} />
        <PageInfo
          display={isInfo}
          infoMessage={infoMessage}
          handleClose={handleinfoMessageExit}
          severity={isSeverity}
        />
        <Box m={2} className={classes.errorMessageBox} textAlign="center">
          <Typography variant="h4">Kindly Login to Continue</Typography>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        <PageLoader display={isLoading} />
        <PageInfo
          display={isInfo}
          infoMessage={infoMessage}
          handleClose={handleinfoMessageExit}
          severity={isSeverity}
        />
        <Container maxWidth="lg" className={classes.root}>
          <Box my={2} className={classes.headingBox}>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h4">Your Contacts</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box textAlign="right" m={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleOpenDrawerClick}
                  >
                    <AddBoxIcon fontSize="medium" />
                    <Box ml={1}>Create new Contact</Box>
                  </Button>
                  <SwipeableDrawer
                    anchor="right"
                    open={createContactDrawer}
                    onClose={handleCloseDrawerClick}
                    onOpen={handleOpenDrawerClick}
                  >
                    <Box
                      className={classes.createContactDrawer}
                      display="flex"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <Box className={classes.createContactDrawerInnerBox}>
                        <Box textAlign="center" my={3}>
                          <Typography variant="h5">
                            Create New Contact
                          </Typography>
                        </Box>
                        <TextField
                          type="text"
                          variant="outlined"
                          label="Contact Name"
                          name="contactName"
                          value={createNewContact.name}
                          onChange={handleCreateNewContactChange}
                          className={classes.textField}
                          fullWidth
                          required
                        />
                        <TextField
                          type="number"
                          variant="outlined"
                          label="Contact Phone Number"
                          name="contactPhone"
                          value={createNewContact.phone}
                          onChange={handleCreateNewContactChange}
                          className={classes.textField}
                          fullWidth
                          required
                        />
                        <Button
                          variant="contained"
                          type="submit"
                          color="secondary"
                          onClick={handleCreateContactBtnClick}
                          fullWidth
                        >
                          Create
                        </Button>
                      </Box>
                    </Box>
                  </SwipeableDrawer>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
            {userContacts?.length !== 0 ? (
              <Grid container>
                {userContacts?.map((contact, key) => (
                  <Grid item xs={6} key={key}>
                    <ContactCard
                      contact={contact}
                      editContactBtn={handleEditContactBtnClick}
                      deleteContactBtn={handleDeleteContactBtnClick}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box textAlign="center">
                <Typography variant="h4">No contacts found!</Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    );
  }
};

export default HomePage;
