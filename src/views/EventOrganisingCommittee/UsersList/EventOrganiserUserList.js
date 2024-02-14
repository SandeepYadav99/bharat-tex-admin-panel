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
import useEventOrganiserUserList from "./EventOrganiserUserHook";
import historyUtils from "../../../libs/history.utils";
// import EventOrganiserUserCreateView from "../UsersList/EventOrganiserUserList.js";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
const EventOrganiserUserList = ({location}) => {
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
    handleEditList,
    handleToggleSidePannel,
  } = useEventOrganiserUserList({location});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.eventOrganiserUser);

  const UpperInfo = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div>Add Event Organising Committee</div>
          <div className={styles.newLine}></div>
        </div>
      );
    }
    return null;
  }, []);

  const EditInfo = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div>Edit Event Organiser</div>
          <div className={styles.newLine}></div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "image",
        label: "IMAGE",
        sortable: false,
        render: (temp, all) => <div>  <div className={styles.firstCellFlex}>
        <img src={all?.image} alt="" className={styles.driverImgCont} />
        {all?.s_name}
      </div></div>,
      },
      // {
      //   key: "designation",
      //   label: "DESIGNATION",
      //   sortable: true,
      //   render: (value, all) => <div>{all?.designation}</div>,
      // },

      {
        key: "company",
        label: "COMPANY",
        sortable: true,
        render: (temp, all) => <div>{all?.company}</div>,
      },
      // {
      //   key: "description",
      //   label: "DESCRIPTION",
      //   sortable: true,
      //   render: (temp, all) => <div>{all?.description}</div>,
      // },
      {
        key: "priority",
        label: "PRIORITY",
        sortable: true,
        render: (temp, all) => <div>{all?.priority}</div>,
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
                handleEditList(all);
              }}
            >
              <Edit fontSize={"small"} />
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
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <div>
              <span className={styles.title}>User List</span>
              <div className={styles.newLine} />
            </div>
          </ButtonBase>
          <div>
            <ButtonBase onClick={handleCreate} className={"createBtn"}>
              Create
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>

        <div>
          <div style={{ width: "85%" }}>
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
        </div>
        <SidePanelComponent
          handleToggle={handleToggleSidePannel}
          title={<UpperInfo />}
          open={isSidePanel}
          side={"right"}
        >
          {/* <EventOrganiserUserCreateView
            handleToggleSidePannel={handleToggleSidePannel}
            isSidePanel={isSidePanel}
            data={editData}
          /> */}
        </SidePanelComponent>
      </PageBox>
    </div>
  );
};

export default EventOrganiserUserList;
