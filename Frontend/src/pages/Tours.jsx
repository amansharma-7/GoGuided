import { useState } from "react";
import ToursHeader from "../components/common/DashboardHeader";
import ToursGrid from "../components/tours/ToursGrid";

const tours = [
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
    name: "Mountain Explorer",
    slug: "mountain-explorer",
    title: "Mountain Explorer",
    description:
      "Climb the tallest peaks of the Alps in an unforgettable journey",
    imageUrl:
      "https://images.unsplash.com/photo-1506748686217-97b9efac0b7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Alps, Switzerland",
    startDate: "2025-07-01",
    completionDate: "2025-07-15",
    difficulty: "Hard",
    stops: 5,
    rating: 4.8,
    reviews: 8,
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
      { label: "Start Date", key: "startDate", type: "date" },
      { label: "End Date", key: "endDate", type: "date" },
    ],
  },
];

function filterTours(tours, filterState) {
  const { searchQuery, selectedFilters } = filterState;
  // If no filters and no search query, return all tours
  if (!searchQuery && Object.keys(selectedFilters).length === 0) {
    return tours;
  }

  let filteredTours = tours.filter((tour) => {
    return (
      tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (selectedFilters["Tour Status"]) {
    filteredTours = filteredTours.filter((tour) => {
      const status = getTourStatus(tour);
      return selectedFilters["Tour Status"] === status;
    });
  }

  if (selectedFilters["Difficulty Level"]) {
    filteredTours = filteredTours.filter(
      (tour) =>
        tour.difficulty.toLowerCase() ===
        selectedFilters["Difficulty Level"].toLowerCase()
    );
  }

  if (selectedFilters["Duration"]) {
    filteredTours = filteredTours.filter((tour) => {
      const startDate = new Date(tour.startDate);
      const endDate = new Date(tour.completionDate);
      const duration = (endDate - startDate) / (1000 * 60 * 60 * 24); // Calculate duration in days

      if (selectedFilters["Duration"] === "1-7") {
        return duration >= 1 && duration <= 7;
      } else if (selectedFilters["Duration"] === "7-15") {
        return duration >= 7 && duration <= 15;
      } else if (selectedFilters["Duration"] === "15+") {
        return duration > 15;
      }
      return true;
    });
  }
  if (selectedFilters["Date Interval"]) {
    const { startDate, endDate } = selectedFilters["Date Interval"];
    // console.log("s and e", startDate, endDate);
    filteredTours = filteredTours.filter((tour) => {
      const tourStartDate = new Date(tour.startDate);
      const tourEndDate = new Date(tour.completionDate);
      return (
        tourStartDate >= new Date(startDate) && tourEndDate <= new Date(endDate)
      );
    });
  }

  return filteredTours;
}

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

  console.log(filterState);

  const filteredTours = filterTours(tours, filterState);

  // Optionally, sort the tours based on `sortOrder`
  const sortedTours = filteredTours.sort((a, b) => {
    if (filterState.sortOrder === "asc") {
      return new Date(a.startDate) - new Date(b.startDate);
    } else {
      return new Date(b.startDate) - new Date(a.startDate);
    }
  });

  return (
    <div className="px-32">
      <div className="flex flex-col justify-center p-3 shadow-sm bg-white rounded-lg h-[100vh]">
        <ToursHeader
          title="Tours"
          totalCount={sortedTours.length}
          filterState={filterState}
          setFilterState={setFilterState}
          filterOptions={filterOptions}
        />

        <ToursGrid tours={sortedTours} />
      </div>
    </div>
  );
}

export default Tours;
