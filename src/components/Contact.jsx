function Contact() {
  const contacts = {
    FACEBOOK: "facebook.com/mindanaoking8plastics",
    EMAIL: "mindanaoking8plastics@gmail.com",
    PHONE: "+(63)9171645667",
  };

  return (
    <section className="flex flex-col items-center" id="contacts">
      <div class="border border-blue-950 rounded-xl my-20 px-4 py-10">
        <div class="container flex flex-col lg:flex-row flex-wrap text-blue-950">
          <h1 className="font-bold text-4xl mb-5 flex items-center lg:wd-1/4 lg:mr-10">CONTACT US</h1>
          <div className="lg:wd-3/4 lg:flex">
            {Object.entries(contacts).map(([key, value]) => (
              <div className="mb-2 lg:mr-5" key={key}>
                <div className="font-bold">{key}</div>
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
