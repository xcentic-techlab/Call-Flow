import { useNavigate } from "react-router-dom";
import {
  Phone,
  Users,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  RefreshCcw,
} from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatsGrid } from "@/components/StatsGrid";
import { Button } from "@/components/ui/button";
import { Footer } from "./footer";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-0 py-0 space-y-16 pt-24 md:pt-0">
        <div className="relative w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full z-50">
            <DashboardHeader transparent />
          </div>

        <div className="flex flex-col md:flex-row min-h-screen">
          <div className="hidden md:flex flex-1 bg-gray-900 flex-col justify-center items-start px-8 lg:px-20 space-y-6">
            <div className="max-w-xl space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white drop-shadow-lg">
                Manage Your{" "}
                <span className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent">
                  Calls Efficiently
                </span>{" "}
                & Seamlessly
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed">
                Initiate single or bulk calls, manage all your communication from one secure dashboard.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 rounded-full border border-zinc-800 shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-gray-900" />
                  <span className="text-sm text-zinc-900 font-medium">Secure & Reliable</span>
                </div>
                <div className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 rounded-full border border-zinc-800 shadow-sm">
                  <PhoneCall className="h-4 w-4 text-gray-900" />
                  <span className="text-sm text-zinc-900 font-medium">Bulk Calling</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => navigate("/prompts")}
                  size="lg"
                  className="h-14 px-8 text-base font-semibold 
                            bg-gray-200 text-gray-900 rounded-lg 
                            shadow-sm transition-transform duration-300 
                            hover:scale-105 hover:bg-gray-200 hover:text-gray-900 
                            active:scale-95"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Start Calling Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 overflow-hidden min-h-[90vh] md:min-h-0 relative">
            <div className="flex flex-col justify-center items-center text-center px-6 z-10 md:hidden">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900 drop-shadow-lg">
                Manage Your <span className="text-gray-900">Calls Efficiently</span> & Seamlessly
              </h1>

              <p className="text-base sm:text-lg text-gray-900 max-w-md leading-relaxed mt-3">
                Initiate single or bulk calls, monitor call activity, and manage all your communication seamlessly.
              </p>

              <Button
                onClick={() => navigate("/prompts")}
                size="lg"
                className="mt-6 h-12 px-6 text-base font-semibold bg-gray-800 hover:bg-gray-700 
                          text-white shadow-md shadow-gray-900/30 backdrop-blur-sm transition-all"
              >
                <Phone className="mr-2 h-5 w-5" />
                Start Calling
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <img
                src="/assets/dashboard-hero.png"
                alt="Hero girl"
                className="w-[80%] sm:w-[65%] h-auto mt-8 drop-shadow-2xl"
              />
            </div>
            <img
              src="/assets/dashboard-hero.png"
              alt="Hero girl"
              className="hidden md:block absolute right-[12%] bottom-0 h-auto max-h-[90vh] object-contain scale-110 transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>

        </div>

        <section className="relative z-10 bg-gray-900 py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <StatsGrid />
          </div>
        </section>

       <section className="relative z-10 bg-gray-900 py-10 md:py-14 px-4 md:px-8">
        <div className="text-center space-y-3 mb-10">
          <h3 className="text-3xl md:text-4xl font-bold">
            Why Choose <span className="text-white">CallFlow?</span>
          </h3>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            Smart, secure, and scalable calling platform for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: Phone,
              title: "One-Click Calling",
              desc: "Initiate instant calls directly from your dashboard with just one click. No manual dialing required.",
            },
            {
              icon: Users,
              title: "Bulk Calling Automation",
              desc: "Upload Excel files to trigger multiple calls automatically — perfect for campaigns and surveys.",
            },
            {
              icon: RefreshCcw,
              title: "Smart Follow-ups",
              desc: "Automatically send reminders and follow-up calls to improve response rates and customer satisfaction.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-500/40 transition-all text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gray-500/10 flex items-center justify-center mb-6 transition-all">
                  <Icon className="h-6 w-6 text-gray-300 flex-shrink-0" />
                </div>

                <h4 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>


      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
