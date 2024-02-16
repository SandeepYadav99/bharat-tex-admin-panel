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

import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import PageBox from "../../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import FilterComponent from "../../../../components/Filter/Filter.component";

import {
  Add,
  DoneAll,
  Edit,
  InfoOutlined,
  Delete,
  Menu,
} from "@material-ui/icons";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../../libs/history.utils";
import useCityGuidContent_ListHook from "./CityGuideContent_List_hook";

const CityGuidContent_List = ({ location }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    handleCreateFed,
    handleDeleteContent
  } = useCityGuidContent_ListHook({ location });


  

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.event_guide_content);

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
        key: "content",
        label: "CONTENT",
        sortable: false,
        render: (value, all) => (
          <div>
            <div className={styles.desData}>
              <div dangerouslySetInnerHTML={{ __html: all?.description }} ></div>
            </div>
          </div>
        ),
      },
      {
        key: "priority",
        label: "PRIORITY",
        sortable: false,
        render: (temp, all) => (
          <div>
            <div className={styles.productName}>{all.priority}</div>
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
                handleViewDetails(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleDeleteContent(all);
              }}
            >
              <Delete fontSize={"small"} />
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
          <div className={styles.outerFlex}>
            <div>
              <ButtonBase onClick={() => history.goBack()}>
                <ArrowBackIosIcon fontSize={"small"} />
                <span className={"capitalize"}>
                  <b>{location?.state?.name}</b>
                </span>
              </ButtonBase>
              <div className={styles.newLine} />
            </div>
          </div>

          <div className={styles.create_Sction}>
            <div className={styles.BtnWrapper}>
              <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
                ADD NEW
                <Add fontSize={"small"} className={"plusIcon"}></Add>
              </ButtonBase>
            </div>
          </div>
        </div>

        <div>
          <div style={{ width: "90%" }}>
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
    </>
  );
};

export default CityGuidContent_List;
