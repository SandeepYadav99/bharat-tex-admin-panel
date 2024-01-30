import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import useEventBanner from "./EventBanner.hook";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";
import StatusPill from "../../../components/Status/StatusPill.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const EventBanner = ({}) => {
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
  } = useEventBanner({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.event_banner);

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
          <div className={styles.firstCellInfo}>
            <div>
              <img src={obj?.image} />
            </div>
          
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "image",
        label: "IMAGE",
        sortable: false,
        render: (temp, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "type",
        label: "type",
        sortable: false,
        render: (value, all) => (
          <div>
            {all.type}
          </div>
        ),
      },
      {
        key: "link",
        label: "LINK",
        sortable: false,
        render: (temp, all) => (
          <div>
            <a
              href={all?.link}
              target="_blank"
              className={styles.hyperlinkText}
            >
              {all?.link}
            </a>
          </div>
        ),
      },

      {
        key: "priority",
        label: "PRIORITY",
        sortable: false,
        render: (temp, all) => <div>{all?.priority}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "action",
        label: "action",
        sortable: false,
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewUpdate(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleEdit, isCalling]);

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
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <ButtonBase onClick={() => history.goBack()}>
              <ArrowBackIosIcon fontSize={"small"} />
              <span className={"capitalize"}>
                <b> Banner</b>
              </span>
            </ButtonBase>
            <div className={styles.newLine} />
          </div>
          <div className={styles.rightFlex}>
            <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
              Add new
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
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

export default EventBanner;
