import MenuItems from "./MenuItems";
import Profile from "./Profile";

function UserMenu() {
  return (
    <section className="flex flex-col py-4 space-y-4 rounded-l-md bg-green-700 shadow-lg shadow-black/50">
      <Profile />
      <MenuItems />
    </section>
  );
}

export default UserMenu;
