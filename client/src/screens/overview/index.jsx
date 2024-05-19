import React from 'react'
import useFetchOverview from '../../state/useFetchOverview'

const Overview = () => {
  const data= useFetchOverview();
 
  return (
    <div>
      Overview
    </div>
  )
}

export default Overview
