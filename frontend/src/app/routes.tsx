import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "courses", Component: Courses },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
