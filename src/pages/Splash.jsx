import Navbar from "../components/Navbar";
import TopSec from "../components/TopSec";
import MenuSec from "../components/MenuSec";
import Visit from "../components/Visit";
import Video from "../components/Video";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Splash() {
  return (
    <div class="scroll-smooth">
      <Navbar />
      <TopSec />
      <MenuSec />
      <Visit />
      <Video />
      <Contact />
      <Footer />
    </div>
  );
}

export default Splash;
