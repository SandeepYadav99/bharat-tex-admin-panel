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
import useEventList from "./EventList.hook";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";

const EventList = ({}) => {
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
  } = useEventList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.event_list);

  const { role } = useSelector((state) => state?.auth);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <img src={obj?.banner} alt="BannerImg" />
          <div className={styles.productName}>{obj?.name}</div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "event",
        label: "Event",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "org",
        label: "ORGANISED BY",
        sortable: false,
        render: (temp, all) => <div>{all?.organisedBy?.name}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{all?.location}</div>,
      },
      {
        key: "start",
        label: "START DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.startDateText}</div>,
      },
      {
        key: "end",
        label: "END DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.endDateText}</div>,
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
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewDetails(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
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
              {/* <PeopleOutlineOutlinedIcon fontSize={"small"} /> */}
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
            <span className={styles.title}>Event List</span>
            <div className={styles.newLine} />
          </div>
          {(role === "GENERAL" || role === "CHAPTER_ADMIN") && (
            <div className={styles.BtnWrapper}>
              <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
                ADD Event
                <Add fontSize={"small"} className={"plusIcon"}></Add>
              </ButtonBase>
            </div>
          )}
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

export default EventList;
