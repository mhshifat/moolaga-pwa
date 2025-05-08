import HomePageContainer from "@/components/modules/home";
import LogoutBtn from "@/components/shared/logout-btn";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start">
      <div className="flex justify-center items-center gap-1 bg-gradient-to-r from-primary/70 to-primary/80 w-full h-auto py-5">
        <div className="flex justify-center items-center gap-1">
          <img className="w-[60px] h-[60px]" src="https://app.moolaga.net/img/moolaga_logo_white.png" alt="logo" role="presentation" />
          <h1 className="text-2xl w-max font-medium text-background leading-normal font-geist-sans">Moolaga PWA</h1>
        </div>

        <div className="flex-1 flex items-center px-5">
          <div className="ml-auto">
            <LogoutBtn />
          </div>
        </div>
      </div>
      <div className="w-full flex-1 flex flex-col max-w-[400px]">
        <HomePageContainer />
      </div>
    </div>
  );
}
