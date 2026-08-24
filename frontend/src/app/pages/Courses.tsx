import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Clock,
  Users,
  CheckCircle2,
} from "lucide-react";
import { useApiData } from "../lib/api";
import { getIcon } from "../lib/icons";
import { AnimatedPage, AnimatedSection } from "../components/AnimatedPage";

type CoursesData = {
  categories: Array<{
    id: string;
    title: string;
    courses: Array<{
      icon: string;
      title: string;
      description: string;
      duration: string;
      batchSize: string;
      features: string[];
      color: string;
      bgColor: string;
    }>;
  }>;
  admissionProcess: Array<{
    step: string;
    title: string;
    description: string;
  }>;
};

export function Courses() {
  const { data, loading, error } = useApiData<CoursesData>("/api/courses");

  if (loading) {
    return <div className="container mx-auto px-4 py-20 text-center">Loading...</div>;
  }

  if (error || !data) {
    return <div className="container mx-auto px-4 py-20 text-center text-red-600">Unable to load course data.</div>;
  }

  const { categories: courseCategories, admissionProcess } = data;

  return (
    <AnimatedPage>
      {/* Header Section */}
      <AnimatedSection className="bg-gradient-to-r from-blue-600/90 to-indigo-700/90 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="animate-rise max-w-3xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Our Offerings
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our Courses
            </h1>
            <p className="text-lg text-blue-100">
              Choose from our wide range of courses designed to help you achieve your academic and career goals. 
              Expert faculty, comprehensive study material, and proven results.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Courses Section */}
      <AnimatedSection className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="medical" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="medical">Medical & Science</TabsTrigger>
              <TabsTrigger value="school">School Education</TabsTrigger>
              <TabsTrigger value="competitive">Competitive Exams</TabsTrigger>
            </TabsList>

            {courseCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-8">
                {category.courses.map((course, index) => {
                  const Icon = getIcon(course.icon);
                  return (
                    <Card key={index} className="stagger-card overflow-hidden" style={{ animationDelay: `${index * 90}ms` }}>
                      <div className="grid md:grid-cols-3">
                        <div className={`${course.bgColor} p-8 flex flex-col justify-center`}>
                          <div className="mb-4">
                            <Icon className={`w-12 h-12 ${course.color}`} />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 mb-6">
                            {course.description}
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className={`w-4 h-4 ${course.color}`} />
                              <span className="text-gray-700">Duration: {course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className={`w-4 h-4 ${course.color}`} />
                              <span className="text-gray-700">Batch Size: {course.batchSize}</span>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-2 p-8">
                          <h4 className="font-semibold text-gray-900 mb-4">Course Features</h4>
                          <ul className="space-y-3 mb-6">
                            {course.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-4">
                            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                              <a href="https://wa.me/918894590374" target="_blank" rel="noopener noreferrer">
                                Enroll Now
                              </a>
                            </Button>
                            <Button variant="outline" asChild>
                              <a href="https://wa.me/918894590374" target="_blank" rel="noopener noreferrer">
                                Get Details
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </AnimatedSection>

      {/* Admission Process */}
      <AnimatedSection className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Admission Process
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {admissionProcess.map((item, index) => (
                <div key={index} className="stagger-card text-center" style={{ animationDelay: `${index * 90}ms` }}>
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-16 bg-gradient-to-r from-blue-600/90 to-indigo-700/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Contact us today to learn more about our courses and admission process
          </p>
          <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
            <a href="https://wa.me/918894590374" target="_blank" rel="noopener noreferrer">
              Contact on WhatsApp
            </a>
          </Button>
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
}
