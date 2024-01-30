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
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import useMasterList from "./MasterList.hook";
import { Add, InfoOutlined } from "@material-ui/icons";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";

const MasterList = ({}) => {
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
    handleCreateFed,
    ViewNationalDetail,
    handleViewStateMember,
    handleUpdate,
  } = useMasterList({});

  const { user } = useSelector((state) => state.auth);

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.master_list);

  const { role } = useSelector((state) => state.auth);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "code",
        label: "STATE FEDERATION CODE",
        sortable: true,
        render: (value, all) => <div>{all.code}</div>,
      },
      {
        key: "name",
        label: "STATE FEDERATION NAME",
        sortable: false,
        render: (temp, all) => <div>{all?.name}</div>,
      },
      {
        key: "created",
        label: "CREATED ON",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
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
            {role === "GENERAL" ? (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleUpdate(all);
                }}
              >
                <InfoOutlined fontSize={"small"} />
              </IconButton>
            ) : role !== "GENERAL" && user?.id === all?.admin_id ? (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleUpdate(all);
                }}
              >
                <InfoOutlined fontSize={"small"} />
              </IconButton>
            ) : (
              ""
            )}

            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewDetails(all);
              }}
            >
              <RoomOutlinedIcon fontSize={"small"} />
            </IconButton>
            {role === "GENERAL" ? (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleViewStateMember(all);
                }}
              >
                <PeopleOutlineOutlinedIcon fontSize={"small"} />
              </IconButton>
            ) : role !== "GENERAL" && user?.id === all?.admin_id ? (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleViewStateMember(all);
                }}
              >
                <PeopleOutlineOutlinedIcon fontSize={"small"} />
              </IconButton>
            ) : (
              ""
            )}
          </div>
        ),
      },
    ];
  }, [handleViewDetails, handleEdit, isCalling]);

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
            <span className={styles.title}>CREDAI National List</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.BtnWrapper}>
            <div className={styles.rightFlex}></div>
            {role === "GENERAL" && (
              <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
                ADD State Federation
                <Add fontSize={"small"} className={"plusIcon"}></Add>
              </ButtonBase>
            )}
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

export default MasterList;
