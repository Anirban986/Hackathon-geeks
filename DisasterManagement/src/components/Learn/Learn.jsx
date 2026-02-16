import React from 'react'
import './learn.css'
import Pdfsummerizer from '../PdfSummerizer/Pdfsummerizer'
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

     
      <LearningNav />
      <Pdfsummerizer/>

    </motion.div>
  )
}

export default Learn