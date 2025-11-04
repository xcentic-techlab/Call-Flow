import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex flex-col md:flex-row bg-gray-800 border border-gray-600 rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full m-4">
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-900/40">
          <img
            src="/assets/2.png"
            alt="Auth Visual"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center items-center text-center">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-white mb-3">
              Welcome to CallFlow
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-xs mx-auto">
              Seamlessly manage your calls and stay connected with your clients —
              all in one simple, powerful platform.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Link to="/auth/signin">
              <Button className="w-full h-12 bg-gray-200 text-gray-900 font-semibold text-base hover:bg-gray-200">
                Sign In
              </Button>
            </Link>

            <Link to="/auth/signup">
              <Button
                variant="outline"
                className="w-full h-12 bg-transparent border border-gray-400 text-gray-200 font-semibold text-base hover:bg-transparent hover:border-gray-500"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
