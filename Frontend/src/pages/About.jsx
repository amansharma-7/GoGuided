import Hero from "../components/about/Hero";
import OurMission from "../components/about/OurMission";
import Achievements from "../components/about/Achievements";
import { BsStars } from "react-icons/bs";
import { IoEarth } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";
import { MdCall } from "react-icons/md";

function About() {
  const heroData = {
    title: "About Us",
    backgroundImage: "images/about-us.jpg",
  };

  const missionData = [
    {
      icon: <BsStars size={48} color="green" />,
      title: "Beyond Bookings, Into Experiences",
      description:
        "We don’t just help you plan; we help you live. Our curated adventures blend culture, exploration, and personal touch to transform every trip into a story worth telling.",
    },
    {
      icon: <IoEarth size={48} color="green" />,
      title: "Authenticity at Every Destination",
      description:
        "Travel should feel real. We connect you with local traditions, hidden gems, and immersive moments that leave a lasting impression—because the best experiences can’t be found in a guidebook.",
    },
    {
      icon: <IoMdLock size={48} color="green" />,
      title: "Trust, Safety & Seamless Service",
      description:
        "Your journey is our priority. From meticulous planning to real-time assistance, we ensure every detail is handled with care, so you can explore with confidence and peace of mind.",
    },
    {
      icon: <MdCall size={48} color="green" />,
      title: "Always Here, Wherever You Are",
      description:
        "The world never sleeps, and neither do we. Whether you need a last-minute change, insider tips, or just a friendly voice, our team is available 24/7 to support you. Your journey is our journey.",
    },
  ];

  const achievementData = [
    { value: "50+", description: "Destinations Covered" },
    { value: "98%", description: "Customer Satisfaction" },
    { value: "85%", description: "Repeat Travelers" },
    { value: "4.9/5", description: "Average Rating" },
    { value: "10%", description: "Profits Donated" },
    { value: "100+", description: "Trips Planned" },
  ];

  return (
    <>
      <Hero heroData={heroData} />
      <OurMission missionData={missionData} />
      <Achievements achievementData={achievementData} />
    </>
  );
}

export default About;
