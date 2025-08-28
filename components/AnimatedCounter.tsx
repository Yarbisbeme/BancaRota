'use client'

import CountUp from 'react-countup'

const AnimatedCounter = ({amount}: {amount: number}) => {
  return (
    <div className="w-full">
        <CountUp 
            end={amount} 
            duration={1}
            prefix='$'
            decimal='.'
            decimals={2}
            separator=','
        />
    </div>
  )
}

export default AnimatedCounter