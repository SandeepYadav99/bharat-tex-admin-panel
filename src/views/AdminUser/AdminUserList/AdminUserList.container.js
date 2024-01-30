import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { Add, InfoOutlined, PrintOutlined } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
// import StatusPill from "../../../components/Status/StatusPill.component";
import useAuthenticate from "../../../hooks/AuthenticateHook";
import useAdminUserList from "./AdminUserListHook";
import DepartmentCreateView from "../AdminCreate/AdminCreate.view";
import StatusPill from "../../../components/Status/StatusPill.component";
import AdminCreateView from "../AdminCreate/AdminCreate.view";

const AdminUserList = ({}) => {
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
    countryCode,
    handleCountrySelection,
  } = useAdminUserList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.adminUser);

  const UpperInfo = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div> {editData ? "Edit" : "Add"} Admin Users</div>
          <div className={styles.newLine}></div>
        </div>
      );
    }
    return null;
  }, []);

  const removeUnderScore =(data)=>{
      if(data  === "CHAPTER_ADMIN" ){
         return "CHAPTER ADMIN"
      }
      else if(data  === "EVENT_MANAGER" ){
        return "EVENT MANAGER"
     }
     else {
      return "GENERAL"
     }
  }

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "NAME",
        sortable: false,
        render: (temp, all) => <div>{all?.name}</div>,
      },
      {
        key: "email",
        label: "email",
        sortable: true,
        render: (value, all) => <div>{all?.email}</div>,
      },

      {
        key: "contact",
        label: "PHONE NUMBER",
        sortable: true,
        render: (temp, all) => <div>{all.contact}</div>,
      },
      {
        key: "role",
        label: "ROLE",
        sortable: true,
        render: (temp, all) => <div>{removeUnderScore(all?.role)}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: true,
        render: (temp, all) => <div>{<StatusPill status={all.status} />}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleToggleSidePannel(all);
              }}
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
            <span className={styles.title}>Admin User List</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase
              onClick={handleToggleSidePannel}
              className={"createBtn"}
            >
              Create
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
        <SidePanelComponent
          handleToggle={handleToggleSidePannel}
          title={<UpperInfo />}
          open={isSidePanel}
          side={"right"}
        >
          <AdminCreateView
            handleToggleSidePannel={handleToggleSidePannel}
            isSidePanel={isSidePanel}
            empId={editData}
          />
        </SidePanelComponent>
      </PageBox>
    </div>
  );
};

export default AdminUserList;
