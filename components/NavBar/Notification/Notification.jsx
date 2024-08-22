import React from 'react'
import Image from 'next/image'
import style from "./Notification.module.css"
import images from "../../../img"


const Notification = () => {
  return (
    <div className={style.notification}>
      <p>Notification</p>
      <div className={style.notification_box}>
        <div className={style.notification_box_img}>
          <Image src={images.user1} alt="profile image" width={50} height={50} className={style.notification_box_img}/>
        </div>
        <div className={style.notification_box_info}>
          <h4>Shoaib Akhtar</h4>
          <p>Measure action your user ...</p>
          <small>3 minutes ago</small>
        </div>
        <span className={style.notification_box_new}></span>
      </div>
    </div>
  )
}

export default Notification