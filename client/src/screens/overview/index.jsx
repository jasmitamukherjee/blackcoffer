import React from 'react'
import useFetchOverview from '../../state/useFetchOverview'

const Overview = () => {
  const data= useFetchOverview();
  console.log("data overvew",data)
  console.log("type:",typeof(data))
  return (
    <div>
      Overview
    </div>
  )
}

export default Overview
