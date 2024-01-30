import React, { useCallback, useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import StatusPill from "../../components/Status/StatusPill.component";
import useMemberList from "./MemberList.hook";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";

const MemberList = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleCreateFed,
    isCalling,
    configFilter,
    handleViewDetail,
    handleViewEdit,
  } = useMemberList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.member_list);

const {
  role
}= useSelector((state) => state?.auth);


  const renderStatus = useCallback((status) => {
    return (
      <StatusPill
        status={status}
        style={status === "PROCESSED" && { background: "#ceece2" }}
      />
    );
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={styles.firstCellInfo}>
            <div>
              <img src={obj?.image} />
            </div>
            <div>
              <span className={styles.productName}>{obj?.name}</span> <br />
              <a
                href={obj?.url}
                target="_blank"
                className={styles.hyperlinkText}
              >
                {obj?.url}
              </a>
              {/* <span >{obj?.url}</span> <br /> */}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "company",
        label: "MEMBER COMPANY",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "id",
        label: "MEMBER ID",
        sortable: false,
        render: (temp, all) => <div>{all?.code}</div>,
      },
      {
        key: "associate",
        label: "ASSOCIATED CHAPTERS",
        sortable: false,
        render: (temp, all) => <div>{all?.city_chapters}</div>,
      },
      {
        key: "state",
        label: "STATE",
        sortable: false,
        render: (temp, all) => <div>{all?.state_chapters}</div>,
      },
      {
        key: "status",
        label: "No of Users",
        sortable: false,
        render: (temp, all) => <div>{all?.no_of_user}</div>,
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
                handleViewDetail(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
            { role === "GENERAL" &&
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleViewEdit(all);
                }}
              >
                <Edit fontSize={"small"} />
              </IconButton>
            }
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      // onRowSelection: this.handleRowSelection,
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
            <span className={styles.title}>Members Companies</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.rightFlex}>
            <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
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
      </PageBox>
    </div>
  );
};

export default MemberList;
