import React from "react";
import EnhancedFilters from "./components/Filter";
import { CourseCard } from "./components/CourseCard";
import {CourseData} from "./components/CourseData"
import { CourseSvg } from "../../svg";
import { useSearchParams } from 'next/navigation'

const SearchResults = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') // ?name=harsh

  // Define the filter sections data
  const filterSections = [
    {
      id: "product",
      title: "Product",
      options: [
        { id: "courses", label: "Courses" },
        { id: "events", label: "Events" },
      ],
    },
    {
      id: "rating",
      title: "Rating",
      options: [
        { id: "rating-4-5", label: "4.5 & up", count: 4652, rating: 4.5 },
        { id: "rating-4-0", label: "4.0 & up", count: 9206, rating: 4.0 },
        { id: "rating-3-5", label: "3.5 & up", count: 10000, rating: 3.5 },
        { id: "rating-3-0", label: "3.0 & up", count: 10000, rating: 3.0 },
      ],
    },
    {
      id: "language",
      title: "Language",
      options: [
        { id: "english", label: "English", count: 6988 },
        { id: "spanish", label: "Español", count: 1073 },
        { id: "turkish", label: "Türkçe", count: 454 },
        { id: "portuguese", label: "Português", count: 417 },
      ],
    },
    {
      id: "level",
      title: "Level",
      options: [
        { id: "all-levels", label: "All Levels", count: 5854 },
        { id: "beginner", label: "Beginner", count: 4502 },
        { id: "intermediate", label: "Intermediate", count: 1941 },
        { id: "expert", label: "Expert", count: 253 },
      ],
    },
    {
      id: "price",
      title: "Price",
      options: [
        { id: "paid", label: "Paid", count: 10000 },
        { id: "free", label: "Free", count: 1585 },
      ],
    },
  ];

  // Define sort options
  const sortOptions = [
    { id: "relevant", label: "Most Relevant", selected: true },
    { id: "newest", label: "Newest" },
    { id: "most-reviewed", label: "Most Reviewed" },
    { id: "highest-rated", label: "Highest Rated" },
  ];

  // Optional: Handle filter changes
  const handleFilterChange = (
    filterId: string,
    optionId: string,
    checked: boolean
  ) => {
    console.log(`Filter changed: ${filterId}, ${optionId}, ${checked}`);
    // Add your filter logic here
  };

  // Optional: Handle sort changes
  const handleSortChange = (sortId: string) => {
    console.log(`Sort changed to: ${sortId}`);
    // Add your sort logic here
  };

  return (
    <>
      <div className="max-sm:bg-background max-sm:p-2 max-sm:overflow-x-hidden max-xs:mb-17">
        <EnhancedFilters
          filterSections={filterSections}
          sortOptions={sortOptions}
          defaultSortOption="relevant"
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
      </div>
      {/* Courses Section */}
     
      <div className="mb-4 p-6 bg-white rounded-2xl mt-6">
      <div className="flex items-center gap-2">
      <CourseSvg className="size-6 bg-accent" />
          <h2 className="text-2xl font-bold">{CourseData.length} Results for "{query}" </h2>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-2">
          {CourseData.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>

    </>
  );
};

export default SearchResults;
