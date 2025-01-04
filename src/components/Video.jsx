import bg_vid from "../assets/quality.mp4";

function Video() {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen mt-8 overflow-hidden"
      id="quality"
    >
      <video
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
        autoplay
        muted
        loop
      >
        <source src={bg_vid ?? ""} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 p-5 text-2xl text-black bg-amber-400 bg-opacity-75 bg-blur-lg rounded-xl max-w-2xl my-10">
        <p className="font-bold text-2xl">
          Strength is the cornerstone of our plastic products. Whether it's for
          industrial applications, packaging solutions, or consumer goods, our
          plastics are engineered to withstand the toughest conditions and
          deliver exceptional performance. From impact resistance to
          load-bearing capabilities, our products are designed to meet the most
          demanding requirements, providing you with peace of mind and
          long-lasting durability.
        </p>
      </div>
    </section>
  );
}

export default Video;
