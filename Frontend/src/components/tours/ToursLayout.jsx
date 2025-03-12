import ToursHeader from "./ToursHeader";
import ToursCard from "./ToursCard";

function ToursLayout() {
  return (
    <section className="px-32 py-6 flex flex-col gap-6 justify-center">
      <ToursHeader />
      <div className="grid grid-cols-3 gap-16 p-6 rounded-md">
        {Array.from({ length: 10 }).map((el, i) => (
          <ToursCard key={i} id="meow" />
        ))}
      </div>
    </section>
  );
}

export default ToursLayout;
