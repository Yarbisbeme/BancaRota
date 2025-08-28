import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {

  const loggedUser = {firstName: 'John', lastName: 'Doe'}

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
      </div>
    </section>
  )
}

export default Home