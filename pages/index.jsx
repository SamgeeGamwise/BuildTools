import React from 'react'
import Navbar from '../components/Navbar/index'
import HeadComp from "../components/HeadComp/index"

export default function Home() {
  return (
    <>
      <HeadComp title="Home" />
      <Navbar />
      <div className="container mt-3">
        <div className='row'>
          <div className='col'>   
            <h3>VJT Build Tools</h3>
          </div>
        </div>
      </div>
    </>
  )
}
