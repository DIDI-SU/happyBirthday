import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="w-full h-[100dvh]  flex flex-col justify-center items-center bg-[#000000]">
      <Outlet />
    </main>
  );
};

export default MainLayout;
