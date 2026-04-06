// Define types for our data structure
type ProductType = 'Bundle' | 'Subscription' | 'Certificate' | 'Course';
type LinkType = 'session' | 'community';

interface Link {
  type: LinkType;
  title: string;
  items: string[];
  count: number;
}

interface Product {
  id: string;
  title: string;
  image: string;
  type: ProductType;
  typeClass: string;
  price?: number;
  modules?: number;
  expiryDate?: string;
  issueDate?: string;
  certificateCount?: number;
  progress?: number;
  lessons?: number;
  duration?: string;
  rating?: {
    score: number;
    date: string;
  };
  lastActive?: string;
  links?: Link[];
}

// Create products data array
const productsData: Product[] = [
  {
    id: "prod-1",
    title: "The Prompt Mastery bundle",
    image: "https://i.ibb.co/jJ4GHXP/img1.jpg",
    type: "Bundle",
    typeClass: "text-black-800 bg-gray-200",
    price: 89.00,
    modules: 30,
    links: [
      {
        type: "session",
        title: "Book Private Session",
        items: ["Session ABC", "Session XYZ"],
        count: 5
      },
      {
        type: "community",
        title: "Community Access",
        items: ["Community ABC", "Community XYZ"],
        count: 5
      }
    ]
  },
  {
    id: "prod-2",
    title: "The Prompt Mastery Subscription",
    image: "https://i.ibb.co/jJ4GHXP/img1.jpg",
    type: "Subscription",
    typeClass: "text-black-800 bg-gray-200",
    price: 14.99,
    modules: 30,
    expiryDate: "Nov 15, 2024"
  },
  {
    id: "prod-3",
    title: "Certificate of Prompt Mastery",
    image: "https://i.ibb.co/jJ4GHXP/img1.jpg",
    type: "Certificate",
    typeClass: "text-green-800 bg-green-100",
    price: 14.99,
    certificateCount: 695,
    issueDate: "Nov 1, 2024"
  },
  {
    id: "prod-4",
    title: "Advanced Prompt Engineering",
    image: "https://i.ibb.co/jJ4GHXP/img1.jpg",
    type: "Course",
    typeClass: "text-blue-500 bg-blue-200",
    progress: 40,
    lessons: 17,
    duration: "1h 22m",
    rating: {
      score: 4.9,
      date: "Nov 10, 2023"
    },
    lastActive: "Nov 1, 2024",
    links: [
      {
        type: "session",
        title: "Book Private Session",
        items: ["Session ABC", "Session XYZ"],
        count: 5
      },
      {
        type: "community",
        title: "Community Access",
        items: ["Community ABC", "Community XYZ"],
        count: 5
      }
    ]
  }
];

// Import from Lucide React components directly
import { 
  Calendar, 
  DollarSign, 
  LayoutDashboard,
  Video,
  MoveRight,
  MoreVertical,
  Users,
  MessageSquare,
  Award
} from 'lucide-react';

// SVG components to replace custom SVGs
const IconComponents = {
  calendar: Calendar,
  dollar: DollarSign,
  dashboard: LayoutDashboard,
  video: Video,
  moveRight: MoveRight,
  moreVertical: MoreVertical,
  users: Users,
  messageSquare: MessageSquare,
  award: Award
};

export { productsData, IconComponents };