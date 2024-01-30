import React, { Component, useCallback, useEffect, useMemo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import history from "../../../libs/history.utils";
import useReportedUser from "./ReportedDataHook";
import RouteName from "../../../routes/Route.name";
import historyUtils from "../../../libs/history.utils";

const ReportedUser = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleCreateFed,
    isCalling,
    configFilter,
    handleViewUpdate,
  } = useReportedUser({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.Reported_User);

  const renderStatus = useCallback((status) => {
    return (
      <StatusPill
        status={status}
        style={status === "PROCESSED" && { background: "#ceece2" }}
      />
    );
  }, []);
  const handleUserProfile = useCallback((data) => {
    historyUtils.push(RouteName.USER_PROFILE + data?.id);
  }, []);
  // 
  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={styles.firstCellInfo}>
            <img src={obj?.image} />
            <div className={styles.name} onClick={()=>handleUserProfile(obj)}>{obj?.name}</div>
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "user",
        label: "REPORTED USER",
        sortable: false,
        render: (temp, all) => (
          <div>
            {renderFirstCell(all?.reported_user)}
          </div>
        ),
      },
      {
        key: "on",
        label: "REPORTED ON",
        sortable: false,
        render: (value, all) => <div>{all.reportedOn}</div>,
      },

      {
        key: "reported",
        label: "REPORTED BY",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.reported_by ? renderFirstCell(all?.reported_by) : "-"}
          </div>
        ),
      },
      {
        key: "reason",
        label: "REASON",
        sortable: false,
        render: (temp, all) => <div>{all?.reason ? all?.reason : '-'}</div>,
      },
    ];
  }, [renderStatus, renderFirstCell, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: data,
      count: allData.length,
      page: currentPage,
    };

    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
  ]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={"capitalize"}>
              <b> Reported Users</b>
            </span>
            <div className={styles.newLine} />
          </div>
        </div>

        <div>
          <div style={{ width: "85%" }}>
            <FilterComponent
              is_progress={isFetching}
              filters={""}
              handleSearchValueChange={handleSearchValueChange}
              handleFilterDataChange={"handleFilterDataChange"}
            />
          </div>
          <div>
            <br />
            <div style={{ width: "100%" }}>
              <DataTables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
          </div>
        </div>
      </PageBox>
    </div>
  );
};

export default ReportedUser;
