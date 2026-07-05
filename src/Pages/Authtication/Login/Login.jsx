import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthProvider";
import { useContext } from "react";
import toast from "react-hot-toast";
import { HeartHandshake, LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Context api
  const { loginUser, googleAuthintication, githubAuthintication } =
    useContext(AuthContext);

  // using useForm hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Login with Email
  const onSubmit = (data) => {
    loginUser(data.email, data.password).then(() => {
      // showing alert and reseting the form
      reset();

      // navigating the user
      const redirectTo = location?.state?.from || "/";
      navigate(redirectTo);

      // showing an alert
      toast.success("LoggedIn successfully");
    });
  };

  // Login with Google
  const handleGoogleLogin = () => {
    googleAuthintication().then(() => {
      // navigating the user
      const redirectTo = location?.state?.from || "/";
      navigate(redirectTo);

      // showing alert and reseting the form
      reset();

      // showing an alert
      toast.success("LoggedIn successfully");
    });
  };

  // Login with Github
  const handleGithubLogin = () => {
    githubAuthintication().then(() => {
      // navigating the user
      const redirectTo = location?.state?.from || "/";
      navigate(redirectTo);

      // showing alert and reseting the form
      reset();

      // showing an alert
      toast.success("LoggedIn successfully");
    });
  };

  // sound wave graphic.
  const SoundWave = () => (
    <div className="flex items-end space-x-1 h-20 w-full overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="bg-[#83c5be] opacity-50 w-1 rounded-t-full"
          style={{ height: `${Math.sin(i * 0.4) * 45 + 50}%` }}
        ></div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center py-20">
      <div className="w-11/12 mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Form Side */}
        <div className="w-full md:w-1/2 p-4 sm:p-12 bg-[#edf6f9]">
          {/* Top Navigation */}
          <div className="flex items-center justify-start space-x-6">
            <Link to="/register">
              <button className="flex items-center space-x-2 text-[#006d77] font-semibold hover:opacity-80 transition-opacity">
                <LogIn />
                <span>Register</span>
              </button>
            </Link>
          </div>

          {/* Login Form */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-[#006d77]">Login</h2>
            <p className="text-gray-500 mt-2">Access your account</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700"
                >
                  E-mail address:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="w-full mt-2 px-4 py-3 bg-white border border-gray-200 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#83c5be] transition"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full mt-2 px-4 py-3 bg-white border border-gray-200 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#83c5be] transition"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#006d77] hover:bg-opacity-90 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006d77]"
              >
                LOGIN
              </button>

              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-sm text-gray-500">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-CPC-ocean hover:text-CPC-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#83c5be] transition"
                >
                  <FcGoogle size={25} />
                  <span className="ml-2">Google</span>
                </button>
                <button
                  type="button"
                  onClick={handleGithubLogin}
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-CPC-ocean hover:text-CPC-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#83c5be] transition"
                >
                  <VscGithubInverted size={25} />
                  <span className="ml-2">GitHub</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Branding */}
        <div className="hidden md:flex w-full md:w-1/2 bg-[#006d77] text-[#edf6f9] p-8 sm:p-12 flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center">
              <HeartHandshake className="h-10 w-10 mr-2 text-white" />
              <h1 className="font-extrabold md:text-2xl lg:text-3xl xl:text-4xl">
                Carepoint Camp
              </h1>
            </div>
            <div className="mt-16 sm:mt-24">
              <h1 className="text-2xl lg:text-3xl font-extrabold leading-tight">
                Welcome Back to Carepoint Camp
              </h1>
              <p className="mt-4 text-[#83c5be] text-lg">
                Log in to access your health dashboard, manage appointments, and
                continue your journey to better health.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <SoundWave />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
