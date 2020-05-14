import React, { useState, useEffect } from 'react'
import Content from './components/Content'
import loader from "./assets/loader.gif"

function Loading() {
  return (
    <div className="loading-page">
      <img src={loader} alt="loader" />
      <p>loading...</p>
    </div>
  )
}
function IsLoaded() {
  return (
    <div>
      <Content />
    </div>
  )
}

function App() {
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    isLoading(true)
  }, [])
  return (
    <div>
      {loading === true ? <IsLoaded /> : <Loading />}
    </div>
  )
}

export default App