import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'

const Main = () => {
    return (
        <div className='main'>
            <div className="nav">
                <p>Nexium</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                <div className="greet">
                    <p><span>Hello, Atreon.</span></p>
                    <p>How can I help you?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Give me startup ideas using AI in education</p>
                        <img src={assets.bulb_icon} alt="" />

                    </div>
                    <div className="card">
                        <p>Write a short bio for my portfolio as a React developer</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>How to fetch API data using React hooks?</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" placeholder='Ask Nexium' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Nexium can make mistakes, so double-check it
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main