import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Target, 
  Eye, 
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import classroomSession from "../../assets/classroom-session.jpeg";
import { useApiData } from "../lib/api";
import { getIcon } from "../lib/icons";
import { AnimatedPage, AnimatedSection } from "../components/AnimatedPage";

type AboutData = {
  values: Array<{
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
};

export function About() {
  const { data, loading, error } = useApiData<AboutData>("/api/about");

  if (loading) {
    return <div className="container mx-auto px-4 py-20 text-center">Loading...</div>;
  }

  if (error || !data) {
    return <div className="container mx-auto px-4 py-20 text-center text-red-600">Unable to load about data.</div>;
  }

  const { values, features } = data;

  return (
    <AnimatedPage>
      {/* Header Section */}
      <AnimatedSection className="bg-gradient-to-r from-blue-600/90 to-indigo-700/90 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="animate-rise max-w-3xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sushankaram Institute of Competitive Exams
            </h1>
            <p className="text-lg text-blue-100">
              Empowering students to achieve their dreams through quality education and dedicated coaching since years.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Introduction Section */}
      <AnimatedSection className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Partner in Academic Excellence
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Sushankaram Institute of Competitive Exams has been a beacon of quality education in 
                Raja Ka Talab, Fathepur, Kangra. We are dedicated to providing comprehensive coaching 
                for various competitive examinations and school education.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Our institute specializes in NEET coaching, 11th & 12th classes for both Medical and 
                Non-Medical streams, tuition classes for 6th to 10th standards, and preparation for 
                competitive exams including Patwari, Police, JBT, and TGT.
              </p>
              <p className="text-lg text-gray-700">
                We believe in nurturing talent and building strong foundations that help students 
                excel not just in exams, but in their future careers and life.
              </p>
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

      {/* Vision & Mission */}
      <AnimatedSection className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="stagger-card border-2 border-blue-100">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  To be the most trusted and preferred educational institute in the region, 
                  known for producing successful students who excel in their chosen fields and 
                  contribute positively to society.
                </p>
              </CardContent>
            </Card>

            <Card className="stagger-card border-2 border-green-100" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  To provide quality education and comprehensive coaching that empowers students 
                  to achieve their academic goals. We are committed to fostering a learning 
                  environment that encourages critical thinking, discipline, and holistic development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      {/* Core Values */}
      <AnimatedSection className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Sushankaram Institute
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = getIcon(value.icon);
              return (
                <Card key={index} className="stagger-card text-center hover:shadow-lg transition-shadow" style={{ animationDelay: `${index * 90}ms` }}>
                  <CardHeader>
                    <div className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                    <CardDescription>{value.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* What Sets Us Apart */}
      <AnimatedSection className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              What Sets Us Apart
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = getIcon(feature.icon);
                return (
                  <div key={index} className="stagger-card flex gap-4" style={{ animationDelay: `${index * 90}ms` }}>
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Location & Contact Info */}
      <AnimatedSection className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Visit Us
            </h2>

            <Card className="stagger-card overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Location</h3>
                  <p className="text-gray-700 mb-6">
                    <strong>Sushankaram Institute of Competitive Exams</strong><br />
                    Raja Ka Talab Main Bazzar<br />
                    Teh Fathepur, Distt Kangra<br />
                    Himachal Pradesh, India
                  </p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Contact Number</p>
                      <a href="tel:8894590374" className="text-lg font-semibold text-blue-600 hover:text-blue-700">
                        +91 8894590374
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">WhatsApp</p>
                      <a 
                        href="https://wa.me/918894590374" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-green-600 hover:text-green-700"
                      >
                        +91 8894590374
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <a href="mailto:info@sushankaram.com" className="text-lg font-semibold text-blue-600 hover:text-blue-700">
                        sushankaraminstitute@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Office Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-semibold text-gray-900">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-semibold text-gray-900">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-semibold text-gray-900">9:00 AM - 2:00 PM</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-6">
                    We welcome walk-in visits during office hours. For admission inquiries, 
                    please feel free to contact us via phone or WhatsApp.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
}
