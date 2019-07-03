import React, { useEffect, useState } from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AcadSection from "./acads/acads";
import UserInfo from "./userInfo";
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

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
  }
}));

export default function Profile() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const changePage = (e, newPg) => setPage(newPg);
  const [details, setDetails] = useState({ acads: [] });

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/profile", { withCredentials: true })
      .then(res => setDetails(res.data))
      .catch(err => console.log(err));
  }, []); //Pass acads array to acads portion and rest to profile section

  // const [courses, setCourses] = React.useState([
  //   { code: "MTH101", name: "Mathematics - I" },
  //   { code: "PHY101", name: "Physics Laboratory" },
  //   { code: "ESC101", name: "Fundamentals of Computer Science" }
  // ]);

  const getCourses = () => {
    axios
        .get("http://localhost:8000/users/profile", { withCredentials: true })
        .then(res => setDetails(res.data))
        .catch(err => console.log(err));
  }

  const addCourse = courseCode => {
    if (details.acads.find(course => course.code === courseCode)) {
      return true;
    } else {
      axios({
        method: "put",
        url: "http://localhost:8000/users/acads/",
        data: { code: courseCode },
        withCredentials: true
      })
        .then(() => getCourses())
        .catch(err => console.log(err));

      // const newDetails = { ...details };
      // newDetails.acads.push({ code: courseCode, name: "Something" });
      // setDetails(newDetails);

      // axios
      //   .get("http://localhost:8000/users/acads", { withCredentials: true })
      //   .then(res => setDetails(res.data))
      //   .catch(err => console.log(err));

      return false;
    }
  };

  const deleteCourse = courseCode => {
    // Delete course here
    console.log(courseCode);
    axios({
      method: "delete",
      url: "http://localhost:8000/users/course/delete/",
      data: { code: courseCode },
      withCredentials: true
    }).then(getCourses)
      .catch(err => console.log(err));
  };

  const renderPage = page => {
    if (page === 0) return <UserInfo details={details} />;
    else
      return (
        <AcadSection
          courses={details.acads}
          addCourse={addCourse}
          deleteCourse={deleteCourse}
        />
      );
  };

  return (
    <div className={classes.root}>
      <Paper square>
        <Tabs
          value={page}
          indicatorColor="primary"
          textColor="primary"
          onChange={changePage}
        >
          <Tab label="Profile" />
          <Tab label="Academics" />
        </Tabs>
      </Paper>
      {details.roll && renderPage(page)}
    </div>
  );
}
