import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import ReactPaginate from "react-paginate"; // pagination library
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
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="w-16 h-16 loading loading-infinity loading-xl"></p>
        <h1 className="text-2xl md:text-4xl mt-4">Loading Data...</h1>
      </div>
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
    <section className="w-full bg-sky-100">
      <div className="w-11/12 lg:w-4/5 h-full mx-auto py-20">
        <h1 className="text-center text-xl md:text-2xl lg:text-3xl p-3 font-bold">
          Available Medical Camps
        </h1>
        <p className="text-sm md:text-base p-2 text-left lg:text-left">
          Explore our upcoming medical camps tailored to various health needs,
          from general wellness check-ups to specialized care for children,
          women, and senior citizens. Each camp offers free screenings,
          consultations, and expert advice provided by qualified healthcare
          professionals. Find a camp near you and take a proactive step towards
          better health for yourself and your loved ones.
        </p>

        {/* Search Bar */}
        <div className="flex items-center gap-2 my-6">
          <input
            type="text"
            placeholder="Search camps by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0); // reset to first page when searching
            }}
            className="flex-1 p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <button
            onClick={handleClear}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md"
          >
            <X size={18} /> Clear
          </button>
        </div>

        {/* Camp Cards */}
        <div className="grid gap-4 my-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {currentPageData.length > 0 ? (
            currentPageData.map((camp) => (
              <div key={camp._id} className="card w-full mx-auto">
                <figure>
                  <img
                    src={camp.image}
                    alt={camp.name}
                    className="object-cover w-full h-52 rounded-t-xl"
                  />
                </figure>
                <div className="card-body rounded-b-xl bg-CPC-white shadow-2xl">
                  <h2 className="card-title text-CPC-ocean text-lg md:text-lg font-bold">
                    {camp.name}
                  </h2>
                  <p className="text-black text-sm md:text-base">
                    {camp.location}
                  </p>
                  <div className="card-actions justify-end mt-3">
                    <Link to={`/campDetails/${camp._id}`}>
                      <UsePrimaryBtn>More Details</UsePrimaryBtn>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : searchTerm ? (
            <p className="text-center text-lg font-medium text-gray-600 col-span-full">
              No camps found matching your search.
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
            containerClassName="flex justify-center gap-2 mt-6"
            pageClassName="px-3 py-1 border rounded-lg bg-white shadow-sm hover:bg-sky-300"
            activeClassName="bg-sky-400 text-black"
            previousClassName="px-3 py-1 border rounded-lg bg-white shadow-sm hover:bg-sky-300"
            nextClassName="px-3 py-1 border rounded-lg bg-white shadow-sm hover:bg-sky-300"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        )}
      </div>
    </section>
  );
};

export default AvailableCamps;
