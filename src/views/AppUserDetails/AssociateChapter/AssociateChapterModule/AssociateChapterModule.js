import { useSelector } from "react-redux";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import useAssociateChapter from "./AssociateChapterHook.js";
import styles from "./Style.module.css";
import { useCallback } from "react";
import { useMemo } from "react";
import PageBox from "../../../../components/PageBox/PageBox.component";
import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import AppUserCreateView from "../../../AppUsers/AppUserCreate/AppUserCreate.view";
import { useEffect } from "react";
import { feedAppUserAssociateChapter } from "../../../../actions/AppUser.action";
import { useDispatch } from "react-redux";


const AssociateChapterModule = ({ user_id }) => {
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
  } = useAssociateChapter({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
    associateChapters,
  } = useSelector((state) => state.App_User);

  useEffect(() => {
    dispatch(feedAppUserAssociateChapter(payloadData));
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
        key: "cityname",
        label: "City Name",
        sortable: false,
        render: (temp, all) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
          {all?.name}
          </div>
        ),
      },
      {
        key: "state_fedaration",
        label: "State Fedaration",
        sortable: true,
        render: (temp, all) => (
          <div>
            {all?.parentChapter?.name || all?.name}
          </div>
        ),
      },
      {
        key: "city_code",
        label: "City Code",
        sortable: true,
        render: (temp, all) => <div>{all?.code}</div>,
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
      data: associateChapters?.data?.length > 0 ? associateChapters?.data : [],
      count: associateChapters?.data?.length,
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
          <span className={styles.title}>Chapters List</span>
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
    </PageBox>
  );
};

export default AssociateChapterModule;
