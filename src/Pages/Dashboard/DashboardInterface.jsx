import { Link } from "react-router-dom";
import DashboardAnimation from "../../CustomHooks/DashboardAnimation";
import UseAdmin from "../../CustomHooks/UseAdmin";
import UsePrimaryBtn from "../../CustomHooks/UsePrimaryBtn";
import UseShineBtn from "../../CustomHooks/UseShineBtn";

const DashboardInterface = () => {
  const [isAdmin, isAdminLoading] = UseAdmin();

  if (isAdminLoading) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex justify-center items-center flex-col gap-4">
        <span className="loading loading-infinity loading-xl text-teal-600"></span>
        <h1 className="text-lg font-medium text-slate-600">Loading Data...</h1>
        <Link to="/">
          <UsePrimaryBtn isCancel={true}>Back to Home Page</UsePrimaryBtn>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4">
      <div className="w-full md:w-4/5 mx-auto">
        <h1 className="text-2xl xl:text-4xl font-bold text-slate-900 text-center">
          Dashboard Interface
        </h1>

        {/* main content */}
        <div className="w-full flex flex-col justify-center items-center gap-10 mt-8">
          <div className="w-full bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8">
            <div className="flex flex-col xl:flex-row items-center gap-6 xl:gap-10">
              <div className="w-full xl:w-2/3">
                {/* content based on userRole */}
                {isAdmin ? (
                  <div className="admin-section space-y-3">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Welcome, <span className="text-teal-600">Admin!</span>
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      At Carepoint Camps, you&#39;re at the heart of making a
                      real impact. As an admin, you have the tools to oversee
                      the organization and management of medical camps that
                      bring essential healthcare services to communities in
                      need. From coordinating volunteers to managing camp
                      details, this dashboard empowers you to ensure each camp
                      runs smoothly and reaches those who need it most. Use your
                      insights and leadership to keep our mission alive because
                      every camp you manage helps change lives.
                    </p>
                  </div>
                ) : (
                  <div className="user-section space-y-3">
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                      Welcome to{" "}
                      <span className="text-teal-600">Carepoint Camps!</span>
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      We&#39;re glad to have you here. At Carepoint Camps, you
                      have the opportunity to make a difference by participating
                      in medical camps designed to bring care to those who need
                      it most. Through your dashboard, you can explore upcoming
                      camps, register for events, and track your involvement in
                      making healthcare accessible. Whether it&#39;s your first
                      time or you&#39;re a returning participant, we&#39;re
                      excited to have you as part of our community. Let&#39;s
                      work together to create a healthier tomorrow!
                    </p>
                  </div>
                )}
              </div>
              <div className="w-full xl:w-1/3 flex justify-center items-center">
                <DashboardAnimation />
              </div>
            </div>
          </div>

          <div className="w-full">
            <UseShineBtn className="w-full text-sm text-left font-bold sm:text-center sm:text-base lg:text-2xl xl:text-5xl">
              Ready To Explore the Dashboard
            </UseShineBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInterface;
