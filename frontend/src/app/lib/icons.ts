import {
  Award,
  BookMarked,
  BookOpen,
  GraduationCap,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export const icons = {
  Award,
  BookMarked,
  BookOpen,
  GraduationCap,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
};

export type IconName = keyof typeof icons;

export function getIcon(name: string) {
  return icons[name as IconName] || BookOpen;
}
