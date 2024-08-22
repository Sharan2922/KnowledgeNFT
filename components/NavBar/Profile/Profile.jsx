import React from 'react';
import Image from 'next/image';
import style from "./Profile.module.css";
import { FaUserAlt, FaUserEdit, FaRegImage } from 'react-icons/fa';
import { MdHelpCenter } from 'react-icons/md';
import { TbDownload, TbDownloadOff } from 'react-icons/tb';

import Link from 'next/link';
import images from "../../../img";

const Profile = () => {
  return (
    <div className={style.profile}>
      <div className={style.profile_account}>
        <Image src={images.user1} alt="user profile" width={50} height={50} className={style.profile_account_img} />
        <div className={style.profile_account_info}>
          <p>Shoaib Bhai</p>
          <small>x0384913461124...</small>
        </div>
      </div>
      <div className={style.profile_menu}>
        <div className={style.profile_menu_one}>
          <div className={style.profile_menu_one_item}>
            <FaUserAlt /> 
            <p><Link href="/myprofile">My Profile</Link></p>
          </div>
          <div className={style.profile_menu_one_item}>
            <FaRegImage /> 
            <p><Link href="/my-items">My Items</Link></p>
          </div>
          <div className={style.profile_menu_one_item}>
            <FaUserEdit />
            <p><Link href="/edit-profile">Edit Profile</Link></p>
          </div>
        </div>
        <div className={style.profile_menu_two}>
          <div className={style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link href="/help">Help</Link>
            </p>
          </div>
          <div className={style.profile_menu_one_item}>
            <TbDownload />
            <p>
              <Link href="/disconnect">Disconnect</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
