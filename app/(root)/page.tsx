import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/SideBar/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getUser } from '@/lib/Actions';

const Home = async () => {
  
  const loggedIn = await getUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

        </header>
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[]}
      />
    </section>
  )
}

export default Home