import ReachoutOptions from "./ReachoutOptions";
import ReachoutForm from "./ReachoutForm";

function ContactLayout() {
  return (
    <div className="px-32 grid grid-cols-[1.35fr_1.65fr] gap-6 py-6 ">
      <ReachoutOptions />
      <ReachoutForm />
    </div>
  );
}

export default ContactLayout;
