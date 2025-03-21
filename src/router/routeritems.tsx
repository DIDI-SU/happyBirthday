import ComingSoon from "../page/comingsoon";
import Error404 from "../page/error/404";
import Main from "../page/main/index";
import SelectIcon from "../page/selectIcon/index";
import Loading from "../page/selectIcon/loading";
import Memo from "../page/memo/index";
import Drop from "../page/drop";

import MainLayout from "../layout/MainLayout";
import Achive from "../page/achive";

const routerItems = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <ComingSoon />,
      },
      {
        path: "main",
        element: <Main />,
      },
      {
        path: "selectIcon",
        element: <SelectIcon />,
      },
      {
        path: "memo",
        element: <Memo />,
      },
      {
        path: "loading",
        element: <Loading />,
      },
      {
        path: "achive",
        element: <Achive />,
      },
      {
        path: "drop",
        element: <Drop />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
];

export default routerItems;
