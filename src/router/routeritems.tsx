import React, { Suspense } from "react";

import Error404 from "../page/error/404";

import MainLayout from "../layout/MainLayout";

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-black">
    <div className="animate-pulse text-white text-xl">로딩 중...</div>
  </div>
);

const ComingSoonLazy = React.lazy(() => import("../page/comingsoon"));
const MainLazy = React.lazy(() => import("../page/main"));
const SelectIconLazy = React.lazy(() => import("../page/selectIcon"));
const MemoLazy = React.lazy(() => import("../page/memo"));
const LoadingLazy = React.lazy(() => import("../page/selectIcon/loading"));
const AchiveLazy = React.lazy(() => import("../page/achive"));
const DropLazy = React.lazy(() => import("../page/drop"));

const routerItems = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ComingSoonLazy />
          </Suspense>
        ),
      },
      {
        path: "main",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MainLazy />
          </Suspense>
        ),
      },
      {
        path: "selectIcon",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SelectIconLazy />
          </Suspense>
        ),
      },
      {
        path: "memo",
        element: <MemoLazy />,
      },
      {
        path: "loading",
        element: <LoadingLazy />,
      },
      {
        path: "achive",
        element: <AchiveLazy />,
      },
      {
        path: "drop",
        element: <DropLazy />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
];

export default routerItems;
