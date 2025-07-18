import { useUser } from "../../../common/UserContext";
import Layout from "../AccountLayout";
import AdminLinks from "./AdminLinks";

function DashBoard() {
  const { user } = useUser();
  if (user?.role === "admin") {
    return (
      <Layout>
        <AdminLinks />
      </Layout>
    );
  }

  return (
    <div className="mt-20 flex justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p>
          You do not have permission to view this page. Please contact an
          administrator if you believe this is an error.
        </p>
      </div>
    </div>
  );
}

export default DashBoard;
