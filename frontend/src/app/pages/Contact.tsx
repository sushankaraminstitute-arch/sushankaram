import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { 
  Phone, 
  MapPin, 
  Clock,
  MessageCircle,
  Send
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";
import classroomSession from "../../assets/classroom-session.jpeg";
import { API_BASE_URL, useApiData } from "../lib/api";
import { getIcon } from "../lib/icons";
import { AnimatedPage, AnimatedSection } from "../components/AnimatedPage";

type ContactData = {
  whatsappNumber: string;
  contactInfo: Array<{
    icon: string;
    title: string;
    details: string[];
    link?: string;
    color: string;
    bgColor: string;
  }>;
  officeHours: Array<{
    day: string;
    time: string;
  }>;
};

export function Contact() {
  const { data, loading, error } = useApiData<ContactData>("/api/contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });

  const buildFallbackRedirect = () => {
    const message = `Hello, I would like to inquire about:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nInterested Course: ${formData.course}\nMessage: ${formData.message}`;
    return `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Inquiry failed with ${response.status}`);
      }

      const result = await response.json() as { redirectUrl: string };
      window.open(result.redirectUrl, "_blank");
    } catch {
      window.open(buildFallbackRedirect(), "_blank");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-20 text-center">Loading...</div>;
  }

  if (error || !data) {
    return <div className="container mx-auto px-4 py-20 text-center text-red-600">Unable to load contact data.</div>;
  }

  const { contactInfo, officeHours } = data;

  return (
    <AnimatedPage>
      {/* Header Section */}
      <AnimatedSection className="bg-gradient-to-r from-blue-600/90 to-indigo-700/90 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="animate-rise max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-blue-100">
              Have questions? We'd love to hear from you. Contact us for admissions, course details, or any other inquiries.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Information Cards */}
      <AnimatedSection className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = getIcon(info.icon);
              return (
                <Card key={index} className="stagger-card hover:shadow-lg transition-shadow" style={{ animationDelay: `${index * 90}ms` }}>
                  <CardHeader>
                    <div className={`w-12 h-12 ${info.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${info.color}`} />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {info.link ? (
                      <a 
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`${info.color} hover:underline block`}
                      >
                        {info.details.map((detail, idx) => (
                          <div key={idx} className="text-sm">{detail}</div>
                        ))}
                      </a>
                    ) : (
                      <div className="text-sm text-gray-600">
                        {info.details.map((detail, idx) => (
                          <div key={idx}>{detail}</div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form and Image */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="stagger-card">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 1234567890"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course">Interested Course</Label>
                    <Input
                      id="course"
                      name="course"
                      placeholder="e.g., NEET, 11th Medical, etc."
                      value={formData.course}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your inquiry..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message via WhatsApp
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    This will open WhatsApp with your message ready to send
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Image and Additional Info */}
            <div className="space-y-6">
              <div className="animate-float rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={classroomSession}
                  alt="Teacher leading a classroom session"
                  className="w-full h-[300px] object-cover"
                />
              </div>

              <Card className="stagger-card bg-gradient-to-br from-blue-50 to-indigo-50" style={{ animationDelay: "100ms" }}>
                <CardHeader>
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>Office Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {officeHours.map((item, index) => (
                    <div
                      key={item.day}
                      className={`flex justify-between ${index < officeHours.length - 1 ? "pb-3 border-b border-blue-200" : ""}`}
                    >
                      <span className="text-gray-700">{item.day}</span>
                      <span className="font-semibold text-gray-900">{item.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="stagger-card" style={{ animationDelay: "180ms" }}>
                <CardHeader>
                  <CardTitle>Quick Contact</CardTitle>
                  <CardDescription>
                    For immediate assistance, reach us directly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <a href="https://wa.me/918894590374" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="tel:8894590374">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Map Section - Placeholder */}
      <AnimatedSection className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Find Us Here
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="stagger-card bg-gray-100 rounded-2xl overflow-hidden h-96 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sushankaram Institute of Competitive Exams
                </h3>
                <p className="text-gray-600 mb-4">
                  Raja Ka Talab Main Bazzar<br />
                  Teh Fathepur, Distt Kangra<br />
                  Himachal Pradesh, India
                </p>
                <Button asChild variant="outline">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Raja+Ka+Talab+Main+Bazzar+Fathepur+Kangra" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
}
