import React, { useCallback, useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Add, DoneAll, Clear } from "@material-ui/icons";
import useYoutubeListHook from "./YouTube_hook";
import historyUtils from "../../../libs/history.utils";

const YoutubeList = ({}) => {

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
    toggleFeatured,
  } = useYoutubeListHook({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.YoutubeStreem);

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
        key: "link",
        label: "LINK",
        sortable: true,
        render: (temp, all) => <div>{all?.link}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: true,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
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
                toggleFeatured(all);
              }}
            >
              {all?.status === "ACTIVE" ? (
                <div className={styles.removeFeatured}>
                  <Clear fontSize={"small"} />
                  <small>MARK AS INACTIVE</small>
                </div>
              ) : (
                <div className={styles.iconFeatured}>
                  <DoneAll fontSize={"small"} />
                  <small>MARK AS ACTIVE</small>
                </div>
              )}
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
            <ButtonBase onClick={() => historyUtils.goBack()}>
              <ArrowBackIosIcon fontSize={"small"} />
              <div>
                <span className={styles.title}>Youtube Streem</span>
              </div>
            </ButtonBase>
            <div className={styles.newLine} />
          </div>
          <div className={styles.BtnWrapper}>
            <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
              ADD NEW
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>
        <div>
          <div>
            <FilterComponent
              is_progress={isFetching}
              filters={configFilter}
              handleSearchValueChange={handleSearchValueChange}
              handleFilterDataChange={handleFilterDataChange}
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

export default YoutubeList;
