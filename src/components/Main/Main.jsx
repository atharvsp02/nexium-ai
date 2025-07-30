import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, input, setInput } = useContext(Context)

    return (
        <div className='main'>
            <div className="nav">
                {!showResult
                    ?
                    <>
                        <div className='title-name'>
                            <p>Nexium</p>
                            <img src={assets.nexium_icon} alt="" />
                        </div>
                    </>
                    : <div className='title-name' >
                            <p>Nexium</p>
                            <img id='logo-nav' src={assets.nexium_icon} alt="" />
                        </div>
                }
                <img src={assets.user_icon} alt="" />

            </div>
            <div className="main-container">

                {!showResult
                    ?
                    <>
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
                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img className='nexium_icon' src={assets.nexium_icon} alt="" />
                            {loading
                                ? <div className='loader'>
                                    <hr className='1' />
                                    <hr className='2' />
                                    <hr className='3' />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Ask Nexium' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img className='sendIcon' onClick={() => {
                                onSent();
                                setInput("");
                            }} src={assets.send_icon} alt="" />
                                : null
                            }
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