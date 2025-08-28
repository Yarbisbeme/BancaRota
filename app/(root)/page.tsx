import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/SideBar/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {

  const loggedUser = {
    firstName: 'Yarbis',
    lastName: 'Beltre',
    email: 'yarbisbeme@gamil.com',
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedUser?.firstName || 'Guest'}
            subtext="Access and manage your bank accounts easily."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.90}
          />

        </header>
        Content
      </div>
      <RightSidebar 
        user={loggedUser}
        transactions={[]}
        banks={[{currentBalance: 500.20}, {currentBalance: 750.70}]}
      />
    </section>
  )
}

export default Home