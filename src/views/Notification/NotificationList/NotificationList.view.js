import React, {  useMemo } from "react";
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
import useNotificationList from "./NotificationList.hook";
import { Add,  InfoOutlined } from "@material-ui/icons";
import { capitalizeFirstLetter } from "../../../hooks/CapsLetter";


const NotificationList = ({}) => {
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
  } = useNotificationList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.notification);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "TITLE",
        label: "TITLE",
        sortable: true,
        render: (value, all) => (
          <div>
            {all?.title}
          </div>
        ),
      },
      {
        key: "message",
        label: "message",
        sortable: false,
        render: (temp, all) => <div className={styles.message}>{all?.message}</div>,
      },
      {
        key: "created",
        label: "CREATED ON",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
      },
      // {
      //   key: "event",
      //   label: "RELATED EVENT",
      //   sortable: false,
      //   render: (temp, all) => <div>{all?.event?.name ? all?.event?.name : "-"}</div>,
      // },
      {
        key: "module",
        label: "RELATED SCREEN/MODULE",
        sortable: false,
        render: (temp, all) => <div>{capitalizeFirstLetter(all?.next_screen)}</div>,
      },
      {
        key: "is_sent",
        label: "is sent",
        sortable: false,
        render: (temp, all) => <div>{all?.is_sent ? "Yes" : "No"}</div>,
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
              disabled={all?.is_sent} //  && isCalling
              onClick={() => {
                handleViewDetails(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [handleViewDetails, handleEdit, isCalling, capitalizeFirstLetter]);

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
            <span className={styles.title}>Notification</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.BtnWrapper}>
            <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
              SEND NOTIFICATION
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>

        <div style={{ width: "90%" }}>
          <FilterComponent
            is_progress={isFetching}
            filters={[]}
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
      
      </PageBox>
    </>
  );
};

export default NotificationList;
