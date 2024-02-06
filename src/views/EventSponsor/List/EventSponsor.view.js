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
import useEventSponsor from "./EventSponsor.hook";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";
import StatusPill from "../../../components/Status/StatusPill.component";
import historyUtils from "../../../libs/history.utils";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const EventSponsor = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleCreateFed,
    editData,
    isCalling,
    configFilter,
    warehouses,
    handleCsvDownload,
    handleViewUpdate,
    handlesponsorType,
    formatedUrl
  } = useEventSponsor({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.event_sponsor);

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
      console.log(obj);
      return (
        <div className={styles.firstCellFlex}>
          <div className={styles.firstCellInfo}>
            <div>
              <img src={obj?.img_url} />
            </div>
            <div >
              {/* <span className={styles.productName}>{obj?.name}</span> <br /> */}
              <a
                href={obj?.url}
                target="_blank"
                className={styles.hyperlinkText}
              >
                {obj?.url}
              </a>
              {/* <span >{obj?.url}</span> <br /> */}
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
        key: "name",
        label: "name",
        sortable: false,
        render: (value, all) => <div>{all?.name}</div>,
      },
      // {
      //   key: "email",
      //   label: "email",
      //   sortable: false,
      //   render: (temp, all) => <div>{all?.email}</div>,
      // },
      {
        key: "image",
        label: "IMAGE",
        sortable: false,
        render: (temp, all) => <div className={styles.hyperlinkBlock}>{renderFirstCell(all)}</div>,
      },
      {
        key: "link",
        label: "LINK",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.hyperlinkBlock}>
            <a
              href={all?.web_url}
              target="_blank"
              className={styles.hyperlinkText}
            >
              {all?.web_url}
             
            </a>
          </div>
        ),
      },
      {
        key: "type",
        label: "TYPE",
        sortable: false,
        render: (temp, all) => <div>{all?.typeObj?.type}</div>,
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
            <ButtonBase onClick={() => historyUtils.goBack()}>
              <ArrowBackIosIcon fontSize={"small"} />
              <span className={"capitalize"}>
                <span className={styles.title}>Partner</span>
              </span>
            </ButtonBase>
            <div className={styles.newLine} />
          </div>

          <div className={styles.rightFlex}>
            <ButtonBase onClick={handlesponsorType} className={styles.download}>
              MANAGE PARTNER TYPE
            </ButtonBase>
            <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
              Add new
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>

        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={[]}
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
    </div>
  );
};

export default EventSponsor;
