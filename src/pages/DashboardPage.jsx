import React, { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FaTachometerAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import ProjectSubmissionButton from "../components/ProjectForm";
import ProjectBrowser from "../components/ProjectBrowser";

const NAVIGATION = [{ id: 1, label: "Dashboard", icon: <FaTachometerAlt /> }];

function DemoPageContent({ activePage }) {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 chill">{activePage}</h1>
      <div className="text-gray-600 space-y-4">
        <ProjectSubmissionButton />
        <ProjectBrowser />
        <p>
          {activePage === "Dashboard"
            ? "Welcome to your dashboard! Manage your activities here."
            : "Here are your orders and their statuses."}
        </p>
      </div>
    </div>
  );
}

DemoPageContent.propTypes = {
  activePage: PropTypes.string.isRequired,
};

function DashboardLayoutAccount() {
  const { user, signOutFromApp } = useAuth();
  const [activePage, setActivePage] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const session = useMemo(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return { user: JSON.parse(storedUser) };
    }
    return user
      ? { user }
      : {
          user: {
            name: "Guest",
            email: "guest@example.com",
            image: "https://via.placeholder.com/150",
          },
        };
  }, [user]);

  useEffect(() => {
    if (session.user && session.user.name !== "Guest") {
      localStorage.setItem("user", JSON.stringify(session.user));
    }
  }, [session.user]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    signOutFromApp();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full lg:h-auto 
          w-64 lg:w-64 bg-green-700 text-white 
          transform transition-transform duration-300 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 z-40 flex-shrink-0 overflow-y-auto
          shadow-lg
        `}
      >
        <div className="p-4 clash text-center font-medium text-xl border-b border-green-800">
          My Dashboard
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {NAVIGATION.map((item) => (
              <li
                key={item.id}
                className={`
                  flex items-center gap-3 p-3 rounded-lg cursor-pointer 
                  ${
                    activePage === item.label
                      ? "bg-green-800"
                      : "hover:bg-green-800"
                  }
                `}
                onClick={() => {
                  setActivePage(item.label);
                  setIsSidebarOpen(false);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={handleSignOut}
          className="w-[calc(100%-2rem)] mx-4 mb-4 p-3 bg-red-600 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
        >
          <FaSignOutAlt />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:ml-0">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold clash">
              Welcome, {session.user.name || "Guest"}!
            </h2>
            
          </div>
          <img
            src={session.user.image}
            alt="User Avatar"
            className="w-12 h-12 rounded-full border border-gray-300"
          />
        </div>
        <DemoPageContent activePage={activePage} />
      </main>
    </div>
  );
}

DashboardLayoutAccount.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccount;