import React, { useState, useEffect } from 'react'
import './ProfileSidebar.scss';

function ProfileSidebar() {
    var [nposts, setNPosts] = useState([])
    const [cuserdata, setCUserdata] = useState()



    return (
        <div className="profileSidebar" >
            <div className="posts2">
                <h1>Intro</h1>
                <div className="intro">
                </div>
            </div>
            <div className="posts2">
                <h1>Photos</h1>
                <div className="photos">
                    {
                        nposts.length === 0 ? (
                            <h1 className="NoNotif">It seems that there are no image posted by this user</h1>
                        ) : (
                                nposts.map((post) => (
                                    <img src={post} />
                                ))
                            )

                    }
                </div>
            </div>
            <div className="hr profile" />
            <div className="policies profile">
                <p>Privacy</p>
                <p className="dot">·</p>
                <p>Terms</p>
                <p className="dot">·</p>
                <p>Advertising</p>
                <p className="dot">·</p>
                <p>Ad choices</p>
                <i className="ads" />
                <p className="dot">·</p>
                <p>Cookies</p>
                <p className="dot">·</p>
                <p>More</p>
                <p className="dot">·</p>
                <p>Facebook © 2023</p>
            </div>
        </div >
    )
}

export default ProfileSidebar