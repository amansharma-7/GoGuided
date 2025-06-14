import { useEffect, useState } from "react";
import ToursHeader from "../components/common/DashboardHeader";
import ToursGrid from "../components/tours/ToursGrid";
import NoResult from "./NoResult";
const toursData = [
  {
    id: 1,
    name: "The Forest Hiker",
    slug: "the-forest-hiker",
    title: "The Forest Hiker",
    description: "Breathtaking hike through the Canadian Banff National Park",
    imageUrl:
      "https://images.unsplash.com/photo-1529419412599-7bb870e11810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Jammu, India",
    startDate: "2025-04-02",
    completionDate: "2025-04-12",
    difficulty: "Easy",
    stops: 4,
    rating: 4.5,
    reviews: 5,
  },
  {
    id: 2,
    name: "The Desert Adventure",
    slug: "the-desert-adventure",
    title: "The Desert Adventure",
    description: "Explore the vast Sahara dunes on a guided camel trek",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Sahara, Morocco",
    startDate: "2025-06-15",
    completionDate: "2025-06-25",
    difficulty: "Moderate",
    stops: 6,
    rating: 4.7,
    reviews: 12,
  },
  {
    id: 3,
    name: "Tiger Safari",
    slug: "Tiger Safari",
    title: "Tiger Safari",
    description: "Experience the roar the bengal tigers",
    imageUrl:
      "https://madhavnationalpark.org/public/frontend/images/m_logo.png",
    location: "Shivpuri, India",
    startDate: "2025-07-01",
    completionDate: "2025-07-15",
    difficulty: "Easy",
    stops: 5,
    rating: 4.98,
    reviews: 80,
  },
  {
    id: 4,
    name: "Tropical Escape",
    slug: "tropical-escape",
    title: "Tropical Escape",
    description: "Relax on the beautiful beaches of Bali with guided tours",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Bali, Indonesia",
    startDate: "2025-08-05",
    completionDate: "2025-08-15",
    difficulty: "Easy",
    stops: 3,
    rating: 4.6,
    reviews: 15,
  },
  {
    id: 5,
    name: "Oceanic Dive",
    slug: "oceanic-dive",
    title: "Oceanic Dive",
    description: "Dive into the crystal-clear waters of the Great Barrier Reef",
    imageUrl:
      "https://images.unsplash.com/photo-1529419412599-7bb870e11810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Queensland, Australia",
    startDate: "2025-09-10",
    completionDate: "2025-09-20",
    difficulty: "Moderate",
    stops: 2,
    rating: 4.9,
    reviews: 10,
  },
  {
    id: 6,
    name: "Safari Adventure",
    slug: "safari-adventure",
    title: "Safari Adventure",
    description: "Experience an unforgettable safari in Kruger National Park",
    imageUrl:
      "https://images.unsplash.com/photo-1529419412599-7bb870e11810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Kruger, South Africa",
    startDate: "2025-10-05",
    completionDate: "2025-10-15",
    difficulty: "Moderate",
    stops: 4,
    rating: 5,
    reviews: 20,
  },
  {
    id: 7,
    name: "Cultural Journey",
    slug: "cultural-journey",
    title: "Cultural Journey",
    description: "Explore the rich history of ancient temples in Cambodia",
    imageUrl:
      "https://images.unsplash.com/photo-1529419412599-7bb870e11810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Siem Reap, Cambodia",
    startDate: "2025-11-12",
    completionDate: "2025-11-22",
    difficulty: "Easy",
    stops: 5,
    rating: 4.3,
    reviews: 25,
  },
  {
    id: 8,
    name: "Amazon Expedition",
    slug: "amazon-expedition",
    title: "Amazon Expedition",
    description: "Venture deep into the Amazon rainforest with local guides",
    imageUrl:
      "https://images.unsplash.com/photo-1529419412599-7bb870e11810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Amazon, Brazil",
    startDate: "2025-12-05",
    completionDate: "2025-12-15",
    difficulty: "Hard",
    stops: 7,
    rating: 4.7,
    reviews: 18,
  },
  {
    id: 9,
    name: "Winter Wonderland",
    slug: "winter-wonderland",
    title: "Winter Wonderland",
    description: "Embrace the snow-capped beauty of Finland's Arctic Circle",
    imageUrl:
      "https://images.unsplash.com/photo-1529419412599-7bb870e11810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Lapland, Finland",
    startDate: "2026-01-10",
    completionDate: "2026-01-20",
    difficulty: "Moderate",
    stops: 6,
    rating: 4.6,
    reviews: 30,
  },
  {
    id: 10,
    name: "Trekking the Himalayas",
    slug: "trekking-the-himalayas",
    title: "Trekking the Himalayas",
    description:
      "A challenging and rewarding trek through Nepal's Himalayan peaks",
    imageUrl:
      "https://images.unsplash.com/photo-1529419412599-7bb870e11810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Nepal",
    startDate: "2026-02-01",
    completionDate: "2026-02-10",
    difficulty: "Hard",
    stops: 8,
    rating: 4.9,
    reviews: 40,
  },
  {
    id: 11,
    name: "Volcano Discovery",
    slug: "volcano-discovery",
    title: "Volcano Discovery",
    description: "Discover the powerful active volcanoes of Iceland",
    imageUrl:
      "https://images.unsplash.com/photo-1529419412599-7bb870e11810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Iceland",
    startDate: "2026-03-05",
    completionDate: "2026-03-15",
    difficulty: "Hard",
    stops: 5,
    rating: 5,
    reviews: 35,
  },
  {
    id: 12,
    name: "City Lights Tour",
    slug: "city-lights-tour",
    title: "City Lights Tour",
    description: "A guided city tour through the bustling streets of Tokyo",
    imageUrl:
      "https://images.unsplash.com/photo-1529419412599-7bb870e11810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Tokyo, Japan",
    startDate: "2026-04-02",
    completionDate: "2026-04-12",
    difficulty: "Easy",
    stops: 4,
    rating: 4.4,
    reviews: 22,
  },
];
const filterOptions = [
  {
    label: "Tour Status",
    children: [
      { label: "Upcoming Tours", value: "upcoming" },
      { label: "Ongoing Tours", value: "ongoing" },
      { label: "Completed Tours", value: "completed" },
    ],
  },
  {
    label: "Difficulty Level",
    children: [
      { label: "Easy", value: "easy" },
      { label: "Moderate", value: "moderate" },
      { label: "Hard", value: "hard" },
    ],
  },
  {
    label: "Duration",
    children: [
      { label: "Short (1-7 Days)", value: "1-7" },
      { label: "Medium (7-15 Days)", value: "7-15" },
      { label: "Long (15+ Days)", value: "15+" },
    ],
  },

  {
    label: "Date Interval",
    children: [
      { label: "Start Date", value: "startDate", type: "date" },
      { label: "End Date", value: "endDate", type: "date" },
    ],
  },
];

