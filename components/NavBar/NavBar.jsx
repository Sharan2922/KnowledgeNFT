import React, { useState, useEffect,useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Import of icons
import { MdNotifications } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { CgMenuLeft, CgMenuRight } from 'react-icons/cg';

// Internal style
import style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from './index';
import { Button } from '../componentindex';
import images from '../../img';


import { NFTMarketplaceContext } from '@/Context/NFTMarketplaceContext';

const NavBar = () => {
    const [discover, setDiscover] = useState(false);
    const [help, setHelp] = useState(false);
    const [notification, setNotification] = useState(false);
    const [profile, setProfile] = useState(false);
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const router = useRouter();

    const openMenu = (e) => {
        const btnText = e.target.innerText;
        if (btnText === "Discover") {
            setDiscover(true);
            setHelp(false);
            setNotification(false);
            setProfile(false);
        } else if (btnText === "Help Center") {
            setDiscover(false);
            setHelp(true);
            setNotification(false);
            setProfile(false);
        } else {
            setDiscover(false);
            setHelp(false);
            setNotification(false);
            setProfile(false);
        }
    };

    const openNotification = () => {
        setNotification(prev => !prev);
        setDiscover(false);
        setHelp(false);
        setProfile(false);
    };

    const openProfile = () => {
        setProfile(prev => !prev);
        setNotification(false);
        setDiscover(false);
        setHelp(false);
    };

    const openSideBar = () => {
        setOpenSideMenu(prev => !prev);
    };

    const {currentAcco, connectWallet} = useContext(NFTMarketplaceContext);

    return (
        <div className={style.navbar}>
            <div className={style.navbar_container}>
                <div className={style.navbar_container_left}>
                    <div className={style.logo}>
                        <Image src={images.logo4} alt="Nft Marketplace" width={150} height={100} onClick={()=>router.push("/")}/>
                        
                        
                    </div>
                    <div className={style.navbar_container_left_box_input}>
                        <div className={style.navbar_container_left_box_input_box}>
                            <input type='text' placeholder='Search NFT' />
                            <BsSearch onClick={() => {}} className={style.search_con} />
                        </div>
                    </div>
                </div>

                {/* End of left section */}
                <div className={style.navbar_container_right}>
                    <div className={style.navbar_container_right_discover}>
                        <p onClick={(e) => openMenu(e)}>Discover</p>
                        {discover && (
                            <div className={style.navbar_container_right_discover_box}>
                                <Discover />
                            </div>
                        )}
                    </div>
                    <div className={style.navbar_container_right_help}>
                        <p onClick={(e) => openMenu(e)}>Help Center</p>
                        {help && (
                            <div className={style.navbar_container_right_help_box}>
                                <HelpCenter />
                            </div>
                        )}
                    </div>
                    <div className={style.navbar_container_right_notify}>
                        <MdNotifications className={style.notify} onClick={() => openNotification()} />
                        {notification && <Notification />}
                    </div>
                    <div className={style.navbar_container_right_button}>
                        {currentAcco == "" ? (
                            <Button btnName="connect" handleClick={()=>connectWallet()} /> 
                    ) : (
                        
                            <Button btnName="Create" handleClick={()=>router.push("/uploadnft")} />
                        
                        )}
                        
                    </div>
                    <div className={style.navbar_container_right_profile_box}>
                        <div className={style.navbar_container_right_profile}>
                            <Image src={images.user1} alt="Profile" width={40} height={40} onClick={() => openProfile()} className={style.navbar_container_right_profile} />
                            {profile && <Profile currentAcco={currentAcco}/>}
                        </div>
                    </div>
                    <div className={style.navbar_container_right_menuBtn}>
                        <CgMenuRight className={style.menuIcon} onClick={() => openSideBar()} />
                    </div>
                </div>
            </div>

            {openSideMenu && (
                <div className={style.sideBar}>
                    <SideBar setOpenSideMenu={setOpenSideMenu} 
                    currentAcco={currentAcco}
                    connectWallet= {connectWallet}/>
                </div>
            )}
        </div>
    );
};

export default NavBar;
