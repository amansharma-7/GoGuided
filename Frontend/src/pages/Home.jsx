import WhyUs from "../components/home/WhyUs";
import Hero from "../components/home/Hero";
import Testimonials from "../components/home/Testimonials";
import Services from "../components/home/Services";

export async function loader() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return await res.json();
}

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Testimonials />
    </>
  );
}

export default Home;
