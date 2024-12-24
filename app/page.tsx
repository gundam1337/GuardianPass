import Features from "@/components/templates/features";
import Hero from "@/components/templates/hero";
import WaitingList from "@/components/templates/waiting-list";
import Footer from "@/components/templates/footer";
import Header from "@/components/templates/header";
export default function Home() {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <Features></Features>
      <WaitingList></WaitingList>
      <Footer></Footer>
    </>
  );
}
