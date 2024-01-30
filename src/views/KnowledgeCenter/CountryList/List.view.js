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
import { connect, useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";
import useList from "./List.hook";
import { useHistory } from "react-router-dom";
import { Link } from "@material-ui/icons";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useLocation } from "react-router-dom";

const List = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    handleCreateFed,
    handleUpdate,
  } = useList({});

  const location = useLocation();
  const nameData = location.state?.name_data;

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.Knowledge_Center_Stamp);
  const history = useHistory();

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={styles.productName}>{obj?.name}</div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "FILE NAME",
        label: "FILE NAME",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "PRIORITY",
        label: "PRIORITY",
        sortable: false,
        render: (temp, all) => <div>{all?.priority}</div>,
      },
      {
        key: "type",
        label: "TYPE",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "action",
        label: "Action",
        style: { width: "15%" },
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewDetails(all);
              }}
            >
              <Link fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleUpdate(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [renderFirstCell, handleViewDetails, handleEdit, isCalling]);

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
    <>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>
              <ButtonBase onClick={() => history.goBack()}>
                <ArrowBackIosIcon fontSize={"small"} />{" "}
              </ButtonBase>
              {nameData}
            </span>{" "}
            <div className={styles.newLine} />
          </div>
          <div className={styles.BtnWrapper}>
            <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
              Create
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

export default List;
