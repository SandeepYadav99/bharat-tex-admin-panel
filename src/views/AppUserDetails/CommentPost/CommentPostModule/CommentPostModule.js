import { useSelector } from "react-redux";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import useCommentPost from "./CommentPostHook.js";
import styles from "./Style.module.css";
import { useCallback, useState } from "react";
import { useMemo } from "react";
import PageBox from "../../../../components/PageBox/PageBox.component";
import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import { useEffect } from "react";
import { feedCommentByAppUser } from "../../../../actions/AppUser.action";
import { useDispatch } from "react-redux";
import DeleteIcon from "../../../../assets/img/ic_delete.png";
import Info from "../../../../assets/img/ic_info.png";
import {feedCommentDeleteAppUserFeed,serviceAppUserCommentDetails} from '../../../../actions/AppUser.action';
import AppUserCommentInfo from "../../../../components/AppUserCommentInfo/AppUserCommentInfo";


const CommentPostModule = ({ user_id }) => {
  const [isPanelOpen,setIsPanelOpen] = useState(false)

  const Title =()=>{
    return(
      <div>
         <span>Post Details</span>
         <div className={styles.newLine}></div>
      </div>
    )
  }
  
  const dispatch = useDispatch();
  let payloadData = {
    user_id,
    index: 1,
    row: null,
    order: null,
    query: "",
    query_data: null,
  };

  const toggleData =()=>{
    setIsPanelOpen(false)
  }

  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleViewDetails,
    isCalling,
    handleToggleSidePannel,
  } = useCommentPost({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
    comment,
  } = useSelector((state) => state.App_User);


  const handleDelete =(comment_id)=>{
      dispatch(feedCommentDeleteAppUserFeed({comment_id}))
      dispatch(feedCommentByAppUser(payloadData));
  }

  const handleInfo=(post_id)=>{
    setIsPanelOpen(true);
    dispatch(serviceAppUserCommentDetails({post_id}))
  }

  useEffect(() => {
    dispatch(feedCommentByAppUser(payloadData));
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
        key: "comment",
        label: "comment",
        sortable: false,
        render: ( temp,all) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
          {all?.comment}
          </div>
        ),
      },
      {
        key: "Time",
        label: "Date/Time",
        sortable: true,
        render: ( temp,all) => (
          <div>
            {all?.posted}
          </div>
        ),
      },

      {
        key: "reported",
        label: "Reported",
        sortable: true,
        render: (temp, all) => <div>{all?.reports}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.dataAlignment}>
             <img src={Info} alt="Info" onClick={()=>handleInfo(all?.post_id)}/>
             <img src={DeleteIcon} alt="del" onClick={()=>handleDelete(all?.id)}/>
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
      data: comment?.data?.length > 0 ? comment?.data : [],
      count: comment?.data?.length,
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
          <span className={styles.title}>Comment List</span>
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
        handleToggle={toggleData}
        title={<Title/>}
        open={isPanelOpen}
        side={"right"}
      >
       <AppUserCommentInfo/>
      </SidePanelComponent>
    </PageBox>
  );
};

export default CommentPostModule;
