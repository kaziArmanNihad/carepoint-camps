import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    id: 1,
    name: "Fatema Akter",
    location: "Char Area Camp, Gaibandha",
    comment:
      "The free check-up was a blessing for my family. The doctors were so kind and patient with my elderly parents. We are truly grateful.",
    rating: 5.0,
  },
  {
    id: 2,
    name: "Rahim Uddin",
    location: "Community Health Fair, Dhaka",
    comment:
      "I received valuable information about nutrition and diabetes management. This camp has motivated me to take better care of my health.",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Ayesha Begum",
    location: "Hill Tracts Clinic, Bandarban",
    comment:
      "Getting access to healthcare is difficult here. This medical camp provided essential medicines and consultations right at our doorstep.",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Haroon Sheikh",
    location: "Senior Citizens Wellness Fair, Rawalpindi",
    comment:
      "Finally, a health camp that understands the needs of the elderly. The blood pressure and bone density tests were very helpful.",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Sarah Miller",
    location: "Gulf Coast Community Camp",
    comment:
      "The vision screening was a huge help. I was diagnosed with glaucoma and referred for affordable treatment. It's life-changing.",
    rating: 5.0,
  },
  {
    id: 6,
    name: "Chris Davis",
    location: "School Health Program, Texas",
    comment:
      "The general health screening for students was very thorough. It's great to see such focus on the well-being of our children.",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Jessica Williams",
    location: "Navajo Nation Outreach",
    comment:
      "The pre-natal care advice and vitamins provided were invaluable for expectant mothers in our remote community.",
    rating: 4.9,
  },
  {
    id: 8,
    name: "Imran Hussain",
    location: "Factory Worker Health Camp, Faisalabad",
    comment:
      "A much-needed initiative for us laborers. The doctors addressed our work-related health issues with great care.",
    rating: 4.8,
  },
  {
    id: 9,
    name: "Nadia Iqbal",
    location: "Post-Flood Relief Camp, Balochistan",
    comment:
      "After the floods, we had nothing. This medical camp was a lifeline, preventing the spread of diseases and providing essential care.",
    rating: 5.0,
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center space-x-1 text-yellow-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
    <span className="font-bold text-slate-700">{rating.toFixed(1)}</span>
  </div>
);

const TestimonialCard = ({ name, location, comment, rating }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 w-full min-h-72 border border-slate-200">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="font-bold text-black text-sm sm:text-base">{name}</h3>
          <p className="text-slate-500 text-xs sm:text-sm">{location}</p>
        </div>
        <StarRating rating={rating} />
      </div>
    </div>
    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
      {comment}
    </p>
  </div>
);

const Testimonials = () => {
  const swiperUpRef = useRef(null);
  const swiperDownRef = useRef(null);

  const handleMouseEnter = (swiperRef) => {
    if (swiperRef.current) swiperRef.current.autoplay.stop();
  };

  const handleMouseLeave = (swiperRef) => {
    if (swiperRef.current) swiperRef.current.autoplay.start();
  };

  return (
    <section className="bg-sky-100 w-full min-h-screen">
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row py-12 md:py-20 gap-8 md:gap-12">
        {/* Left: Text */}
        <div className="w-full lg:w-1/2 p-2 space-y-4 text-left">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight lg:text-left">
            Voices from Our <span className="text-CPC-ocean">Community</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Hear what people are saying about our medical camps and how we’ve
            made a difference together.
          </p>
          <p className="text-base sm:text-lg text-slate-600">
            Our health initiatives bring doctors, medicines, and vital check-ups
            directly to communities that often lack access to reliable
            healthcare. From eye care and dental screenings to nutrition
            awareness and chronic disease management, these camps ensure that
            every individual receives the attention they deserve. Together with
            our volunteers and partners, we are building healthier, stronger
            communities one camp at a time.
          </p>
        </div>

        {/* Right: Testimonials */}
        <div className="w-full lg:w-1/2 relative">
          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-sky-100 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 bg-gradient-to-t from-sky-100 to-transparent z-10 pointer-events-none"></div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-2"
            onMouseEnter={() => handleMouseEnter(swiperUpRef)}
            onMouseLeave={() => handleMouseLeave(swiperUpRef)}
          >
            {/* Column 1: Scroll Up */}
            <Swiper
              direction="vertical"
              slidesPerView="auto"
              spaceBetween={20}
              loop={true}
              speed={4000}
              allowTouchMove={false}
              autoplay={{ disableOnInteraction: false }}
              modules={[Autoplay]}
              className="h-[300px] sm:h-[200px] md:h-[600px]"
              onSwiper={(swiper) => (swiperUpRef.current = swiper)}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <SwiperSlide
                  key={`up-${t.id}-${i}`}
                  className="!h-auto flex justify-center"
                >
                  <TestimonialCard {...t} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Column 2: Scroll Down (hidden on small screens) */}
            <Swiper
              direction="vertical"
              slidesPerView="auto"
              spaceBetween={20}
              loop={true}
              speed={4000}
              allowTouchMove={false}
              autoplay={{
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              modules={[Autoplay]}
              className="h-[300px] sm:h-[200px] md:h-[600px] hidden md:block"
              onSwiper={(swiper) => (swiperDownRef.current = swiper)}
            >
              {[...testimonials, ...testimonials].reverse().map((t, i) => (
                <SwiperSlide
                  key={`down-${t.id}-${i}`}
                  className="!h-auto flex justify-center"
                >
                  <TestimonialCard {...t} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
