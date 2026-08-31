import { createHashRouter } from "react-router-dom";

// public routes
import RootLayout from "../layouts/RootLayout";
import AboutPage from "../pages/public/About";
import ProjectsPage from "../pages/public/Projects";
import ProjectDetailPage from "../pages/public/ProjectDetail";
import Contact from "../pages/public/Contact";
import NotFoundPage from "../pages/public/NotFound";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <AboutPage /> },
      {
        path: "projects",
        children: [
          { index: true, element: <ProjectsPage /> },
          {
            path: ":projectId",
            children: [
              { index: true, element: <ProjectDetailPage /> },
            ],
          },
        ],
      },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
