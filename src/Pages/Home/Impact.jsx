import { ArrowUp, LineChart, HeartHandshake } from "lucide-react";

const StatCard = ({ children, className = "" }) => (
  <div
    className={`bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 transform hover:-translate-y-1 transition-transform duration-300 ${className}`}
  >
    {children}
  </div>
);

export default function Impact() {
  return (
    <div className="min-h-screen bg-sky-100 font-sans text-gray-800">
      <div className="w-11/12 mx-auto py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <header className="bg-CPC-ocean p-6 sm:p-8 rounded-3xl shadow-xl my-12">
          <div className="flex justify-center items-center gap-1 mb-6">
            {/* logo */}
            <HeartHandshake className="h-10 w-10 mr-2 text-white" />
            <h1 className="text-2xl font-bold text-white sm:text-5xl">
              Carepoint Camp
            </h1>
          </div>
        </header>

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-xl md:text-5xl font-extrabold text-black leading-tight sm:text-3xl xl:text-6xl">
            Fueling company growth
          </h1>
          <p className="font-extrabold mt-1 text-CPC-ocean  sm:text-3xl md:text-5xl xl:text-5xl">
            through mental well-being
          </p>
        </div>

        {/* Stats Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-11 gap-6">
          <StatCard className="xl:col-span-2 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-CPC-ocean">88%</h2>
            <p className="mt-2 text-gray-600 text-left font-medium">
              Of members across race/ethnicities see clinical improvement
            </p>
          </StatCard>

          <StatCard className="xl:col-span-2 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-CPC-ocean">$614k</h2>
            <p className="mt-2 text-gray-600 text-left font-medium">
              Healthcare savings in 2 years for grater good.
            </p>
          </StatCard>

          <StatCard className="xl:col-span-3 relative overflow-hidden">
            <h2 className="text-5xl text-center font-bold text-CPC-ocean">
              10x
            </h2>
            <p className="mt-1 text-gray-600 font-medium">
              Utilization over traditional EAPs program
            </p>
            {/* Using LineChart icon */}
            <LineChart
              className="absolute bottom-4 right-4 h-20 w-20 text-gray-400/20"
              strokeWidth={1.5}
            />
          </StatCard>

          <StatCard className="xl:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-800">
                Returning customers
              </h3>
              <div className="bg-purple-100 p-2 rounded-full">
                {/* Using ArrowUp icon */}
                <ArrowUp className="h-6 w-6 text-CPC-ocean" />
              </div>
            </div>
            <p className="text-lg text-gray-600">+20 000</p>
            <p className="text-sm text-gray-600 ">
              clients across the United States
            </p>
          </StatCard>

          <StatCard className="xl:col-span-2">
            <h2 className="text-4xl text-center font-bold text-CPC-ocean">
              +600
            </h2>
            <p className="mt-1 text-gray-600 font-medium">
              Certificated therapists in +40 States.
            </p>
          </StatCard>
        </div>
      </div>
    </div>
  );
}
