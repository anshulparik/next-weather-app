import Navbar from "@/components/Navbar/Navbar";
import Search from "@/components/Search/Search";

export default async function Home() {
  return (
    <div className="home">
      <div className="nav">
        <Navbar />
      </div>
      <Search />
    </div>
  );
}
