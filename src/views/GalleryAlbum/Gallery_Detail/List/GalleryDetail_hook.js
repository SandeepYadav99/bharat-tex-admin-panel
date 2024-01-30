import  { useCallback, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { serviceGetAlbumDetails } from "../../../../services/GalleryAlbum.service";

function useGalleryDetailHook() {
  const [employeeAlbumDetailData, setemployeeAlbumDetailData] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const toggleDialog = useCallback(
    (e) => {
  
      if (!isOpen){
        setCurrentIndex(e.currentTarget.id);
      }
      setIsOpen((s) => !s);
    },
    [isOpen, currentIndex]
  );
  const id = useParams();
  useEffect(() => {
    let dataValues = serviceGetAlbumDetails(id);
   
    
    dataValues
      .then((data) => {
        setemployeeAlbumDetailData(data?.data?.details);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    employeeAlbumDetailData,
    toggleDialog,
    isOpen,
    currentIndex,
  };
}

export default useGalleryDetailHook;
