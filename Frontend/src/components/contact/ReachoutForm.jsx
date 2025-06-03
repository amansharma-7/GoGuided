function ReachoutForm() {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md shadow-black/50 max-w-3xl mx-auto">
      <div className="flex flex-col gap-4 pb-5 border-b-2 border-black/20">
        <span className="text-green-950 text-4xl md:text-6xl font-semibold">
          Let's Chat, Reach Out to Us
        </span>
        <p className="text-base md:text-lg font-medium text-black/80">
          Have questions or feedback? We are here to help. Send us a message and
          we'll respond within 24 hours.
        </p>
      </div>
      <form
        // method="post"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="first_name" className="text-lg font-medium">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            className="p-2 border-2 border-black/20 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="last_name" className="text-lg font-medium">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            className="p-2 border-2 border-black/20 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="subject" className="text-lg font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="p-2 border-2 border-black/20 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="message" className="text-lg font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="p-2 border-2 border-black/20 rounded-md resize-y"
          ></textarea>
        </div>
        <button className="md:col-span-2 text-lg font-medium text-white bg-green-600 rounded-md hover:bg-green-700 hover:shadow-sm hover:shadow-black/50 hover:cursor-pointer py-3">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ReachoutForm;
