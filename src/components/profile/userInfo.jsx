import React from "react";
import { Grid, Avatar, Typography, Paper, InputAdornment, IconButton, TextField , Fab ,Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChatIcon from "@material-ui/icons/Chat";
import Por from "./por/por";
import Tags from "./tags/tags.js";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden"
  },
  paper: {
    maxWidth: 210,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2)
  },
  bigAvatar: {
    margin: 20,
    width: 100,
    height: 100
  },
  updateButton: {
    margin: 20,
    width: 100,
    height: 40
  },
  input: {
    display: "none"
  },
  fab: {
    margin: theme.spacing(0),
    marginLeft: theme.spacing(1),
    boxShadow: "none"
  }
}));

const UserInfo = props => {
  const classes = useStyles();
  const [link, setLink] = React.useState(props.details.fblink);

  const updateLink = () => {
    axios({
      method: "put",
      url: "http://localhost:8000/users/",
      data: {fblink: link},
      withCredentials: true
    });
  }

  return (
    <React.Fragment>
      <Grid container direction="row" spacing={1}>
        <Grid item>
          <Grid>
            <Grid item>
              <Avatar
                src={props.details.image}   //Need to look into
                alt="Hi there"
                className={classes.bigAvatar}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={1}
              fullWidth
            >
              <Grid item>{/* <PersonIcon /> */}</Grid>
              <Grid item>{props.details.name}</Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>{/* <RollNoIcon /> */}</Grid>
              <Grid item>{props.details.roll}</Grid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={1}
              wrap="nowrap"
            >
              <Grid item>{/* <DepartmentIcon /> */}</Grid>
              <Grid item>
                <Typography>{props.details.dept}</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>{/* <AddressIcon /> */}</Grid>
              <Grid item>{props.details.room}, {props.details.hall}</Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>{/* <HomeTownIcon /> */}</Grid>
              <Grid item>{props.details.hometown}</Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>{/* <BloodGroupIcon /> */}</Grid>
              <Grid item>{props.details.blood_group}</Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>{/* <EmailIcon /> */}</Grid>
              <Grid item>{props.details.username}@iitk.ac.in</Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid direction="column">
        <Grid item>
          <Por por = {props.details.por} />  
        </Grid>
        <Grid item>
          <Tags tags = {props.details.tags}/>
        </Grid>
      </Grid>
      <TextField
        variant="filled"
        label="Facebook Link"
        defaultValue={props.details.fblink}
        onChange={(e) => setLink(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                edge="end"
              >
                {/* <ChatIcon></ChatIcon> */}<i className="fa fa-facebook-official"></i>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Fab color="secondary" className={classes.fab} onClick={updateLink}>
        <Icon>edit_icon</Icon>
      </Fab>
    </React.Fragment>
  );
};

export default UserInfo;
