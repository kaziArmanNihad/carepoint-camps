import { useState } from "react";
import { ChevronLeft, ChevronRight, Workflow } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const teamMembers = [
  {
    id: 1,
    name: "Vicky Tsui",
    role: "Vice President",
    description:
      "Ms. Tsui oversees business development, management and marketing in the Asia Pacific region. She plays a leading role in setting up customised business jet programs, providing customers with a flexible high-end service that is tailored to their specific needs. Ms. Tsui has over 12 years of management experience in the business jet sector which has allowed her to gain a deep understanding of the business jet market and earn the trust of her clients.",
    imageUrl:
      "https://i.pinimg.com/736x/cf/6e/c4/cf6ec445df41899479978aa16f05c996.jpg",
    avatarUrl:
      "https://i.pinimg.com/736x/cf/6e/c4/cf6ec445df41899479978aa16f05c996.jpg",
  },
  {
    id: 2,
    name: "Chang Qiu Sheng",
    role: "CEO",
    description:
      "As the Chief Executive Officer, Chang Qiu Sheng leads the company with a vision for innovation and excellence. He has over 20 years of experience in the aviation industry, driving strategic growth and operational efficiency. His leadership has been instrumental in positioning the company as a market leader.",
    imageUrl:
      "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg",
    avatarUrl:
      "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg",
  },
  {
    id: 3,
    name: "Yongyi Zhang",
    role: "VP of Flight Operation",
    description:
      "Yongyi Zhang is responsible for the safety and efficiency of all flight operations. With a background as a commercial pilot and extensive experience in airline management, Yongyi ensures that our fleet operates at the highest standards of safety and reliability.",
    imageUrl:
      "https://i.pinimg.com/736x/d3/2e/98/d32e98c9cc7a771d13f978d9849af0cc.jpg",
    avatarUrl:
      "https://i.pinimg.com/736x/d3/2e/98/d32e98c9cc7a771d13f978d9849af0cc.jpg",
  },
  {
    id: 4,
    name: "Bob Li",
    role: "VP of Operations",
    description:
      "Bob Li manages the day-to-day operations, ensuring seamless service delivery and customer satisfaction. His expertise in logistics and ground operations is critical to our success.",
    imageUrl:
      "https://i.pinimg.com/736x/f0/32/ec/f032eccff7d1138ab8b2f59ee98e3dc3.jpg",
    avatarUrl:
      "https://i.pinimg.com/736x/f0/32/ec/f032eccff7d1138ab8b2f59ee98e3dc3.jpg",
  },
  {
    id: 5,
    name: "David Miller",
    role: "Executive VP",
    description:
      "David Miller plays a key role in corporate strategy and business development. He works closely with partners and stakeholders to identify new opportunities and drive long-term growth for the company.",
    imageUrl:
      "https://i.pinimg.com/736x/f2/f0/bd/f2f0bd0ab2ad2190eb3ccdca98e6392b.jpg",
    avatarUrl:
      "https://i.pinimg.com/736x/f2/f0/bd/f2f0bd0ab2ad2190eb3ccdca98e6392b.jpg",
  },
  {
    id: 6,
    name: "Zoe Parker",
    role: "VP of Finance",
    description:
      "Zoe Parker leads the financial strategy of the company, overseeing all financial planning, analysis, and reporting. Her financial expertise ensures the company's fiscal health and sustainable growth.",
    imageUrl:
      "https://i.pinimg.com/736x/93/de/d3/93ded39714506e66aa0384c3c835f1a1.jpg",
    avatarUrl:
      "https://i.pinimg.com/736x/93/de/d3/93ded39714506e66aa0384c3c835f1a1.jpg",
  },
  {
    id: 7,
    name: "Nicole Johnson",
    role: "VP of HR",
    description:
      "Nicole Johnson is dedicated to building a talented and motivated team. She leads all human resources initiatives, including recruitment, training, and fostering a positive work culture.",
    imageUrl:
      "https://i.pinimg.com/1200x/b0/5c/89/b05c89dae5d0744e844baa0ff88b166a.jpg",
    avatarUrl:
      "https://i.pinimg.com/1200x/b0/5c/89/b05c89dae5d0744e844baa0ff88b166a.jpg",
  },
];

