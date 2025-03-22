import React from "react";

import ComingSoon from "../page/comingsoon";
import Error404 from "../page/error/404";

import MainLayout from "../layout/MainLayout";

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
        element: <ComingSoonLazy />,
      },
      {
        path: "main",
        element: <MainLazy />,
      },
      {
        path: "selectIcon",
        element: <SelectIconLazy />,
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
