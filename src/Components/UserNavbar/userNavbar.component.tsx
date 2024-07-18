import { useState } from "react"
import LogoIcon from "../../Assets/brandIcon.png"

export const UserNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"
  }


  return (
    <div>
  <nav className="bg-gray-800">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* Mobile menu button*/}
          <button type="button" onClick={toggleMobileMenu} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen ? "true" : "false"}>
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
            {/* Icon when menu is closed. Menu open: "hidden", Menu closed: "block" */}
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            {/* Icon when menu is open. Menu open: "block", Menu closed: "hidden" */}
            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <img className="h-10 w-auto" src={LogoIcon} alt="Your Company"/>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <a href="#" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Products</a>
              <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Favorites</a>
              {(() => {
                const user = localStorage.getItem("user");
                const userDetails = user ? JSON.parse(user) : null;

                if (!userDetails) {
                  return null;
                }

                return (
                  <>
                    {userDetails.role === "ADMIN" && (
                      <a href="/admin" className="rounded-md px-3 py-2 text-sm font-medium text-orange-700 bg-gray-200 hover:bg-orange-700 hover:text-white">Admin Panel</a>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">ViewCart</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </button>

          {/* Profile dropdown */}
          {localStorage.getItem("user") ? (
  <div className="relative ml-3">
    <div>
      <button type="button" onClick={toggleDropdown} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
        <span className="absolute -inset-1.5"></span>
        <span className="sr-only">Open user menu</span>
        <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
      </button>
    </div>

    {isDropdownOpen && (
  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
    <a href="/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1}>Account</a>
    {localStorage.getItem("role") === "admin" && (
      <a href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1}>Admin Panel</a>
    )}
    <button onClick={handleLogout}>
      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1}>
        Sign Out
      </a>
    </button>
  </div>
)}
  </div>
) : (
  <button type="button" className="relative ml-3 flex rounded-md bg-orange-400 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2">
    <span className="sr-only">Sign in</span>
    <a href="/auth/signup">Sign Up</a>
  </button>
)}
        </div>
      </div>
    </div>

    {/* Mobile menu, show/hide based on menu state. */}
    {isMobileMenuOpen && (
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
        <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Products</a>
        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Favorites</a>
        {(() => {
                const user = localStorage.getItem("user");
                const userDetails = user ? JSON.parse(user) : null;

                if (!userDetails) {
                  return null;
                }

                return (
                  <div className="mt-5">
                    {userDetails.role === "ADMIN" && (
                      <a href="/admin" className="rounded-md px-3 py-2 text-sm font-medium text-orange-700 bg-gray-200 hover:bg-orange-700 hover:text-white mt-3">Admin Panel</a>
                    )}
                  </div>
                );
              })()}
        </div>
      </div>
    )}
  </nav>
</div>
  )
}

export default UserNavbar
