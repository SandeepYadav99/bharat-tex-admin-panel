import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  ButtonBase,
} from "@material-ui/core";
import styles from "./Style.module.css";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import { useState } from "react";
import { serviceGetUpcomingJoin } from "../../../../services/Dashboard.service";
import historyUtils from "../../../../libs/history.utils";
import { useCallback } from "react";
import RouteName from "../../../../routes/Route.name";
import { useSelector } from "react-redux";

const PendingEventUserRequest = ({ data }) => {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const changeEmployeeRoute = useCallback((data) => {
    historyUtils.push(`${RouteName.EVENT_USERLIST}`);
  }, []);

  const PendingMemberEventRequest = useCallback((data) => {
    historyUtils.push(`${RouteName.EVENT_USERLIST}`);
  }, []);

  useEffect(() => {
    setList(data?.eventMember?.slice(0, 8));
  }, [data]);

  const {role} = useSelector((state)=>state.auth);

  const _renderListData = () => {
    const tableRows = [];
    if (data) {
      list?.map((val) => {
        tableRows.push(
          <TableRow key={val.id}>
            <TableCell className="pl-3 fw-normal">
              <div
                className={styles.hyperlinkText}
                onClick={() => changeEmployeeRoute(val?.candidate)}
              >
                {val?.name}
              </div>
            </TableCell>
            <TableCell className="pl-3 fw-normal">
              {val?.company_name}
            </TableCell>
            <TableCell className="pl-3 fw-normal">--</TableCell>
            <TableCell className="pl-3 fw-normal">
              {val?.createdAtText}
            </TableCell>
          </TableRow>
        );
      });
      return tableRows;
    } else {
      return (
        <TableRow>
          <TableCell colSpan={6} className={classes.textCenter}>
            No Details Found
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <div className={classes.bgWhite}>
      <div className={classes.upperFlex}>
        <div className={styles.titles}>Pending Event Users Requests</div>
        <div className={styles.newLine} />
      </div>
      <div>
        <TableContainer className={classes.container}>
          <Table stickyHeader className="mb-0">
            <TableHead>
              <TableRow>
                <TableCell className={classes.row}>User Info</TableCell>
                <TableCell className={classes.row}>Company</TableCell>
                <TableCell className={classes.row}>Event</TableCell>
                <TableCell className={classes.row}>DATE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{_renderListData()}</TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={"txtCenter"}>
        {role === "GENERAL"  && (
          <ButtonBase className={"viewBtn"} onClick={PendingMemberEventRequest}>
            View All
          </ButtonBase>
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
  bgWhite: {
    borderRadius: "10px",
    padding: "1rem 1rem",
    backgroundColor: "white",
    boxShadow: "0 0 8px rgb(0 0 0 / 15%)",
  },
  row: {
    fontWeight: "600",
    fontSize: "0.7rem",
  },
  upperFlex: {
    // display: 'flex',
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.8rem",
    marginBottom: "20px",
  },
  value: {
    // fontSize: '0.9rem',
    marginRight: "10px",
  },
  textCenter: {
    textAlign: "center",
    fontSize: "0.8rem",
  },
}));

export default PendingEventUserRequest;
