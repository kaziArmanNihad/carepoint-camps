import { Link } from "react-router-dom";
import UsePrimaryBtn from "../../CustomHooks/UsePrimaryBtn";
import { MdOutlineSearchOff } from "react-icons/md";

const NotFound = () => {
  return (
    <section className="bg-slate-50 w-full min-h-screen flex justify-center items-center px-4">
      <div className="py-10 px-6 md:px-10 mx-auto max-w-screen-md w-full text-center bg-white rounded-2xl shadow-md border border-slate-100">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center">
            <MdOutlineSearchOff className="w-8 h-8 text-teal-600" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="mb-3 text-6xl sm:text-7xl lg:text-8xl tracking-tight font-extrabold text-teal-600">
          404
        </h1>

        {/* Main Error Message */}
        <p className="mb-6 text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800">
          Something&#39;s missing.
        </p>

        {/* Back to Homepage Button */}
        <Link to="/">
          <UsePrimaryBtn isCancel={true}>Back to Homepage</UsePrimaryBtn>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
