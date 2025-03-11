import ReachoutOptions from "../components/contact/ReachoutOptions";
import ReachoutForm from "../components/contact/ReachoutForm";

function Contact() {
  return (
    <section className="px-32 grid grid-cols-[1.35fr_1.65fr] gap-6 py-6 ">
      <ReachoutOptions />
      <ReachoutForm />
    </section>
  );
}

export default Contact;
