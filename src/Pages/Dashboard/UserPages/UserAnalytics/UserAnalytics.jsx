import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import UseParticipant from "../../../../CustomHooks/UseParticipant";
import { AuthContext } from "../../../../Auth/AuthProvider";
import { useContext } from "react";
import { CheckCircle2, Clock3, Users } from "lucide-react";

const COLORS = {
  paid: "#10b981", // emerald-500
  pending: "#f59e0b", // amber-500
};

const RADIAN = Math.PI / 180;

const UserAnalytics = () => {
  // context api
  const { user } = useContext(AuthContext);

  // hooks
  const [participant] = UseParticipant();

  // checking the user
  if (!user) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col justify-center items-center gap-3">
        <span className="loading loading-infinity loading-xl text-teal-600"></span>
        <p className="text-slate-500 font-medium tracking-wide">
          Loading data…
        </p>
      </div>
    );
  }

  const paidCount = participant.filter(
    (p) => p.paymentStatus === "Paid",
  ).length;
  const pendingCount = participant.filter(
    (p) => p.paymentStatus === "pay",
  ).length;
  const total = paidCount + pendingCount;

  const pieChartData = [
    { name: "Paid", value: paidCount, color: COLORS.paid },
    { name: "Pending Payment", value: pendingCount, color: COLORS.pending },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    if (!percent) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={13}
        fontWeight={600}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            {user.displayName}&#39;s Analytics
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            A snapshot of your camp participants&#39; payment status
          </p>
        </div>

        <div className="bg-CPC-sky rounded-2xl shadow-md border border-slate-100 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Pie chart */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="w-full max-w-[280px] aspect-square">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={total > 0 ? 3 : 0}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "0.75rem",
                        border: "1px solid #e2e8f0",
                        fontSize: "13px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stats + description */}
            <div className="lg:col-span-3 space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 text-center">
                  <Users className="w-4 h-4 text-slate-400 mx-auto mb-1.5" />
                  <p className="text-xl font-bold text-slate-900">{total}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Total</p>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1.5" />
                  <p className="text-xl font-bold text-emerald-700">
                    {paidCount}
                  </p>
                  <p className="text-xs text-emerald-600 mt-0.5">Paid</p>
                </div>
                <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 text-center">
                  <Clock3 className="w-4 h-4 text-amber-600 mx-auto mb-1.5" />
                  <p className="text-xl font-bold text-amber-700">
                    {pendingCount}
                  </p>
                  <p className="text-xs text-amber-600 mt-0.5">Pending</p>
                </div>
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-900 mb-2">
                  Participant status overview
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Track how your camp participants are progressing through
                  registration. The chart above breaks down who&#39;s completed
                  payment and who&#39;s still pending, so you can follow up
                  where it matters and keep your camps on track.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
