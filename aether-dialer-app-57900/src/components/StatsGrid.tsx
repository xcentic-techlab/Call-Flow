import { Users, Phone, Clock, TrendingUp } from "lucide-react";

const stats = [
  { label: "Active Users", value: "12", icon: Users },
  { label: "Calls Today", value: "4", icon: Phone },
  { label: "Avg Duration", value: "4:32", icon: Clock },
  { label: "Growth", value: "+12.5%", icon: TrendingUp },
];

export const StatsGrid = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10">
        <span className="bg-gradient-to-r text-white bg-clip-text text-transparent">
          CallFlow at a
        </span>{" "}
        <span className="text-white">Glance</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
                className="relative group bg-gray-800 border border-zinc-800 rounded-2xl p-6 sm:p-7 
                backdrop-blur-md transition-all duration-300 
              hover:border-gray-500/50">

  <div className="relative z-10 flex flex-col justify-between h-full space-y-5">
    <div className="flex items-center justify-between">
      <div className="p-3 rounded-xl bg-gradient-to-br from-gray-500/10 to-indigo-500/10 border border-zinc-800">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-gray-400" />
      </div>
      <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
        {stat.value}
      </span>
    </div>

    <p className="text-base sm:text-lg font-medium text-white">
      {stat.label}
    </p>
  </div>
</div>

          );
        })}
      </div>
    </section>
  );
};
