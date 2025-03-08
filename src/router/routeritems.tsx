import ComingSoon from "../page/comingsoon";
import Error404 from "../page/error/404";
// import Main from "../page/main/Main";
// import Memo from "../page/memo/Memo";
// import Write from "../page/write/Write";

const routerItems = [
  {
    path: "/",
    element: <ComingSoon />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
  // {
  //   path: "/memo",
  //   element: <Memo />,
  // },
  // {
  //   path: "/write/:memo",
  //   element: <Write />,
  // },
];

export default routerItems;
