import React, { useCallback, useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import { Add, Edit } from "@material-ui/icons";
import useEventPollsList from "./EventPollsListHook";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import historyUtils from "../../../libs/history.utils";

const EventPollsList = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleSearchValueChange,
    handleCreateFed,
    isCalling,
    handleViewUpdate,
  } = useEventPollsList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.member_list);

  const renderStatus = useCallback((status) => {
    return (
      <StatusPill
        status={status}
        style={status === "PROCESSED" && { background: "#ceece2" }}
      />
    );
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "question",
        label: "QUESTION",
        sortable: false,
        render: (value, all) => (
          <div>
            {console.log(all)}
            {all?.poll_question}
          </div>
        ),
      },
      {
        key: "response",
        label: "NO OF RESPONSE",
        sortable: false,
        render: (temp, all) => <div>{all?.no_of_response}</div>,
      },
      {
        key: "updated",
        label: "UPDATED",
        sortable: false,
        render: (temp, all) => <div>{all?.updatedAtText}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "action",
        label: "action",
        sortable: false,
        render: (temp, all) => (
          <div>
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
  }, [renderStatus, handleEdit, isCalling]);

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
    <div>
      <div></div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <ButtonBase onClick={() => historyUtils.goBack()}>
              <ArrowBackIosIcon fontSize={"small"} />{" "}
              <span>
                <span className={styles.title}>Polls</span>
              </span>
            </ButtonBase>
            <div className={styles.newLine} />
          </div>
          <div className={styles.rightFlex}>
            <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
              Add New
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>
        <div>
          <div style={{ width: "88%" }}>
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
    </div>
  );
};

export default EventPollsList;
