import Main from "../page/main/Main";
import Memo from "../page/memo/Memo";

const routerItems = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/memo",
    element: <Memo />,
  },
];

export default routerItems;
