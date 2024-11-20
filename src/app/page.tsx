import HomePageContainer from "@/components/modules/home";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-[5%]">
      <h1 className="text-8xl w-max from-emerald-500 to-emerald-700 font-medium text-transparent bg-clip-text bg-gradient-to-r leading-normal mb-10">Moolaga PWA</h1>
      <HomePageContainer />
    </div>
  );
}
