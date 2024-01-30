import React from "react";
import history from "../../../libs/history.utils";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase, IconButton } from "@material-ui/core";
import UpperInfo from "./component/UpperInfo/UpperInfo";
import FilterComponent from "../../../components/Filter/Filter.component";
import DataTables from "../../../Datatables/Datatable.table";
import PageBox from "../../../components/PageBox/PageBox.component";
import useCityAssocList from "./CityAssocList.hook";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import StatusPill from "../../../components/Status/StatusPill.component";
import { Add, InfoOutlined } from "@material-ui/icons";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import Constants from "../../../config/constants";

function CityAssocList() {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    editData,
    isCalling,
    configFilter,
    warehouses,
    handleCreateFed,
    handleViewUpdate,
    CityData,
    handleCityMember,
  } = useCityAssocList({});

  const {
    data,
    all: allData,
    currentPage,
    memberChapterCount,
    isStateAdmin,
    is_fetching: isFetching,
  } = useSelector((state) => state.city_assoc_list);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "code",
        label: "city Association CODE",
        sortable: false,
        render: (value, all) => <div>{all.code}</div>,
      },
      {
        key: "name",
        label: "city NAME",
        sortable: false,
        render: (temp, all) => <div>{all?.name}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        style: { width: "15%" },
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
              <InfoOutlined fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleCityMember(all);
              }}
            >
              <PeopleOutlineOutlinedIcon fontSize={"small"} />
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
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>City Association List</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
        {isStateAdmin && (
          <ButtonBase className={"createBtn"} onClick={handleCreateFed}>
            ADD City Association
            <Add fontSize={"small"} className={"plusIcon"}></Add>
          </ButtonBase>
        )}
      </div>
      <UpperInfo data={CityData} />
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>City Association list</span>
            <div className={styles.newLine2} />
          </div>
          <div className={styles.memberCont}>
            <span className={styles.memberCount}>
              {" "}
              MEMBER COUNT : {""}
              {memberChapterCount}
            </span>
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
      </PageBox>
    </div>
  );
}

export default CityAssocList;
