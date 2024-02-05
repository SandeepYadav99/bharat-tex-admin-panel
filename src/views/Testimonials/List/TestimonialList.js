import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import { Add, ArrowBackIos, BorderColor, Edit, InfoOutlined } from "@material-ui/icons";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";

import StatusPill from "../../../components/Status/StatusPill.component";

import useTestimonialList from "./TestimonialListHook.js";
import historyUtils from "../../../libs/history.utils.js";

const TestimonialList = ({}) => {
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
  } = useTestimonialList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.testimonial);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "image",
        label: "Image",
        sortable: true,
        render: (value, all) => (
          <div style={{ width: "100px", height: "60px", overflow: "hidden" }}>
            <img
              style={{ width: "100%", height: "100%", borderRadius:"5px"}}
              src={all?.image}
              alt=""
            
            />
          </div>
        ),
      },

      {
        key: "name",
        label: "Name",
        sortable: true,
        render: (temp, all) => <div>{all?.name}</div>,
      },

      {
        key: "priority",
        label: "Priority",
        sortable: true,
        render: (temp, all) => <div>{all?.priority}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: true,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <div>
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => handleEdit(all)}
              >
                <BorderColor fontSize={"small"} color="action" />
              </IconButton>
            </div>
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
          <ButtonBase onClick={() => historyUtils.goBack()}>
          <ArrowBackIos fontSize={"small"} />{" "}
          <span>
          <span className={styles.title}>Testimonials</span>
            <div className={styles.newLine} />
          </span>
        </ButtonBase>
         
          </div>
          <div className={styles.BtnWrapper}>
            <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
              Add
              <Add fontSize={"small"} />
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

export default TestimonialList;
