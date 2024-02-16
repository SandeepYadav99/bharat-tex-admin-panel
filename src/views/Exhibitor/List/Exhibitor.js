import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
// import StatusPill from "../../../components/Status/StatusPill.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import { Link } from "react-router-dom";
import useExhibitorList from "./Exhibitor.hook.js";
import RouteName from "../../../routes/Route.name";
import historyUtils from "../../../libs/history.utils.js";
import { capitalizeFirstLetter } from "../../../hooks/CapsLetter.js";
import { ArrowBackIos } from "@material-ui/icons";

const ExhibitorList = ({}) => {
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
    handleCreateFed,
  } = useExhibitorList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.Exhibitor);

  const UpperInfo = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div>Exhibitor List</div>
          <div className={styles.newLine}></div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "company_name",
        label: "Company Name",
        sortable: true,
        render: (value, all) => <div>{all?.company_name}</div>,
      },
      {
        key: "group_name",
        label: "Product Group",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all.product_groups?.map((val) => {
              return <span>{val?.name} ,</span>;
            })}
          </div>
        ),
      },

      {
        key: "venue",
        label: "Venue",
        sortable: false,
        render: (temp, all) => (
          <div>{capitalizeFirstLetter(all?.event_venue)}</div>
        ),
      },
      {
        key: "zone",
        label: "Zone",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.zone_tag
              ? all?.zone_tag?.map((zone, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && ", "}
                    {capitalizeFirstLetter(zone)}
                  </React.Fragment>
                ))
              : "--"}
          </div>
        ),
      },
      {
        key: "partner_type",
        label: "Partner Type",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.partner_tag ? capitalizeFirstLetter(all?.partner_tag) : "--"}
          </div>
        ),
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
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
              onClick={() =>
                historyUtils.push(`${RouteName.EXHIBITOR_DETAILS}` + all?.id)
              }
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() =>
                historyUtils.push(`${RouteName.EXHIBITOR_CREATE}` + all?.id)
              }
            >
              <Edit fontSize={"small"} />
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

  const { user } = useSelector((state) => state?.auth);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <ButtonBase
            // onClick={() => historyUtils.goBack()}
            style={{ marginBottom: "20px" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
              <ArrowBackIos fontSize={"small"} onClick={() => historyUtils.goBack()} />
                <span className={styles.title}>
                  <b>Exhibitors List</b>
                </span>
              </div>
              <div className={styles.newLine}></div>
            </div>
          </ButtonBase>
          {user?.role === "ADMIN" && (
            <div className={styles.BtnWrapper}>
              <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
                Create
                <Add fontSize={"small"} className={"plusIcon"}></Add>
              </ButtonBase>
            </div>
          )}
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
      </PageBox>
    </div>
  );
};

export default ExhibitorList;
