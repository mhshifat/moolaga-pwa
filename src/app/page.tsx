import HomePageContainer from "@/components/modules/home";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start">
      <div className="flex flex-col justify-center items-center gap-1 bg-gradient-to-r from-primary/70 to-primary/80 w-full h-auto py-5">
        <img className="w-[100px] h-[100px]" src="https://app.moolaga.net/img/moolaga_logo_white.png" alt="logo" role="presentation" />
        <h1 className="text-3xl md:text-4xl w-max font-medium text-background leading-normal font-geist-sans">Moolaga PWA</h1>
      </div>
      <div className="w-full flex-1 flex flex-col max-w-[400px]">
        <HomePageContainer />
      </div>
    </div>
  );
}
