import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import ReactPaginate from "react-paginate"; // pagination library
import { HiOutlineMagnifyingGlass, HiOutlineMapPin } from "react-icons/hi2";
import UseCamps from "../../CustomHooks/UseCamps";
import UsePrimaryBtn from "../../CustomHooks/UsePrimaryBtn";

const AvailableCamps = () => {
  const [camp] = UseCamps();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredCamps, setFilteredCamps] = useState([]);

  // Debounced dynamic search
  useEffect(() => {
    if (!camp) return;

    const handler = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setFilteredCamps([]);
      } else {
        const results = camp.filter((c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredCamps(results);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, camp]);

  // Clear search input and reset camps
  const handleClear = () => {
    setSearchTerm("");
    setFilteredCamps([]);
    setCurrentPage(0); // reset to first page
  };

  if (!camp) {
    return (
      <section className="w-full bg-[#EEF5F2] py-20">
        <div className="w-11/12 lg:w-4/5 mx-auto">
          <div className="h-8 bg-[#0A3B3A]/10 rounded w-64 mx-auto mb-10 animate-pulse" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-[#0A3B3A]/8 bg-white animate-pulse"
              >
                <div className="w-full h-48 bg-[#0A3B3A]/10" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-[#0A3B3A]/10 rounded w-3/4" />
                  <div className="h-3 bg-[#0A3B3A]/10 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If search is active, show filtered camps, else show all
  const displayedCamps = searchTerm ? filteredCamps : camp;

  // Pagination logic
  const itemsPerPage = 9; // show camps per page

  const offset = currentPage * itemsPerPage;
  const currentPageData = displayedCamps.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(displayedCamps.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <section className="w-full bg-[#EEF5F2] py-16 md:py-20">
      <div className="w-11/12 lg:w-4/5 mx-auto">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A3B3A] mb-3">
            Available medical camps
          </h1>
          <p className="text-sm md:text-base text-[#5b6b66] leading-relaxed">
            Explore upcoming camps tailored to various health needs, from
            general wellness check-ups to specialized care for children, women,
            and senior citizens — with free screenings and expert advice from
            qualified professionals.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 mb-8 max-w-xl mx-auto">
          <div className="relative flex-1">
            <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5b6b66]" />
            <input
              type="text"
              placeholder="Search camps by name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0); // reset to first page when searching
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#0A3B3A]/12 bg-white shadow-sm text-sm text-[#0A3B3A] placeholder:text-[#5b6b66]/70 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/30 focus:border-[#0F6E56]/40 transition-all"
            />
          </div>
          {searchTerm && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-sm font-medium text-[#5b6b66] hover:text-[#0A3B3A] px-3 py-2.5 rounded-full border border-[#0A3B3A]/12 bg-white hover:bg-[#0A3B3A]/5 transition-colors shrink-0"
            >
              <X size={16} /> Clear
            </button>
          )}
        </div>

        {/* Camp Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {currentPageData.length > 0 ? (
            currentPageData.map((camp) => (
              <div
                key={camp._id}
                className="group rounded-2xl overflow-hidden border border-[#0A3B3A]/8 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={camp.image}
                    alt={camp.name}
                    className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wide text-[#0F6E56] bg-white/95 rounded-full px-2.5 py-1">
                    Free checkup
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold text-[#0A3B3A] mb-1.5 line-clamp-1">
                    {camp.name}
                  </h2>
                  <p className="flex items-center gap-1.5 text-sm text-[#5b6b66] mb-4">
                    <HiOutlineMapPin className="w-4 h-4 text-[#0F6E56] shrink-0" />
                    {camp.location}
                  </p>
                  <div className="flex justify-end">
                    <Link to={`/campDetails/${camp._id}`}>
                      <UsePrimaryBtn>More details</UsePrimaryBtn>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : searchTerm ? (
            <p className="text-center text-base font-medium text-[#5b6b66] col-span-full py-10">
              No camps found matching &#34;{searchTerm}&#34;.
            </p>
          ) : null}
        </div>

        {/* Pagination Controls */}
        {pageCount > 1 && (
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center gap-2 mt-10"
            pageClassName="px-3.5 py-1.5 text-sm rounded-full border border-[#0A3B3A]/12 bg-white text-[#0A3B3A] hover:bg-[#0F6E56]/10 transition-colors cursor-pointer"
            activeClassName="bg-[#0A3B3A] border-[#0A3B3A] text-black hover:bg-[#0A3B3A]"
            previousClassName="px-3.5 py-1.5 text-sm rounded-full border border-[#0A3B3A]/12 bg-white text-[#0A3B3A] hover:bg-[#0F6E56]/10 transition-colors cursor-pointer"
            nextClassName="px-3.5 py-1.5 text-sm rounded-full border border-[#0A3B3A]/12 bg-white text-[#0A3B3A] hover:bg-[#0F6E56]/10 transition-colors cursor-pointer"
            disabledClassName="opacity-40 cursor-not-allowed"
          />
        )}
      </div>
    </section>
  );
};

export default AvailableCamps;
