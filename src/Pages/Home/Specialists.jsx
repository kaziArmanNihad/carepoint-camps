import { useState, useEffect } from "react";
import UseAxios from "../../CustomHooks/UseAxios";
import UseSocialIcons from "../../CustomHooks/UseSocialIcons";
import toast from "react-hot-toast";
import { HiOutlineBuildingOffice2, HiOutlinePhone } from "react-icons/hi2";

const Specialists = () => {
  const [specialistData, setSpecialistData] = useState([]);
  const [loading, setLoading] = useState(true);

  // hooks
  const axiosPublic = UseAxios();

  useEffect(() => {
    axiosPublic
      .get("/specialists")
      .then((res) => setSpecialistData(res.data))
      .catch(() => toast.error("Couldn't load specialists. Try again."))
      .finally(() => setLoading(false));
  }, [axiosPublic]);

  const handleClick = () => {
    toast.error("This is a demo link.");
  };

  return (
    <section className="w-full min-h-screen bg-[#EEF5F2] py-16 md:py-10">
      <div className="w-11/12 max-w-6xl mx-auto">
        {/* Heading Section */}
        <div className="mx-auto max-w-2xl text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A3B3A] mb-3">
            Meet our expert{" "}
            <span className="text-[#0F6E56]">medical specialists</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5b6b66] leading-relaxed">
            Our team of highly skilled medical professionals is dedicated to
            providing top-notch healthcare services, with specialists across
            cardiology, pediatrics, dermatology, and orthopedics.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#0A3B3A]/8 bg-white p-6 animate-pulse"
              >
                <div className="w-24 h-24 rounded-full bg-[#0A3B3A]/10 mx-auto mb-4" />
                <div className="h-4 bg-[#0A3B3A]/10 rounded w-2/3 mx-auto mb-2" />
                <div className="h-3 bg-[#0A3B3A]/10 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && specialistData.length === 0 && (
          <div className="text-center py-16 text-[#5b6b66] text-sm">
            No specialists to show right now. Check back soon.
          </div>
        )}

        {/* Specialists Grid */}
        {!loading && specialistData.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {specialistData.map((doc) => (
              <div
                key={doc.id}
                className="group flex flex-col items-center text-center rounded-2xl border border-[#0A3B3A]/8 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative mb-4">
                  <img
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-[#EAF6F1]"
                    src={doc.image}
                    alt={doc.name}
                  />
                </div>

                <h3 className="text-lg font-bold text-[#0A3B3A] tracking-tight">
                  {doc.name}
                </h3>

                <span className="inline-block mt-2 mb-3 text-[11px] font-semibold text-[#0F6E56] bg-[#E1F5EE] rounded-full px-3 py-1">
                  {doc.specialty}
                </span>

                <div className="w-full text-left space-y-1.5 mb-4 text-sm text-[#5b6b66]">
                  <p className="flex items-center gap-2">
                    <HiOutlineBuildingOffice2 className="w-4 h-4 text-[#0F6E56] shrink-0" />
                    {doc.hospital}
                  </p>
                  <p className="flex items-center gap-2">
                    <HiOutlinePhone className="w-4 h-4 text-[#0F6E56] shrink-0" />
                    {doc.phone}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#0A3B3A]/8 w-full flex justify-center">
                  <UseSocialIcons onClick={handleClick} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Specialists;
