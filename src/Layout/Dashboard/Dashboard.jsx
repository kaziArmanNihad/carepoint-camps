import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import UseAdmin from "../../CustomHooks/UseAdmin";
import {
  MdAddBusiness,
  MdAnalytics,
  MdDashboard,
  MdHomeWork,
  MdOutlineMedicalInformation,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { GiCampingTent } from "react-icons/gi";
import { FaMoneyCheckAlt, FaUsers, FaUserShield } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { FaHouseMedical } from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { LogOut, User } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Auth/AuthProvider";

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-150 ${
    isActive
      ? "bg-teal-50 text-teal-700 font-medium border border-teal-100"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
  }`;

const Dashboard = () => {
  const [isAdmin] = UseAdmin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleNavClick = () => {
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  // Handle Logout
  const handleLogout = () => {
    logoutUser().then(() => {
      // navigating the user
      navigate("/");

      // showing an alert
      toast.success("Logout successfull");
    });
  };

  useEffect(() => {
    if (isSidebarOpen) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
    return () => clearAllBodyScrollLocks(document.body);
  }, [isSidebarOpen]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-poppins">
      {/* Mobile top bar (single instance) */}
      <div className="md:hidden sticky top-0 z-30 flex items-center gap-3 bg-white border-b border-slate-400 text-slate-800 px-4 py-3 shadow-sm">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          {isSidebarOpen ? (
            <MdClose className="w-5 h-5" />
          ) : (
            <MdMenu className="w-5 h-5" />
          )}
        </button>
        <h1 className="font-semibold tracking-tight">
          Carepoint <span className="text-teal-600">Camp</span>
        </h1>
      </div>

      {/* Backdrop overlay (mobile only, shown when sidebar is open) */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          aria-hidden="true"
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-[1px] z-20"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-72 md:w-64 min-h-screen bg-white text-slate-700 z-30
          border-r border-slate-300 shadow-md md:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Sidebar header (desktop only, mobile has its own top bar above) */}
        <div className="hidden md:flex items-center px-5 py-5 border-b border-slate-200">
          <h1 className="font-semibold text-lg tracking-tight text-slate-800">
            Carepoint <span className="text-teal-600">Camp</span>
          </h1>
        </div>

        <ul className="p-4 space-y-1 overflow-y-auto">
          {isAdmin ? (
            <>
              <li onClick={handleNavClick}>
                <NavLink
                  to="/dashboard/organizerProfile"
                  className={navLinkClass}
                >
                  <FaUserShield className="w-5 h-5 shrink-0" />
                  <span>Organizer Profile</span>
                </NavLink>
              </li>
              <li onClick={handleNavClick}>
                <NavLink to="/dashboard/AllUsers" className={navLinkClass}>
                  <FaUsers className="w-5 h-5 shrink-0" />
                  <span>All Users</span>
                </NavLink>
              </li>
              <li onClick={handleNavClick}>
                <NavLink to="/dashboard/addACamp" className={navLinkClass}>
                  <MdAddBusiness className="w-5 h-5 shrink-0" />
                  <span>Add A Camp</span>
                </NavLink>
              </li>
              <li onClick={handleNavClick}>
                <NavLink to="/dashboard/manageCamps" className={navLinkClass}>
                  <MdHomeWork className="w-5 h-5 shrink-0" />
                  <span>Manage Camps</span>
                </NavLink>
              </li>
              <li onClick={handleNavClick}>
                <NavLink
                  to="/dashboard/manageRegisteredCamps"
                  className={navLinkClass}
                >
                  <BsPersonWorkspace className="w-5 h-5 shrink-0" />
                  <span>Manage Reg. Camps</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li onClick={handleNavClick}>
                <NavLink to="/dashboard/profile" className={navLinkClass}>
                  <User className="w-5 h-5 shrink-0" />
                  <span>Profile</span>
                </NavLink>
              </li>
              <li onClick={handleNavClick}>
                <NavLink to="/dashboard/userAnalytics" className={navLinkClass}>
                  <MdAnalytics className="w-5 h-5 shrink-0" />
                  <span>Analytics</span>
                </NavLink>
              </li>
              <li onClick={handleNavClick}>
                <NavLink
                  to="/dashboard/ParticipantInformations"
                  className={navLinkClass}
                >
                  <MdOutlineMedicalInformation className="w-5 h-5 shrink-0" />
                  <span>Participant Informations</span>
                </NavLink>
              </li>
              <li onClick={handleNavClick}>
                <NavLink
                  to="/dashboard/userRequiestedCamps"
                  className={navLinkClass}
                >
                  <GiCampingTent className="w-5 h-5 shrink-0" />
                  <span>Requested Camps</span>
                </NavLink>
              </li>
              <li onClick={handleNavClick}>
                <NavLink
                  to="/dashboard/userPaymentHistory"
                  className={navLinkClass}
                >
                  <FaMoneyCheckAlt className="w-5 h-5 shrink-0" />
                  <span>Payment History</span>
                </NavLink>
              </li>
            </>
          )}

          <li className="!mt-4 !mb-3 border-t border-slate-300" />

          <li onClick={handleNavClick}>
            <NavLink
              to="/dashboard/dashboardInterface"
              className={navLinkClass}
            >
              <MdDashboard className="w-5 h-5 shrink-0" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/" className={navLinkClass}>
              <IoMdHome className="w-5 h-5 shrink-0" />
              <span>Home</span>
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/availableCamps" className={navLinkClass}>
              <FaHouseMedical className="w-5 h-5 shrink-0" />
              <span>Available Camps</span>
            </NavLink>
          </li>
          <li onClick={handleLogout}>
            <NavLink
              to="/availableCamps"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-150 text-red-500 hover:bg-red-50 hover:text-red-600 border border-transparent"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
