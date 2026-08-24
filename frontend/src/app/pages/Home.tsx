import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import classroomSession from "../../assets/classroom-session.jpeg";
import { useApiData } from "../lib/api";
import { getIcon } from "../lib/icons";
import { AnimatedPage, AnimatedSection } from "../components/AnimatedPage";

type HomeData = {
  courses: Array<{
    icon: string;
    title: string;
    description: string;
    color: string;
    bgColor: string;
  }>;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  achievements: Array<{
    number: string;
    label: string;
  }>;
};

export function Home() {
  const { data, loading, error } = useApiData<HomeData>("/api/home");

  if (loading) {
    return <div className="container mx-auto px-4 py-20 text-center">Loading...</div>;
  }

  if (error || !data) {
    return <div className="container mx-auto px-4 py-20 text-center text-red-600">Unable to load home data.</div>;
  }

  const { courses, features, achievements } = data;

  return (
    <AnimatedPage>
      {/* Hero Section */}
      <AnimatedSection className="relative bg-gradient-to-br from-blue-600/90 via-blue-700/90 to-indigo-800/90 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-rise">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Premier Coaching Institute
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Shape Your Future with
                <span className="block text-yellow-300">Quality Education</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Expert coaching for NEET, Competitive Exams, and School Education. 
                Join Sushankaram Institute and achieve your academic dreams.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  <Link to="/courses">
                    Explore Courses <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="border border-white bg-white/15 text-white shadow-sm hover:bg-white hover:text-blue-700">
                  <a href="https://wa.me/918894590374" target="_blank" rel="noopener noreferrer">
                    Contact Us
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="animate-float rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={classroomSession}
                  alt="Teacher leading a classroom session"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Achievements Section */}
      <AnimatedSection className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="stagger-card text-center" style={{ animationDelay: `${index * 90}ms` }}>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Courses Section */}
      <AnimatedSection className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive coaching programs designed to help you excel in your academic and career goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => {
              const Icon = getIcon(course.icon);
              return (
                <Card key={index} className="stagger-card hover:shadow-lg transition-shadow" style={{ animationDelay: `${index * 90}ms` }}>
                  <CardHeader>
                    <div className={`w-12 h-12 ${course.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${course.color}`} />
                    </div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="link" className="p-0 text-blue-600">
                      <Link to="/courses">
                        Learn More <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/courses">
                View All Courses
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Sushankaram Institute?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We are committed to providing quality education and personalized attention to each student, 
                ensuring they achieve their academic and career goals.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = getIcon(feature.icon);
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/about">
                    Learn More About Us
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="animate-float rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={classroomSession}
                  alt="Teacher leading a classroom session"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-16 bg-gradient-to-r from-blue-600/90 to-indigo-700/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of successful students who achieved their dreams with Sushankaram Institute
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              <a href="https://wa.me/918894590374" target="_blank" rel="noopener noreferrer">
                Enroll Now
              </a>
            </Button>
            <Button asChild size="lg" className="border border-white bg-white/15 text-white shadow-sm hover:bg-white hover:text-blue-700">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
}
