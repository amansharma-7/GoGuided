import Hero from "../components/home/Hero";

export async function loader() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return await res.json();
}

function Home() {
  return <Hero />;
}

export default Home;
