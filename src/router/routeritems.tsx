import ComingSoon from "../page/comingsoon";
import Error404 from "../page/error/404";
import Main from "../page/main/index";
import SelectIcon from "../page/selectIcon/index";
import Loading from "../page/selectIcon/loading";
import Memo from "../page/memo/index";
// import Write from "../page/write/Write";
import MainLayout from "../layout/MainLayout";

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
        path: "*",
        element: <Error404 />,
      },
    ],
  },
];

export default routerItems;