export default function Team() {
  const [selectedMemberId, setSelectedMemberId] = useState(teamMembers[0].id);

  const selectedMember =
    teamMembers.find((member) => member.id === selectedMemberId) ||
    teamMembers[0];

  const firstName = selectedMember.name.split(" ")[0];
  const lastName = selectedMember.name.split(" ").slice(1).join(" ");

  return (
    <div className="bg-sky-100 min-h-screen font-sans flex items-center justify-center px-4 sm:px-6 md:px-8 py-8">
      <div className="w-11/12 mx-auto">
        <main className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text + Description */}
          <div className="text-center lg:text-left p-4 md:p-0 order-2 lg:order-1">
            <div className="flex items-center justify-center lg:justify-start text-gray-500 text-sm mb-4">
              <Workflow size={16} />
              <span className="ml-1">Management Team</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-3 leading-tight xl:text-5xl">
              <span className="text-black">{firstName} </span>
              <span className="text-CPC-ocean">{lastName}</span>
            </h1>

            <h2 className="text-base sm:text-lg md:text-xl text-gray-700 font-medium mb-6">
              {selectedMember.role}
            </h2>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg text-left max-w-xl mx-auto lg:mx-0">
              {selectedMember.description}
            </p>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="w-[240px] h-[280px] sm:w-[300px] sm:h-[350px] md:w-[380px] md:h-[450px] lg:w-[420px] lg:h-[500px] xl:w-[400px] xl:h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <img
                src={selectedMember.imageUrl}
                alt={selectedMember.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/400x450/cccccc/ffffff?text=Image+Error";
                }}
              />
            </div>
          </div>
        </main>

        {/* Swiper Avatars */}
        <div className="mt-10 sm:mt-14 lg:mt-16 xl:mt-3">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={3}
            spaceBetween={16}
            loop={true}
            autoplay={{ delay: 4000 }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              480: { slidesPerView: 4, spaceBetween: 20 },
              768: { slidesPerView: 5, spaceBetween: 24 },
              1024: { slidesPerView: 6, spaceBetween: 28 },
              1440: { slidesPerView: 7, spaceBetween: 32 },
            }}
            className="!px-4 sm:!px-8"
            onSlideChange={(swiper) =>
              setSelectedMemberId(
                teamMembers[swiper.realIndex % teamMembers.length].id,
              )
            }
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <div
                  onClick={() => setSelectedMemberId(member.id)}
                  className={`text-center cursor-pointer group transition-all duration-300 ease-in-out flex-shrink-0 py-4 ${
                    selectedMemberId === member.id
                      ? "scale-110"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden border-4 transition-colors duration-300 ${
                      selectedMemberId === member.id
                        ? "border-CPC-ocean"
                        : "border-transparent group-hover:border-purple-300"
                    }`}
                  >
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/100x100/cccccc/ffffff?text=Error";
                      }}
                    />
                    {selectedMemberId === member.id && (
                      <div className="absolute inset-0 bg-black/30"></div>
                    )}
                  </div>
                  <p
                    className={`mt-2 text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                      selectedMemberId === member.id
                        ? "text-CPC-ocean"
                        : "text-gray-800"
                    }`}
                  >
                    {member.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {member.role.split(" ").slice(0, 2).join(" ")}
                  </p>
                </div>
              </SwiperSlide>
            ))}

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center p-2 rounded-full bg-black/5 hover:bg-black/10 cursor-pointer">
              <ChevronLeft size={24} className="text-gray-600" />
            </div>
            <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center p-2 rounded-full bg-black/5 hover:bg-black/10 cursor-pointer">
              <ChevronRight size={24} className="text-gray-600" />
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
