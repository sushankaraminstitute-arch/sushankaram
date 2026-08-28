import { useEffect, useState } from "react";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const fallbackApiData = {
  "/api/home": {
    courses: [
      {
        icon: "Stethoscope",
        title: "NEET Coaching",
        description: "Comprehensive preparation for medical entrance exams with expert faculty",
        color: "text-red-600",
        bgColor: "bg-red-50",
      },
      {
        icon: "BookOpen",
        title: "11th & 12th Classes",
        description: "Medical and Non-Medical streams with complete board exam preparation",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        icon: "GraduationCap",
        title: "6th to 10th Tuition",
        description: "Foundation classes for school students with personalized attention",
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
      {
        icon: "Shield",
        title: "Police Exam",
        description: "Complete preparation for police recruitment exams",
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      },
      {
        icon: "BookMarked",
        title: "Patwari Exam",
        description: "Expert coaching for Patwari examination with updated syllabus",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      },
      {
        icon: "Award",
        title: "JBT & TGT",
        description: "Teacher eligibility preparation with proven track record",
        color: "text-indigo-600",
        bgColor: "bg-indigo-50",
      },
    ],
    features: [
      { icon: "Users", title: "Expert Faculty", description: "Experienced teachers with proven track record" },
      { icon: "BookOpen", title: "Comprehensive Study Material", description: "Well-researched and updated course content" },
      { icon: "TrendingUp", title: "Regular Tests", description: "Mock tests and assessments for better preparation" },
      { icon: "Award", title: "High Success Rate", description: "Proven results with numerous successful students" },
    ],
    achievements: [
      { number: "500+", label: "Students Enrolled" },
      { number: "95%", label: "Success Rate" },
      { number: "10+", label: "Years Experience" },
      { number: "20+", label: "Expert Teachers" },
    ],
  },
  "/api/courses": {
    categories: [
      {
        id: "medical",
        title: "Medical & Science",
        courses: [
          {
            icon: "Stethoscope",
            title: "NEET Coaching",
            description: "Complete preparation for National Eligibility cum Entrance Test",
            duration: "1-2 Years",
            batchSize: "30 Students",
            features: [
              "Comprehensive study material",
              "Regular mock tests and assessments",
              "Doubt clearing sessions",
              "Previous year papers practice",
              "Expert faculty from medical background",
            ],
            color: "text-red-600",
            bgColor: "bg-red-50",
          },
          {
            icon: "BookOpen",
            title: "11th & 12th Medical",
            description: "Complete CBSE/State Board preparation with NEET foundation",
            duration: "2 Years",
            batchSize: "25 Students",
            features: [
              "Physics, Chemistry, Biology coaching",
              "Board exam preparation",
              "NEET foundation courses",
              "Regular tests and assignments",
              "Practical lab sessions",
            ],
            color: "text-blue-600",
            bgColor: "bg-blue-50",
          },
        ],
      },
      {
        id: "school",
        title: "School Education",
        courses: [
          {
            icon: "BookOpen",
            title: "11th & 12th Non-Medical",
            description: "Physics, Chemistry, Mathematics for engineering aspirants",
            duration: "2 Years",
            batchSize: "25 Students",
            features: [
              "PCM comprehensive coaching",
              "Board exam focused preparation",
              "JEE foundation courses",
              "Concept building approach",
              "Regular problem-solving sessions",
            ],
            color: "text-purple-600",
            bgColor: "bg-purple-50",
          },
          {
            icon: "GraduationCap",
            title: "6th to 10th Tuition",
            description: "Foundation classes for all subjects with personalized attention",
            duration: "Flexible",
            batchSize: "20 Students",
            features: [
              "All subjects covered",
              "CBSE & State Board curriculum",
              "Regular tests and homework help",
              "Individual attention to weak areas",
              "Affordable fee structure",
            ],
            color: "text-green-600",
            bgColor: "bg-green-50",
          },
        ],
      },
      {
        id: "competitive",
        title: "Competitive Exams",
        courses: [
          {
            icon: "BookMarked",
            title: "Patwari Exam Preparation",
            description: "Complete coaching for Patwari recruitment examination",
            duration: "6-12 Months",
            batchSize: "40 Students",
            features: [
              "Updated syllabus coverage",
              "General knowledge and current affairs",
              "Mathematics and reasoning",
              "State-specific preparation",
              "Mock tests and practice papers",
            ],
            color: "text-orange-600",
            bgColor: "bg-orange-50",
          },
          {
            icon: "Shield",
            title: "Police Exam Coaching",
            description: "Comprehensive preparation for police recruitment exams",
            duration: "6-12 Months",
            batchSize: "40 Students",
            features: [
              "Written exam preparation",
              "Physical training guidance",
              "General knowledge updates",
              "Mathematics and reasoning",
              "Interview preparation",
            ],
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
          },
          {
            icon: "Award",
            title: "JBT & TGT Preparation",
            description: "Teacher eligibility test preparation with expert guidance",
            duration: "6-12 Months",
            batchSize: "35 Students",
            features: [
              "Complete syllabus coverage",
              "Child development & pedagogy",
              "Subject-specific preparation",
              "Practice tests and assessments",
              "Teaching methodology training",
            ],
            color: "text-teal-600",
            bgColor: "bg-teal-50",
          },
        ],
      },
    ],
    admissionProcess: [
      { step: "1", title: "Contact Us", description: "Call or WhatsApp to inquire about courses" },
      { step: "2", title: "Visit Institute", description: "Visit our campus and meet our faculty" },
      { step: "3", title: "Registration", description: "Complete the registration process" },
      { step: "4", title: "Start Learning", description: "Begin your journey to success" },
    ],
  },
  "/api/about": {
    values: [
      {
        icon: "Target",
        title: "Excellence",
        description: "We strive for excellence in everything we do, from teaching to student support.",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        icon: "Heart",
        title: "Student-Centric",
        description: "Every decision we make puts our students' success and wellbeing first.",
        color: "text-red-600",
        bgColor: "bg-red-50",
      },
      {
        icon: "Lightbulb",
        title: "Innovation",
        description: "We continuously innovate our teaching methods to ensure better learning outcomes.",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
      },
      {
        icon: "Award",
        title: "Integrity",
        description: "We maintain the highest standards of integrity in all our educational practices.",
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
    ],
    features: [
      { icon: "Users", title: "Expert Faculty", description: "Our team comprises experienced educators with deep subject knowledge and passion for teaching." },
      { icon: "BookOpen", title: "Comprehensive Curriculum", description: "Well-structured courses covering all aspects of competitive exams and board preparations." },
      { icon: "TrendingUp", title: "Proven Results", description: "Track record of successful students achieving their academic and career goals." },
      { icon: "Award", title: "Individual Attention", description: "Small batch sizes ensuring personalized attention to every student." },
    ],
  },
  "/api/contact": {
    whatsappNumber: "918894590374",
    contactInfo: [
      {
        icon: "Phone",
        title: "Phone",
        details: ["+91 8894590374"],
        link: "tel:8894590374",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        icon: "MessageCircle",
        title: "WhatsApp",
        details: ["+91 8894590374"],
        link: "https://wa.me/918894590374",
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
      {
        icon: "Mail",
        title: "Email",
        details: ["sushankaraminstitute@gmail.com"],
        link: "mailto:sushankaraminstitute@gmail.com",
        color: "text-red-600",
        bgColor: "bg-red-50",
      },
      {
        icon: "MapPin",
        title: "Address",
        details: ["Raja Ka Talab Main Bazzar", "Teh Fathepur, Distt Kangra"],
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      },
    ],
    officeHours: [
      { day: "Monday - Friday", time: "8:00 AM - 8:00 PM" },
      { day: "Saturday", time: "8:00 AM - 6:00 PM" },
      { day: "Sunday", time: "9:00 AM - 2:00 PM" },
    ],
  },
} satisfies Record<string, unknown>;

type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useApiData<T>(path: string): ApiState<T> {
  const fallbackData = fallbackApiData[path] as T | undefined;
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}${path}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        return response.json() as Promise<T>;
      })
      .then((data) => {
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((error: Error) => {
        if (isMounted) {
          setState({
            data: fallbackData ?? null,
            loading: false,
            error: fallbackData ? null : error.message,
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [path]);

  return state;
}

