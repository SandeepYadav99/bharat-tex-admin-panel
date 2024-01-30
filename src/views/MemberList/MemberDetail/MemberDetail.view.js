import React from "react";
import history from "../../../libs/history.utils";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase, IconButton } from "@material-ui/core";
import useMemberDetail from "./MemberDetail.hook";
import { useMemo } from "react";
import Constants from "../../../config/constants";
import DataTables from "../../../Datatables/Datatable.table";
import UpperMemberInfo from "./component/UpperMemberInfo/UpperMemberInfo";
import AddUserDialog from "./component/AddUserDialog/AddUserDialog.view";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";

function MemberDetail() {
  const {
    data,
    id,
    isApprovalPopUp,
    toggleApprovalDialog,
    allData,
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    userData,
    otherData,
    formValue,
    handleAsociateUserDetail,
    isRejectPopUp,
    handleRejectApi,
    toggleRejectDialog
  } = useMemberDetail({});

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "NAME",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.squareDiv}>{all?.name}</div>
        ),
      },
      {
        key: "email",
        label: "email",
        sortable: false,
        render: (value, all) => <div>{all?.email}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (value, all) => <div>{all?.title}</div>,
      },
      {
        key: "no",
        label: "phone number",
        sortable: false,
        render: (value, all) => <div>{all?.full_contact}</div>,
      },
      {
        key: "action",
        label: "action",
        sortable: false,
        render: (value, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              // disabled={isCalling}
              onClick={() => {
                handleAsociateUserDetail(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>

            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              onClick={() => {
                toggleApprovalDialog(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, []);

  const tableStructure2 = useMemo(() => {
    return [
      {
        key: "city",
        label: "CITY NAME",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.squareDiv}>{all?.name}</div>
        ),
      },
      {
        key: "state",
        label: "STATE FEDERATION",
        sortable: false,
        render: (value, all) => <div>{all?.parentChapter?.name}</div>,
      },
      {
        key: "city_code",
        label: "CITY CODE",
        sortable: false,
        render: (value, all) => <div>{all?.code}</div>,
      },
    ];
  }, []);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: userData,
      hidePagination: true,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    userData,
  ]);

  const tableData2 = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure2,
      data: allData,
      hidePagination: true,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure2,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    allData,
  ]);
  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Member Companies Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <AddUserDialog
        isOpen={isApprovalPopUp}
        handleToggle={toggleApprovalDialog}
        formValue={formValue}
      />
     
      <UpperMemberInfo data={otherData?.details} />
      <div className={styles.plainPaper}>
        <div className={styles.editFlex}>
          <div className={styles.heading}>Associated Users</div>
          <div className={styles.btnCont}>
            <ButtonBase
              onClick={toggleApprovalDialog}
              type={"button"}
              className={styles.createBtn}
            >
              ADD USER
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>
        <br />
        <div style={{ width: "100%" }}>
          <DataTables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.editFlex}>
          <div className={styles.heading}>Associated Associations</div>
        </div>
        <br />
        <div style={{ width: "100%" }}>
          <DataTables
            {...tableData2.datatable}
            {...tableData2.datatableFunctions}
          />
        </div>
      </div>
    </div>
  );
}

export default MemberDetail;
