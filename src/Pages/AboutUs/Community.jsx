import { Users, MapPin, Stethoscope, HandHeart } from "lucide-react";

// gallery images
const ImageCard = ({ imageUrl, title }) => (
  <div className="relative overflow-hidden rounded-lg group">
    <img
      src={imageUrl}
      alt={title}
      className="h-56 sm:h-64 md:h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      onError={(e) => {
        e.target.src =
          "https://placehold.co/600x400/e2e8f0/94a3b8?text=Image+Not+Found";
      }}
    />
    <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/40" />
    <div className="absolute bottom-0 left-0 p-3 sm:p-4">
      <h5 className="text-base sm:text-lg font-bold text-white">{title}</h5>
    </div>
  </div>
);

export default function Community() {
  // impact stat used in the mission panel
  const StatCard = ({ icon, value, label }) => (
    <div className="rounded-2xl bg-white border border-[#0A3B3A]/8 p-5">
      <div className="w-9 h-9 rounded-full bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center mb-3">
        {icon}
      </div>
      <p className="text-2xl font-bold text-[#0A3B3A] leading-none mb-1">
        {value}
      </p>
      <p className="text-xs text-[#5b6b66]">{label}</p>
    </div>
  );

  const impactStats = [
    { icon: <MapPin size={18} />, value: "120+", label: "Camps hosted" },
    {
      icon: <Stethoscope size={18} />,
      value: "40k+",
      label: "Patients served",
    },
    { icon: <HandHeart size={18} />, value: "2.3k", label: "Volunteers" },
    { icon: <Users size={18} />, value: "18", label: "Cities reached" },
  ];

  // gallery images
  const galleryImages = [
    {
      imageUrl:
        "https://i.pinimg.com/1200x/85/02/1c/85021c3227c52351292dd14402a3dcb3.jpg",
      title: "Patient Consultation",
    },
    {
      imageUrl:
        "https://i.pinimg.com/736x/a2/eb/4a/a2eb4a57014571d9bd3c148fee96ffb3.jpg",
      title: "Our Volunteer Team",
    },
    {
      imageUrl:
        "https://i.pinimg.com/1200x/9d/dd/32/9ddd32561802ae82f4041dc52b2ec88f.jpg",
      title: "Community Health",
    },
  ];

  return (
    <div className="bg-sky-100 w-full min-h-screen">
      <div className="w-11/12 mx-auto space-y-12 py-12 sm:py-16 lg:py-24">
        {/* Mission Section */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 mb-3 sm:mb-4">
              <span className="w-2 h-2 bg-CPC-ocean rounded-full"></span>
              <span className="text-CPC-ocean font-semibold text-xs sm:text-sm tracking-wider">
                OUR CAMPS
              </span>
              <span className="w-2 h-2 bg-CPC-ocean rounded-full"></span>
            </div>
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-snug">
              Dedicated to{" "}
              <span className="text-CPC-ocean">Community Wellness</span>
            </h2>
            <p className="mb-3 sm:mb-4 text-gray-500 text-sm sm:text-base">
              Our mission is to bring high-quality healthcare directly to the
              communities that need it most. We believe that everyone deserves
              access to medical care, regardless of their location or financial
              situation.
            </p>
            <p className="mb-6 sm:mb-8 text-gray-500 text-sm sm:text-base">
              Through our volunteer-driven medical camps, we offer free
              consultations, health screenings, and educational resources to
              empower individuals and build a healthier future for all.
            </p>
            <button className="rounded-lg bg-CPC-ocean px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-white text-sm sm:text-base transition-colors hover:bg-CPC-sky hover:text-black">
              Learn More
            </button>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              {impactStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((img, index) => (
            <ImageCard key={index} {...img} />
          ))}
        </div>
      </div>
    </div>
  );
}
