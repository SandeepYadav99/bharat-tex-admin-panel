import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useState, useCallback } from "react";
import styles from "./Style.module.css";
import { Link, useParams } from "react-router-dom";

const TopNavBar = ({ data }) => {
  const params = useParams();
  const [value, setValue] = useState(data);
  const handleChange = useCallback(
    (event, newValue) => {
      setValue(newValue);
    },
    [setValue, value]
  );

  return (
    <>
      <AppBar position="static" className={styles.backgroundColor}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Link
            to={"/app/user-profile/" + params?.id}
            style={{ textDecoration: "none", color: "black" }}
            id={styles.LinkColorChange}
          >
            <Tab className={"iconTabs"} label="Profile" />
          </Link>
          <Link
            to={"/app/feed-post/" + params?.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Tab className={"iconTabs"} label="Feed Post" />
          </Link>
          <Link
            to={"/app/comments/" + params?.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Tab className={"iconTabs"} label="Comments" />
          </Link>
          <Link
            to={"/app/associate-events/" + params?.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Tab className={"iconTabs"} label="Associated Events" /> 
          </Link>
          <Link
            to={"/app/associate-chapters/" + params?.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Tab className={"iconTabs"} label="Associated Chapters" /> {" "}
          </Link>
        </Tabs>{" "}
      </AppBar>{" "}
      <div className={styles.paperBackground}></div>
    </>
  );
};

export default TopNavBar;
