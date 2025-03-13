import UserMenu from "./UserMenu";
import UserContent from "./UserContent";

function AccountLayout() {
  return (
    <div className="px-32 py-6 h-[90vh] grid grid-cols-[0.3fr_0.7fr] bg-green-50/90 overflow-hidden">
      <UserMenu />
      <UserContent />
    </div>
  );
}

export default AccountLayout;