function getTourStatus(tour) {
  const startDate = new Date(tour.startDate);
  const endDate = new Date(tour.completionDate);

  if (endDate < new Date()) {
    return "completed";
  } else if (startDate <= new Date() && endDate >= new Date()) {
    return "ongoing";
  } else {
    return "upcoming";
  }
}

function Tours() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTours, setTotalTours] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        // const params = new URLSearchParams();

        // const { searchQuery, selectedFilters, sortOrder } = filterState;

        // if (searchQuery) {
        //   params.append("search", searchQuery);
        // }

        // if (selectedFilters) {
        //   if (selectedFilters["Date Interval"]) {
        //     const { startDate, endDate } = selectedFilters["Date Interval"];
        //     if (startDate) params.append("startDate", startDate);
        //     if (endDate) params.append("endDate", endDate);
        //   }
        // }

        // if (sortOrder) {
        //   params.append("sort", sortOrder);
        // }

        // params.append("page", currentPage);
        // params.append("limit", numberOfEntries);

        // // Example API call, replace with your actual method
        // const response = await getAllTours(params.toString());

        // const { data } = response;

        setTours(toursData);
        // setTotalPages(response.totalPages);
        // setTotalTours(response.total);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [currentPage, filterState]);

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col justify-center p-3 shadow-sm bg-white rounded-lg">
        <ToursHeader
          title="Tours"
          totalCount={tours.length}
          filterState={filterState}
          setFilterState={setFilterState}
          filterOptions={filterOptions}
        />
        {tours.length > 0 ? <ToursGrid tours={tours} /> : <NoResult />}
      </div>
    </div>
  );
}

export default Tours;
