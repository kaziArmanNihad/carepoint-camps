import { Link } from "react-router-dom";
import UsePrimaryBtn from "../../CustomHooks/UsePrimaryBtn";
import Marquee from "react-fast-marquee";

const NotFound = () => {
  return (
    <section className="bg-black w-full h-screen flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-lg text-center">
        {/* Error Code */}
        <h1 className="mb-4 text-6xl sm:text-7xl lg:text-9xl tracking-tight font-extrabold text-blue-700">
          404
        </h1>

        {/* Main Error Message */}
        <p className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Something&#39;s missing.
        </p>

        {/* Marquee Scrolling Text */}
        <Marquee pauseOnHover={true} speed={80} gradient={false}>
          <p className="my-10 text-xl sm:text-2xl lg:text-4xl text-white">
            Sorry, we can&#39;t find that page. You&#39;ll find lots to explore
            on the home page.
          </p>
        </Marquee>

        {/* Back to Homepage Button */}
        <Link to="/">
          <UsePrimaryBtn isCancel={true}>Back to Homepage</UsePrimaryBtn>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
