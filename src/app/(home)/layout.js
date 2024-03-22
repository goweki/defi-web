import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function HomeLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 w-full mb-12 items-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
