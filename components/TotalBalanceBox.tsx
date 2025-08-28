
import React from 'react'
import AnimatedCounter from './AnimatedCounter'
import DoughnotChart from './DoughnotChart'

const TotalBalanceBox = ({
  accounts = [],
  totalCurrentBalance,
  totalBanks
}: TotlaBalanceBoxProps) => {
  return (
    <section className='total-balance'>
      <div className="total-balance-chart">
        <DoughnotChart accounts={accounts}/>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="header-2">
          Banks Account: {totalBanks} 
        </h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">
            Total Current Balance
          </p>
          <span className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance}/>
          </span>
        </div>
      </div>
    </section >
  )
}

export default TotalBalanceBox