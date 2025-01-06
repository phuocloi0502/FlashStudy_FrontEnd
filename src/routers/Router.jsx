import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import { Vocabulary } from "../pages/vocabulary/Vocabulary";
import { Grammar } from "../pages/grammar/Grammar";
import { Home } from "../pages/home/Home";
import { Kanji } from "../pages/kanji/Kanji";
import { Account } from "../pages/account/Account";
import { Blog } from "../pages/blog/Blog";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tuvung",
        element: <Vocabulary />,
      },
      {
        path: "/nguphap",
        element: <Grammar />,
      },
      {
        path: "/kanji",
        element: <Kanji />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
    ],
  },
]);
export default router;
