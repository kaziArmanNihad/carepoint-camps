function JoinCamp() {
  return (
    <div className="bg-sky-100 w-full min-h-screen">
      <div className="w-11/12 mx-auto py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* left card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center justify-between overflow-hidden">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">For Patients</h3>
              <p className="text-gray-500">
                Find upcoming medical camps and access free health services.
              </p>
              <p className="text-gray-500">
                Our team is committed to ensuring that every patient receives
                compassionate care, timely medical attention, and guidance on
                maintaining long-term wellness.
              </p>
              <button
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-transform transform hover:scale-105 bg-CPC-ocean hover:bg-purple-700`}
              >
                Find a Camp
              </button>
            </div>
            <div className="hidden sm:block">
              <svg
                width="180"
                height="140"
                viewBox="0 0 180 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform translate-x-10 -translate-y-4"
              >
                <rect
                  x="70"
                  y="100"
                  width="80"
                  height="40"
                  rx="8"
                  fill="#DDD6FE"
                />
                <path
                  d="M108 34C108 22.9543 116.954 14 128 14V14C139.046 14 148 22.9543 148 34V82C148 93.0457 139.046 102 128 102H90C78.9543 102 70 93.0457 70 82V64.5C70 54.835 77.835 47 87.5 47H108V34Z"
                  fill="#A78BFA"
                />
                <path
                  d="M109 46H87.5C78.3726 46 71 53.3726 71 62.5V82C71 92.4772 79.5228 101 90 101H128C138.477 101 147 92.4772 147 82V34C147 23.5228 138.477 15 128 15C117.523 15 109 23.5228 109 34V46Z"
                  stroke="#4C1D95"
                  strokeWidth="2"
                />
                <rect
                  x="30"
                  y="90"
                  width="60"
                  height="50"
                  rx="8"
                  fill="#C4B5FD"
                />
              </svg>
            </div>
          </div>

          {/* right card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center justify-between overflow-hidden">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">
                For Volunteers
              </h3>
              <p className="text-gray-500">
                Join our team of professionals to make a difference in the
                community.
              </p>
              <p className="text-gray-500">
                Whether you are a healthcare worker, student, or someone
                passionate about service, and the chance to directly impact
                lives.
              </p>
              <button
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-transform transform hover:scale-105 bg-gray-700 hover:bg-gray-800`}
              >
                Register to Help
              </button>
            </div>
            <div className="hidden sm:block">
              <svg
                width="180"
                height="140"
                viewBox="0 0 180 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform translate-x-10 -translate-y-4"
              >
                <rect
                  x="100"
                  y="110"
                  width="40"
                  height="30"
                  rx="8"
                  fill="#9CA3AF"
                />
                <rect
                  x="145"
                  y="110"
                  width="15"
                  height="15"
                  rx="7.5"
                  fill="#9CA3AF"
                />
                <path
                  d="M108 34C108 22.9543 116.954 14 128 14V14C139.046 14 148 22.9543 148 34V82C148 93.0457 139.046 102 128 102H90C78.9543 102 70 93.0457 70 82V64.5C70 54.835 77.835 47 87.5 47H108V34Z"
                  fill="#6B7280"
                />
                <path
                  d="M109 46H87.5C78.3726 46 71 53.3726 71 62.5V82C71 92.4772 79.5228 101 90 101H128C138.477 101 147 92.4772 147 82V34C147 23.5228 138.477 15 128 15C117.523 15 109 23.5228 109 34V46Z"
                  stroke="#1F2937"
                  strokeWidth="2"
                />
                <rect
                  x="40"
                  y="90"
                  width="80"
                  height="50"
                  rx="8"
                  fill="#D1D5DB"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinCamp;
