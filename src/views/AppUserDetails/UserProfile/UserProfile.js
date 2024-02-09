import TopNavBar from "../../../components/TopNavBar/TopNavBar.js";
import styles from "./Style.module.css";
import Paper from "@material-ui/core/Paper";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import { ButtonBase } from "@material-ui/core";
import UserProfileView from "./ProfileDetails/UserProfileView.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const UserProfile = () => {
  const params = useParams();
  
  useEffect(()=>{

  },[params?.id])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          {" "}
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b> User Details</b>
            </span>{" "}
          </ButtonBase>
          <div className={styles.newLine} />{" "}
        </div>
      </div>
  
      <div>
        <Paper
          className={styles.paperContainer}
          style={{ height: "auto", padding: "20px" }}
        >
          <div><b>Personal Information</b></div>
          <UserProfileView id={params?.id} />
        </Paper>
      </div>
    </div>
  );
};

export default UserProfile;
