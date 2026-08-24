import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { AnimatedPage } from "../components/AnimatedPage";

export function NotFound() {
  return (
    <AnimatedPage>
      <div className="relative z-10 min-h-[60vh] flex items-center justify-center bg-gray-50/85 backdrop-blur-xl">
      <div className="animate-rise text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-2">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/courses">
              <ArrowLeft className="w-4 h-4 mr-2" />
              View Courses
            </Link>
          </Button>
        </div>
      </div>
      </div>
    </AnimatedPage>
  );
}
