import React, {
  useState,
  Component,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import history from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import historyUtils from "../../../libs/history.utils";
import useReportedPost from "./ReportedPostHook";
import EyeIcon from "../../../assets/img/eyeIcon.png";
import { IconButton } from "@material-ui/core";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch } from "react-redux";
import { serviceDeleteReportedFeedPostValue } from "../../../services/ReportedPost.service";
import { actionReportedByPostData } from "../../../actions/ReportedPost.action";

const PostPopUp = ({ open, title, commentDetail, onClick }) => {
  const {
    reportedPostValue,
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.Reported_Post);



  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleSearchValueChange,
    isCalling,
    configFilter,
    handleViewUpdate,
  } = useReportedPost({});

  

  const renderStatus = useCallback((status) => {
    return (
      <StatusPill
        status={status}
        style={status === "PROCESSED" && { background: "#ceece2" }}
      />
    );
  }, []);
  const handleUserProfile = useCallback((data) => {
    historyUtils.push(RouteName.USER_PROFILE + data?.id);
  }, []);
  
  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={styles.firstCellInfo}>
            <div className={styles.name} onClick={() => handleUserProfile(obj)}>
              {obj?.name}
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
        key: "username",
        label: "USER NAME ",
        sortable: false,
        render: (value, all) => <div>{all?.reportedData?.name}</div>,
      },

      {
        key: "reportedOn",
        label: "REPORTED ON",
        sortable: false,
        render: (temp, all) => <div>{all?.reportedOn}</div>,
      },
      {
        key: "posted",
        label: "Posted",
        sortable: false,
        render: (temp, all) => <div>{all?.reason}</div>,
      },
    ];
  }, [renderStatus, renderFirstCell, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: reportedPostValue?.length ? reportedPostValue : [],
      count: reportedPostValue?.length ? reportedPostValue?.length : 0,
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
    reportedPostValue,
  ]);

  return (
    <Dialog
      open={open}
      aria-labelledby="dialog-title"
      sx={{ width: "auto", padding: "20px", width: "100px" }}
    >
      <div className={styles.dialogTitle} onClick={onClick}>
        <div className={styles.titleName}>
          {" "}
          {title}
          <div className={styles.newLine} />{" "}
        </div>
        <div onClick={onClick} style={{ fontSize: "24px" }} className={styles.crossIconArea}>
          x
        </div>
      </div>
      <div className={styles.commentArea}>
        <DataTables
          {...tableData.datatable}
          {...tableData.datatableFunctions}
        />
      </div>
    </Dialog>
  );
};

const ReportedPost = ({}) => {
  const dispatch = useDispatch();
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleSearchValueChange,
    isCalling,
    configFilter,
    handleViewUpdate,
  } = useReportedPost({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.Reported_Post);

  const [popUp, setPopUp] = useState(false);

  const handleClosePopUp = () => {
    setPopUp(false);
  };

  const handleOpen = (all) => {
    let params ={
      "postId":all?.id
    }
    setPopUp(true);
    dispatch(actionReportedByPostData(params))
  };

  const handleDeletePost =(all)=>{
    let params ={
      "post_id":all?.id
    }
    serviceDeleteReportedFeedPostValue(params)
  }

  const renderStatus = useCallback((status) => {
    return (
      <StatusPill
        status={status}
        style={status === "PROCESSED" && { background: "#ceece2" }}
      />
    );
  }, []);
  const handleUserProfile = useCallback((data) => {
    historyUtils.push(RouteName.USER_PROFILE + data?.id);
  }, []);
  //
  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={styles.firstCellInfo}>
            <div className={styles.name} onClick={() => handleUserProfile(obj)}>
              {obj?.name}
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
        label: "Image/Video",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.alignSpace}>
            {all?.images.length > 0 ? (
              <img
                src={all?.images[0]}
                alt="image"
                style={{ height: "50px", width: "50px" }}
              />
            ) :   (
              all?.user?.image ?
              <img
                src={all?.user?.image}
                alt="image"
                style={{ height: "50px", width: "50px" }}
              />:"-No Image-"
            )}
            <p className={styles.alignUnderline}>
              {all?.images?.length > 0 ? "+" : ""}
              {all?.images?.length > 0 ? all?.images.length + 1 : ""}
            </p>
          </div>
        ),
      },
      {
        key: "posted",
        label: "Posted By",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all?.user)}</div>,
      },

      {
        key: "post",
        label: "Post",
        sortable: false,
        render: (temp, all) => <div>{all?.title}</div>,
      },
      {
        key: "posted",
        label: "Posted",
        sortable: false,
        render: (temp, all) => <div>{all?.postedAt}</div>,
      },
      {
        key: "reportsnumber",
        label: "No of Reports",
        sortable: false,
        render: (temp, all) => <div>{all?.total_reports}</div>,
      },
      {
        key: "action",
        label: "Action",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.alignSpace}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={()=>handleOpen(all)}
            >
              <RemoveRedEyeOutlinedIcon fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={()=>handleDeletePost(all)}
            >
              <DeleteIcon fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleEdit, isCalling,handleDeletePost]);

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
    handleDeletePost
  ]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={"capitalize"}>
              <b> Reported Posts</b>
            </span>
            <div className={styles.newLine} />
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
        <PostPopUp
          open={popUp}
          title={"Reported by User"}
          onClick={handleClosePopUp}
        />
      </PageBox>
    </div>
  );
};

export default ReportedPost;
