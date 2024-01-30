import React, { useCallback, useMemo, useState } from "react";
import { ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import useEventFeed from "./EventFeed.hook";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import DeleteDialog from "../component/DeleteDialog/DeleteDialog";
import AssociateDialog from "../component/AssociateDialog/AssociateDialog.view";
import DeleteIcon from "../../../assets/img/ic_delete.png";
import CommentIcon from "../../../assets/img/ic_comment.png";
import default_Image from "../../../assets/img/ic_default_post.png";
import ImageCourselPopUp from "../../../components/ImageCourselPopUp/ImageCourselPopUp";

const EventFeed = ({}) => {
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
    appUserDetail,
  } = useEventFeed({});

  const [openPopUp, setOpenPopUp] = useState(false);

  const handleOpenPopUp = (id) => {
    if (id) {
      setOpenPopUp(true);
    }
  };

  const handleClose = () => {
    setOpenPopUp(false);
  };

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.event_feed);

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
        key: "image",
        label: "Image/Video",
        sortable: true,
        render: (temp, all) => (
          <div
            className={styles.alignInline}
            onClick={() => handleOpenPopUp(all?.id)}
          >
            {
              all?.images?.length >0 ? (
                <img
                  src={all?.images[0]}
                  alt="img"
                  style={{ height: "40px", width: "60px" }}
                />
              ) : (
                <video style={{ height: "40px", width: "60px" }} autoPlay controls>
                  <source src={all?.video} type="video/mp4" />
                </video>
              )
            }
            {all?.imageCount !== "+0" && (
              <div className={styles.count}> {all?.imageCount}</div>
            )}
          </div>
        ),
      },
      {
        key: "name",
        label: "User name",
        sortable: true,
        render: (temp, all) => (
          <a
            href=""
            style={{ color: "red" }}
            onClick={() => appUserDetail(all)}
          >
            {all?.user?.name}
          </a>
        ),
      },
      {
        key: "post",
        label: "post",
        sortable: true,
        render: (temp, all) => <div>{all?.title}</div>,
      },
      {
        key: "likes",
        label: "No of Likes",
        sortable: true,
        render: (temp, all) => <div>{all?.likes}</div>,
      },
      {
        key: "comments",
        label: "No of Comments",
        sortable: true,
        render: (temp, all) => <div>{all?.comments}</div>,
      },
      {
        key: "postdate",
        label: "Post Date",
        sortable: false,
        render: (temp, all) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {all?.postedAtDateTime}
          </div>
        ),
      },
      {
        key: "is",
        label: "is flag",
        sortable: true,
        render: (temp, all) => <div>{all?.isFlagged ? "Yes" : "No"}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.dataAlignment}>
            <img
              src={CommentIcon}
              alt="comment"
              onClick={() => {
                toggleAcceptDialog(all);
              }}
            />
            <img
              src={DeleteIcon}
              alt="del"
              onClick={() => {
                toggleRejectDialog(all);
              }}
            />
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
          <div className={styles.outerFlex}>
            <div>
              <ButtonBase onClick={() => history.goBack()}>
                <ArrowBackIosIcon fontSize={"small"} />
                <span className={"capitalize"}>
                  <b>Post</b>
                </span>
              </ButtonBase>
              <div className={styles.newLine} />
            </div>
          </div>
        </div>
        {isAcceptPopUp && (
          <AssociateDialog
            isOpen={isAcceptPopUp}
            handleToggle={toggleAcceptDialog}
            data={dataValue}
          />
        )}

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
      {openPopUp && (
        <ImageCourselPopUp
          open={openPopUp}
          content={data}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default EventFeed;
