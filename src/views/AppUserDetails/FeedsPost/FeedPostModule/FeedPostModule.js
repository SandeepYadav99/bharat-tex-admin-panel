import { useSelector } from "react-redux";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import useFeedPostModule from "./FeedPostModuleHook.js";
import styles from "./Style.module.css";
import { useCallback } from "react";
import { useMemo } from "react";
import PageBox from "../../../../components/PageBox/PageBox.component";
import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import AppUserCreateView from "../../../AppUsers/AppUserCreate/AppUserCreate.view";
import { useEffect,useState } from "react";
import {
  feedPostAppUserData,
  feedDeleteAppuser,
  commentsByFeedsAppUser,
} from "../../../../actions/AppUser.action";
import { useDispatch } from "react-redux";
import DeleteIcon from "../../../../assets/img/ic_delete.png";
import CommentIcon from "../../../../assets/img/ic_comment.png";
import CommentPopUp from "../../../../components/CommentPopUp/CommentPopUp";


const FeedPostModule = ({ user_id }) => {
  const [popUp,setPopUp] = useState(false)
  const dispatch = useDispatch();
  let payloadData = {
    user_id,
    index: 1,
    row: null,
    order: null,
    query: "",
    query_data: null,
  };

  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleViewDetails,
    editData,
    isSidePanel,
    isCalling,
    handleToggleSidePannel,
  } = useFeedPostModule({});


  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
    postComment,
    profileFeeds,
  } = useSelector((state) => state.App_User);

  const handleDelete = (post_id) => {
    dispatch(feedDeleteAppuser({ post_id }));
    dispatch(feedPostAppUserData(payloadData));
  };

 const handleComments =(post_id)=>{
    setPopUp(true)
    dispatch(commentsByFeedsAppUser({post_id}))
 }
 

 const handleClosePopUp=()=>{
  setPopUp(false)
  dispatch(feedPostAppUserData(payloadData));
 }

  useEffect(() => {
    dispatch(feedPostAppUserData(payloadData));
  }, []);

  const UpperInfo = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div>Add Admin Users</div>
          <div className={styles.newLine}></div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
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
              display: all?.status === "DELETED" ? "none" : "block",
            }}
          >
            {all?.postedAt}
          </div>
        ),
      },
      {
        key: "image",
        label: "Image/Video",
        sortable: true,
        render: (temp, all) => (
          <div
          >
            {all?.images?.length > 0 ? (
              all?.images[0]?.includes("MP4") ? (
                <video
                  src={all?.images[0]}
                  style={{ height: "40px", width: "60px" }}
                />
              ) : (
                <img
                  src={all?.images[0] || all?.images}
                  alt="img"
                  style={{ height: "40px", width: "60px" }}
                />
              )
            ) : (
              <div> - </div>
            )}
          </div>
        ),
      },

      {
        key: "content",
        label: "Content",
        sortable: true,
        render: (temp, all) => (
          <div
          >
            {all?.title}
          </div>
        ),
      },
      {
        key: "likes",
        label: "No of Likes",
        sortable: true,
        render: (temp, all) => (
          <div
          >
            {all?.likes}
          </div>
        ),
      },
      {
        key: "comments",
        label: "No of Comments",
        sortable: true,
        render: (temp, all) => (
          <div
          >
            {all?.comments}
          </div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div
            className={styles.dataAlignment}
          >
            <img
              src={DeleteIcon}
              alt="del"
              onClick={() => handleDelete(all?._id)}
            />
            <img src={CommentIcon} alt="comment"  onClick={()=>handleComments(all?._id)} />
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
      data: profileFeeds?.data?.length > 0 ? profileFeeds?.data : [],
      count: profileFeeds?.data?.length,
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
    <PageBox>
      <div className={styles.headerContainer}>
        <div>
          <span className={styles.title}>Post List</span>
        </div>
        <div></div>
      </div>
      <div>
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
      <SidePanelComponent
        handleToggle={handleToggleSidePannel}
        title={<UpperInfo />}
        open={isSidePanel}
        side={"right"}
      >
        <AppUserCreateView
          handleToggleSidePannel={handleToggleSidePannel}
          isSidePanel={isSidePanel}
          empId={editData}
        />
      </SidePanelComponent>
      <CommentPopUp open={popUp} title={"Comments"}  onClick={handleClosePopUp} commentDetail={postComment?.data}/>
    </PageBox>
  );
};

export default FeedPostModule;
