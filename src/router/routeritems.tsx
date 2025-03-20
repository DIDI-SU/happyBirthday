import ComingSoon from "../page/comingsoon";
import Error404 from "../page/error/404";
// import Main from "../page/main/index";
import Memo from "../page/memo/Memo";
import Write from "../page/write/Write";

const routerItems = [
  {
    path: "/",
    element: <ComingSoon />,
  },
  {
    path: "/memo",
    element: <Memo />,
  },
  {
    path: "/write/:memo",
    element: <Write />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];

export default routerItems;
