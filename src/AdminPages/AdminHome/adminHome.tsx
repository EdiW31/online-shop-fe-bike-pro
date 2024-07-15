import React from 'react'
import AdminNavbar from '../../Components/AdminNavbar/navbar.component'
import AdminCards from '../../Components/Cards/adminCards'
import UsersDashboard from '../../Components/AdminUsersDashboard/adminUsersDashboard.component'

const AdminHome = () => {
    return (
      <main className="w-full h-screen flex flex-row">
        <div className="sticky top-0 left-0">
          <AdminNavbar />
        </div>
        <section className="flex flex-col p-10 ml-20 w-full gap-5">
          <h1 className="text-4xl text-neutral-200">Admin Dashboard</h1>
          <AdminCards />
          <div className="w-full hidden lg:block">
            <UsersDashboard />
          </div>
        </section>
      </main>
    )
  }

export default AdminHome