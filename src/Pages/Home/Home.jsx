import Promotion from "./Promotion";
import Specialists from "./Specialists";
import Hero from "./Hero";
import Impact from "./Impact";
import Service from "./Service";
import DiscountedServices from "./DiscountedServices";
import Banner from "./Banner";
import Team from "./Team";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <Impact />
      <DiscountedServices />
      <Promotion />
      <Service />
      <Specialists />
      <Banner />
      <Team />
      <Testimonials />
    </div>
  );
};

export default Home;
