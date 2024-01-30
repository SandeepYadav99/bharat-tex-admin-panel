import React, { useCallback, useEffect, useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import useEventGallery from "./EventGallery.hook";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import DeleteDialog from "../component/DeleteDialog/DeleteDialog";
import AssociateDialog from "../component/AssociateDialog/AssociateDialog.view";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

const EventGallery = ({}) => {
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
    toggleRejectDialog,
    toggleAcceptDialog,
    isRejectPopUp,
    isAcceptPopUp,
    handleRejectApi,
    dataValue,
    handleListDetails
  } = useEventGallery({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.event_gallery);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <img src={obj?.thumbnail} alt="BannerImg" />
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
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "date",
        label: "DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
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
                toggleRejectDialog(all);
              }}
            >
              <DeleteOutlineOutlinedIcon fontSize={"small"} />
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
                  <b>Event Gallery</b>
                </span>
              </ButtonBase>
              <div className={styles.newLine} />
            </div>
          </div>

          <div className={styles.BtnWrapper}>
            <ButtonBase onClick={toggleAcceptDialog} className={"createBtn"}>
              ASSOCIATE ALBUMS{" "}
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>
        <AssociateDialog
          isOpen={isAcceptPopUp}
          handleToggle={toggleAcceptDialog}
          data={data}
        />
        <DeleteDialog
          handleConfirm={handleRejectApi}
          handleDialog={toggleRejectDialog}
          isOpen={isRejectPopUp}
        />
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

export default EventGallery;
