import React, { Component, useCallback, useEffect, useMemo } from "react";
import {
  Button,
  Paper,
  Checkbox,
  IconButton,
  MenuItem,
  ButtonBase,
  // Menu,
} from "@material-ui/core";

import { connect, useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";

import {
  Add,
  DoneAll,
  Edit,
  InfoOutlined,
  Delete,
  Menu,
} from "@material-ui/icons";
import useCityGuidListHook from "./CityGuideList_hook";
import BannerDialog from "./components/BannerDialog/BannerDialog";
import historyUtils from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
const EventList = ({}) => {
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
    handleCreateFed,
    handleCreateNewBanner,
    handleCityVisit,
    isRejectPopUp,
    toggleRejectDialog,
    dataValue,
  } = useCityGuidListHook({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.event_guide);

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
        key: "title",
        label: "TITLE",
        sortable: true,
        render: (temp, all) => <div>{all?.title}</div>,
      },
      {
        key: "description",
        label: "DESCRIPTION",
        sortable: false,
        render: (value, all) => (
          <div>
            <div className={styles.desData}>
              <div dangerouslySetInnerHTML={{ __html: all?.description }}></div>
            </div>
          </div>
        ),
      },
      {
        key: "thumbnail",
        label: "THUMBNAIL",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.thumbnail}>
            <img
              src={all?.thumbnail}
              alt="Thumbnail"
              className={styles.thumbnail_img}
            />
          </div>
        ),
      },
      {
        key: "banner",
        label: "BANNER",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.firstCellFlex21}>
            <img src={all?.banner} alt="BannerImg" />
          </div>
        ),
      },

      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleCityVisit(all);
              }}
            >
              <Menu fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleDelete(all);
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewDetails(all);
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
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <div>
              <span className={styles.title}>Venue Guide</span>
              <div className={styles.newLine} />
            </div>
          </ButtonBase>

          <div className={styles.create_Sction}>
            <div className={styles.BtnWrapper}>
              <ButtonBase
                onClick={() => toggleRejectDialog()}
                className={"createBtnMng"}
              >
                MANAGE BANNER
              </ButtonBase>
            </div>
            <div className={styles.BtnWrapper}>
              <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
                ADD SECTION
                <Add fontSize={"small"} className={"plusIcon"}></Add>
              </ButtonBase>
            </div>
          </div>
        </div>
        <BannerDialog
          isOpen={isRejectPopUp}
          handleToggle={toggleRejectDialog}
        />
        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={""}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={"handleFilterDataChange"}
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
