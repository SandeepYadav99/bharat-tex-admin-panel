import React, { Component, useCallback, useEffect, useMemo, useState } from "react";
import { IconButton, MenuItem, ButtonBase, Dialog } from "@material-ui/core";
import { useSelector } from "react-redux";
import { ArrowBackIos, Edit, InfoOutlined } from "@material-ui/icons";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
// import FilterComponent from "../../../components/Filter/Filter.component";
// import StatusPill from "../../../components/Status/StatusPill.component";
import useExhibitorQuery from "./ExhiboitorQuery.hook";
// import AppUserCreateView from "../AppUserCreate/AppUserCreate.view";
import { Link } from "react-router-dom";
import RouteName from "../../routes/Route.name";
import { Add } from "@material-ui/icons";
import historyUtils from "../../libs/history.utils";

const ExhibitorQuery = ({ }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    editData,
    isSidePanel,
    handleCreate,
    isCalling,
    configFilter,
    warehouses,
    handleToggleSidePannel,
    handleCreatecategory,
  } = useExhibitorQuery({});

  const [open, setOpen] = useState(false);
  const [mess, setMess] = useState("");

  const handleOpen = (data ) => {
    setOpen(true)
    setMess(data)
  }


  const PostPopUp = ({ open, commentDetail }) => {

    return (
      <Dialog
        open={open}
        aria-labelledby="dialog-title"
        sx={{ width: "auto", padding: "20px", width: "100px",overFlowX:"none" }}
        
      >
        <div className={styles.dialogTitle} onClick={() => setOpen(false)}>
          <div className={styles.titleName}>
            Exhibitor Query
            <div className={styles.newLine} />{" "}
          </div>
          <div onClick={() => setOpen(false)} style={{ fontSize: "24px" }} className={styles.crossIconArea}>
            x
          </div>
        </div>
        <div className={styles.commentArea}>
          {commentDetail}
        </div>
      </Dialog>
    );
  };

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.exhibitor_query);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "query_from",
        label: "Query From",
        sortable: false,
        render: (value, all) => <div>{all?.user?.name ? all?.user?.name : "--"}</div>,
      },

      {
        key: "email",
        label: "email",
        sortable: false,
        render: (temp, all) => <div>{all?.user?.email ? all?.user?.email : "--"}</div>,
      },
      {
        key: "query_to",
        label: "Query to",
        sortable: false,
        render: (value, all) => <div>{all?.exhibitor?.name ? all?.exhibitor?.name : "--"}</div>,
      },

      {
        key: "query_on",
        label: "Query On",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText ? all?.createdAtText : "--"}</div>,
      },
      {
        key: "action",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => handleOpen(all?.message)}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
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
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <div className={styles.title}>
              Exhibitor Query
            </div>
            <div className={styles.newLine} />
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
            {open && <PostPopUp open={open} commentDetail={mess} />}
          </div>
        </div>
      </PageBox>
    </div>
  );
};

export default ExhibitorQuery;
