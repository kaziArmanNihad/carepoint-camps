import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import UseParticipant from "../../../../CustomHooks/UseParticipant";
import { AuthContext } from "../../../../Auth/AuthProvider";
import { useContext } from "react";
import { CheckCircle2, Clock3, Users, TrendingUp } from "lucide-react";

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
  const completionRate = total > 0 ? Math.round((paidCount / total) * 100) : 0;

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

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8">
          {total === 0 ? (
            /* Empty state — no participants registered yet */
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-slate-400" />
              </div>
              <h2 className="text-base font-semibold text-slate-800">
                No participants yet
              </h2>
              <p className="text-slate-500 text-sm mt-1 max-w-sm">
                Once people register for your camps, their payment status will
                show up here.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                {/* Pie chart */}
                <div className="lg:col-span-2 flex flex-col items-center">
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
                          paddingAngle={3}
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

                  {/* Legend */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: COLORS.paid }}
                      />
                      <span className="text-xs text-slate-500">Paid</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: COLORS.pending }}
                      />
                      <span className="text-xs text-slate-500">Pending</span>
                    </div>
                  </div>
                </div>

                {/* Stats + description */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-slate-200 border border-slate-100 p-4 text-center">
                      <Users className="w-4 h-4 text-slate-400 mx-auto mb-1.5" />
                      <p className="text-xl font-bold text-slate-900">
                        {total}
                      </p>
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

                  {/* Completion rate bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                        <span className="text-xs font-medium text-slate-600">
                          Payment completion rate
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        {completionRate}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-slate-900 mb-2">
                      Participant status overview
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Track how your camp participants are progressing through
                      registration. The chart above breaks down who&#39;s
                      completed payment and who&#39;s still pending, so you can
                      follow up where it matters and keep your camps on track.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
