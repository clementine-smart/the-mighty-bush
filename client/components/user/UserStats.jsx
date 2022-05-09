import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  getAmountOfTracksCompleted,
  getDistanceHiked,
  getRanks,
} from './userHelper'

function UserStats({ user }) {
  const tracks = useSelector((state) => state.tracks)
  const [tracksCompleted, setTracksCompleted] = useState(0)
  const [distanceHiked, setDistanceHiked] = useState(0)
  const [rankPercent, setRankPercent] = useState(0)
  const nextLevel = 4000

  useEffect(() => {
    setTracksCompleted(getAmountOfTracksCompleted(tracks))
    setDistanceHiked(getDistanceHiked(tracks))
    setRankPercent((user.xp / nextLevel) * 100)
  }, [tracks])

  useEffect(() => {
    getRanks()
      .then((ranks) => {
        console.log(ranks)
        return ranks
      })
      .catch((err) => console.log(err))
  }, [user.xp])

  return (
    <>
      <div className="stats-container">
        <div className="stat-info">
          <span className="stat-rectangle">
            <img src="/icons/trophy.svg" alt="" className="stat-icon" />
            <div className="stat-description">Hiking level</div>
            <div className="user-stat">{user.rank}</div>
          </span>
        </div>
        <div className="stat-info">
          <span className="stat-rectangle">
            <img src="/icons/hiker.svg" alt="" className="stat-icon" />
            <div className="stat-description">Tracks Hiked</div>
            <div className="user-stat">{tracksCompleted}</div>
          </span>
        </div>
        <div className="stat-info">
          <span className="stat-rectangle">
            <img src="/icons/compass.svg" alt="" className="stat-icon" />
            <div className="stat-description">Distance Hiked</div>
            <div className="user-stat">{distanceHiked}km</div>
          </span>
        </div>
      </div>
      <div className="xp-container">
        <div className="xp-top">
          <p className="total-xp-text">Total XP</p>
          <p>Next Level 20</p>
        </div>
        <div className="xp-bar-container">
          <div
            className="xp-bar"
            style={{
              width: `${rankPercent}%`,
            }}
          ></div>
        </div>
        <div className="xp-bottom">
          <p>2100 / 2700 XP</p>
        </div>
      </div>
    </>
  )
}

export default UserStats
