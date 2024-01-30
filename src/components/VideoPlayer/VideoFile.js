import React, { useState, useRef } from 'react';
import styles from './Style.module.css';

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);
  return (
    <div>
      <video ref={videoRef}  className={styles.videoPlayerValue}  controls>
        <source src={videoUrl} type="video/mp4" />
      </video>
     
    </div>
  );
};

export default VideoPlayer;
