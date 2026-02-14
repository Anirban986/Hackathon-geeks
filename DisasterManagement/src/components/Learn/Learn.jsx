import React from 'react'
import './learn.css'
import achievement from '../../assets/achievement.svg'
import trophy from '../../assets/trophy.svg'
import clock from '../../assets/clock.svg'
import LearningNav from '../learning-folder/learning-nav/LearningNav'
import ChatbotPopup from '../chatbot/ChatbotPopup';
import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
function Learn() {
  const [showBot, setShowBot] = useState(false)
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className='learn'>
      <div className="learning-top-login">
        <div className="learning-top-login-seg1">
          <h1>Know Your Rights</h1>
          <p>Learn Indian Constitution, Fundamental Rights & Legal Awareness</p>
        </div>
        <div className='disastrabot'>
          <div onClick={() => setShowBot(true)} className="chatbot-trigger">
            Ai Chatbot
          </div>
          {showBot && <ChatbotPopup onClose={() => setShowBot(false)} />}

        </div>

      </div>

     { /*<div className="learning-top-blocks">


        <div className="learning-top-block">
          <div className="learning-top-block-img">
            <img src={achievement} alt="" />
          </div>
          <div className="learning-top-block-texts">
            <p>Completed Modules</p>
            <h1>1/6</h1>
          </div>
        </div>

        <div className="learning-top-block">
          <div className="learning-top-block-img">
            <img src={trophy} alt="" />
          </div>
          <div className="learning-top-block-texts">
            <p>Overall Progress</p>
            <h1>31%</h1>
          </div>
        </div>




        <div className="learning-top-block">
          <div className="learning-top-block-img">
            <img src={clock} alt="" />
          </div>
          <div className="learning-top-block-texts">
            <p>Learning Hours</p>
            <h1>1h</h1>
          </div>
        </div>

      </div>*/}

      <LearningNav />


    </motion.div>
  )
}

export default Learn