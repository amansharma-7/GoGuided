import { useLoaderData } from "react-router";

export async function loader() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return await res.json();
}

function Home() {
  const users = useLoaderData();
  console.log(users);

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default Home;
