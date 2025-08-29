"use client";

import { useEffect, useState } from "react";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/SideBar/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { account } from "@/lib/appwrite";

const Home = () => {

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedUser?.firstName || "Guest"}
            subtext="Access and manage your bank accounts easily."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.9}
          />
        </header>

        Content
      </div>

      <RightSidebar
        user={loggedUser || { email: "guest@demo.com" }}
        transactions={[]}
        banks={[{ currentBalance: 500.2 }, { currentBalance: 750.7 }]}
      />
    </section>
  );
};

export default Home;
