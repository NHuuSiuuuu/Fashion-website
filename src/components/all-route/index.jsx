import { Suspense } from "react";
import { useRoutes } from "react-router";
import { routes } from "@/routes/index.route";

function AllRoute() {
  const element = useRoutes(routes);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="loader-1"></div>
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

export default AllRoute;
