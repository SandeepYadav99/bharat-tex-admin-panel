import { ButtonBase } from "@material-ui/core";
import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import { useCallback } from "react";
import ImageGalleryDialog from "../AlbumPopUp/AlbumPopUp";
import useGalleryDetailHook from "./GalleryDetail_hook";
import historyUtils from "../../../../libs/history.utils";
import VideoPlayer from "../../../../components/VideoPlayer/VideoFile";

const GalleryDetail = () => {
  const { employeeAlbumDetailData, toggleDialog, isOpen, currentIndex } =
    useGalleryDetailHook();

  const UpperInfo = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div>Set Timer</div>
          <div className={styles.newLine}></div>
        </div>
      );
    }
    return null;
  }, []);


const imageRender = employeeAlbumDetailData?.media?.filter((val)=> val.type === "IMAGE");
const videoRender = employeeAlbumDetailData?.media?.filter((val)=> val.type === "VIDEO");


  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase
            onClick={() => {
              historyUtils.goBack();
            }}
          >
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Album Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div>
          <span className={styles.title}> Albums Information</span>
        </div>
        <br />
        <div className={styles.newContainer}>
          <div className={styles.mainFlex}>
            <div className={styles.left221}>
              <div className={styles.imgCont}>
                <div className={styles.upper}>
                  <img
                    className={styles.bngImg}
                    src={employeeAlbumDetailData?.thumbnail}
                    alt="Banner"
                  />
                </div>
              </div>
              <div className={styles.HeaderWrap}>
                <div className={styles.key}>
                  <span className={styles.value}>Name:</span>
                  {employeeAlbumDetailData?.name}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Related To:</span>
                  {employeeAlbumDetailData?.related_to?.event === true ? (
                    <span>{employeeAlbumDetailData?.relatedEvent?.name}</span>
                  ) : (
                    <span>{employeeAlbumDetailData?.relatedChapter?.name}</span>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.left}>
              <div>
                <span className={styles.value}>Date:</span>
                {employeeAlbumDetailData?.eventDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Updated On:</span>
                {employeeAlbumDetailData?.updatedAtText}
              </div>
            </div>
          </div>
          <div className={styles.vertLine}></div>
          <div>
            <div className={styles.keylower}>
              <div className={styles.value}>Description:</div>
              {employeeAlbumDetailData?.description}
            </div>
          </div>
        </div>
      </div>

      <ImageGalleryDialog
        isOpen={isOpen}
        handleToggle={toggleDialog}
        data={employeeAlbumDetailData}
        currentIndex={currentIndex}
      />
      {employeeAlbumDetailData?.images && (
        <div className={styles.galleryImageWrapper}>
          <div>
            <span className={styles.title}>Event Gallery</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.alignInOneRow}>
          {employeeAlbumDetailData?.images && (
            <div className={styles.imageWrapper2}>
              {imageRender.map((item, index) => {
                  return (
                    <div key={`albumImage_${index}`}>
                      <img
                        className={styles.imgdimesion}
                        src={item.url}
                        id={index}
                        onClick={(e) => toggleDialog(e)}
                      />
                    </div>
                  );        
              })}
            </div>
          )}
           {employeeAlbumDetailData?.videos && (
            <div className={styles.imageWrapper}>
              {videoRender.map((item, index) => {
                return (
                  <div key={`albumImage_${index}`}>
                      <VideoPlayer key={index} videoUrl={item.url} />
                  </div>
                );
              })}
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryDetail;
