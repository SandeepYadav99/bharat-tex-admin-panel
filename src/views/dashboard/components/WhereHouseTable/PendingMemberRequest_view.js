import React, { useCallback, useEffect, useState } from "react";
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
import RouteName from "../../../../routes/Route.name";
import historyUtils from "../../../../libs/history.utils";
import { useSelector } from "react-redux";

const PendingMemberRequest = ({ data }) => {
  const { role } = useSelector((state) => state?.auth);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(8);
  const classes = useStyles();

  const PendingMemberRequestPage = useCallback(() => {
    historyUtils.push(`${RouteName.REVIEW_OLR}`);
  }, []);

  useEffect(() => {
    setList(data?.pendingMember?.slice(0, count));
  }, [data, count]);

  function handleIncrease() {
    historyUtils.push(`${RouteName.NEW_MEMBERS}`);
  }

  const changeEmployeeRoute = useCallback(() => {
    historyUtils.push(`${RouteName.NEW_MEMBERS}`);
  }, []);

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
            <TableCell className="pl-3 fw-normal">
              {val?.chapter?.name ? val?.chapter?.name : "--"}
            </TableCell>
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
          <TableCell colSpan={5} className={classes.textCenter}>
            No Details Found
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <div className={classes.bgWhite}>
      <div className={classes.upperFlex}>
        <div className={styles.titles}>Pending Member Users Requests</div>
        <div className={styles.newLine} />
      </div>
      <div>
        <TableContainer className={classes.container}>
          <Table stickyHeader className="mb-0">
            <TableHead>
              <TableRow>
                <TableCell className={classes.row}>Member Info</TableCell>
                <TableCell className={classes.row}>Company</TableCell>
                <TableCell className={classes.row}>City</TableCell>
                <TableCell className={classes.row}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{_renderListData()}</TableBody>
          </Table>
        </TableContainer>
      </div>
      {role === "GENERAL" && (
        <div className={"txtCenter"}>
          <ButtonBase
            className={"viewBtn"}
            style={{ color: "#1BB584" }}
            onClick={handleIncrease}
          >
            View All
          </ButtonBase>
        </div>
      )}
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
    fontWeight: "bold",
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

export default PendingMemberRequest;
