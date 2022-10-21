import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import ContactsIcon from "@material-ui/icons/Contacts";
import FaceIcon from "@material-ui/icons/Face";
import PhoneIcon from "@material-ui/icons/Phone";
import useStyles from "./ContactCard.Styles";

const ContactCard = ({
  contact,
  editContactBtn = () => {},
  deleteContactBtn = () => {},
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.contactBox}>
        <ContactsIcon color="secondary" className={classes.contactIcon} />
        <Box>
          <Box mt={1} className={classes.contactInnerBox}>
            <FaceIcon className={classes.itemIcon} />
            <Box mx={2}>
              <Typography variant="h5">{contact?.contactName}</Typography>
            </Box>
          </Box>
          <Box mt={1} className={classes.contactInnerBox}>
            <PhoneIcon className={classes.itemIcon} />
            <Box mx={2}>
              <Typography variant="h5">{contact?.contactPhone}</Typography>
            </Box>
          </Box>
          <Box mt={1} className={classes.contactInnerBox}>
            <Button
              variant="outlined"
              onClick={editContactBtn(contact?.contactPhone)}
            >
              Edit Contact
            </Button>
            <Box ml={1}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={deleteContactBtn(contact?.contactPhone)}
              >
                Delete Contact
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactCard;
