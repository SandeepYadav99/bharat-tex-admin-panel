import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import styles from './Style.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Close from '../../assets/img/ic_close.png';

const ImageCourselPopUp=({open,handleClose,content})=> {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
    return (
      <div  className={styles.container} >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title" style={{display:"flex",justifyContent:"flex-end"}} ><img src={Close} alt="image"  onClick={handleClose}/></DialogTitle>
          <DialogContent>
          <Slider {...settings} style={{width:"400px",height:"400px",overflowX:"hidden",overflowY:"hidden"}}>
          {content?.map((val,i)=>{
            return(
              <div key={i}>
                <img src={val.images} alt="text-image" style={{width:"400px",height:"400px"}} />
              </div>
            )
          })}
          </Slider>
          </DialogContent>  
        </Dialog>
      </div>
    );
  }
  
  export default ImageCourselPopUp;