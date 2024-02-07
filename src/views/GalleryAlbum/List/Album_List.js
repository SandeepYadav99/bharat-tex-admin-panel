import React, {  useCallback,  useMemo } from "react";
import {
  IconButton,
  ButtonBase,
} from "@material-ui/core";
import {  useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";
import useAlbumList from "./Album_ListHook";

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
    configFilter,
    warehouses,
    handleCreateFed,
    handleViewUpdate,
    handleListDetails
  } = useAlbumList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.album_list);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <img src={obj?.thumbnail} alt="BannerImg"/>
            <div className={styles.productName}>{obj?.name}</div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "album",
        label: "ALBUM",
        sortable: false,
        render: (value, all) => (
          <div>
            {renderFirstCell(all)}
          </div>
        ),
      },
      {
        key: "date",
        label: "DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.eventDateText ==="Invalid date" ? "N/A" : all?.eventDateText
        }</div>,
      },
      {
        key: "updated on",
        label: "UPDATED ON",
        sortable: false,
        render: (temp, all) => <div>{all?.updatedAtText}</div>,
      },
      {
        key: "no of images",
        label: "No OF IMAGES",
        sortable: false,
        render: (temp, all) => <div>{all?.images?.length}</div>,
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
                handleListDetails(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
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
            <span className={styles.title}>Gallery Albums</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.BtnWrapper}>
            <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
              CREATE
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

export default EventList;
