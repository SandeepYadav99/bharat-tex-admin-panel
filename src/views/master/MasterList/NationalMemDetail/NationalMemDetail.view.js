import React, { Component, useCallback, useEffect, useMemo } from "react";
import {
  Button,
  Paper,
  Checkbox,
  IconButton,
  MenuItem,
  ButtonBase,
  Menu,
} from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import PageBox from "../../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import FilterComponent from "../../../../components/Filter/Filter.component";
import StatusPill from "../../../../components/Status/StatusPill.component";
import useNationalMemDetail from "./NationalMemDetail.hook";
import { Add } from "@material-ui/icons";

const NationalMemDetail = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    editData,
    isCalling,
    configFilter,
    warehouses,
    handleCsvDownload,
    handleCreateFed,
  } = useNationalMemDetail({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.master_list);

  const renderStatus = useCallback((status) => {
    return (
      <StatusPill
        status={status}
        style={status === "PROCESSED" && { background: "#ceece2" }}
      />
    );
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.employee?.name}</span>{" "}
            <br />
            <span className={styles.productName}>
              {obj?.employee?.emp_code}
            </span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "code",
        label: "STATE FEDERATION CODE",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "name",
        label: "STATE FEDERATION NAME",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.contact}
            <br />
            {`${all?.grade?.code}/${all?.cadre?.code}`}
          </div>
        ),
      },
      {
        key: "created",
        label: "CREATED ON",
        sortable: false,
        render: (temp, all) => <div>{all?.location?.name}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{all?.designation?.name}</div>,
      },
      {
        key: "action",
        label: "action",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.department?.name} / {all?.sub_department?.name}
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      // onRowSelection: this.handleRowSelection,
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
    <>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Member List</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.BtnWrapper}>
            <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
              ADD Member
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>

        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
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
    </>
  );
};

export default NationalMemDetail;
