// component/CourseData.ts
export type ProductType = "courses" | "sessions" | "communities" | "bundles";

export type Course = {
  title: string;
  author: string;
  image: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  students: string;
  points: string[];
  productType: ProductType; // Added productType key
};

  
export const CourseData: Course[] = [
  {
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen Covey",
      image: "https://i.ibb.co/BHcDXgQt/product5.webp",
      price: "$14.99",
      originalPrice: "$89.99",
      rating: 4.8,
      reviews: 2300,
      level: "Beginner",
      duration: "1.5h",
      students: "35k",
      points: [
          "Master proven strategies for personal effectiveness through hands-on exercises",
          "Develop proactive mindset and build sustainable habits with scientifically-backed techniques",
          "Transform your approach to life and work using paradigm-shifting principles",
      ],
      productType: "courses", // Added productType value
  },
  {
      title: "How to Win Friends and Influence People",
      author: "Dale Carnegie",
      image: "https://i.ibb.co/BHcDXgQt/product5.webp",
      price: "$19.99",
      originalPrice: "$99.99",
      rating: 4.9,
      reviews: 1900,
      level: "Advanced",
      duration: "2.5h",
      students: "28k",
      points: [
          "Master the art of communication through practical exercises and real-world scenarios",
          "Build lasting relationships using proven psychological principles",
          "Enhance leadership capabilities with time-tested methods for influence",
      ],
      productType: "courses", // Added productType value
  },
  {
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      image: "https://i.ibb.co/BHcDXgQt/product5.webp",
      price: "$24.99",
      originalPrice: "$129.99",
      rating: 4.7,
      reviews: 2800,
      level: "Intermediate",
      duration: "3.5h",
      students: "42k",
      points: [
          "Master the foundational principles of wealth creation and financial success",
          "Develop the mindset and habits of successful entrepreneurs and business leaders",
          "Apply proven strategies for goal achievement and personal transformation",
      ],
      productType: "courses", // Added productType value
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
    image: "https://i.ibb.co/BHcDXgQt/product5.webp",
    price: "$14.99",
    originalPrice: "$89.99",
    rating: 4.8,
    reviews: 2300,
    level: "Beginner",
    duration: "1.5h",
    students: "35k",
    points: [
        "Master proven strategies for personal effectiveness through hands-on exercises",
        "Develop proactive mindset and build sustainable habits with scientifically-backed techniques",
        "Transform your approach to life and work using paradigm-shifting principles",
    ],
    productType: "courses", // Added productType value
},
{
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    image: "https://i.ibb.co/BHcDXgQt/product5.webp",
    price: "$19.99",
    originalPrice: "$99.99",
    rating: 4.9,
    reviews: 1900,
    level: "Advanced",
    duration: "2.5h",
    students: "28k",
    points: [
        "Master the art of communication through practical exercises and real-world scenarios",
        "Build lasting relationships using proven psychological principles",
        "Enhance leadership capabilities with time-tested methods for influence",
    ],
    productType: "sessions", // Added productType value
},
{
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    image: "https://i.ibb.co/BHcDXgQt/product5.webp",
    price: "$24.99",
    originalPrice: "$129.99",
    rating: 4.7,
    reviews: 2800,
    level: "Intermediate",
    duration: "3.5h",
    students: "42k",
    points: [
        "Master the foundational principles of wealth creation and financial success",
        "Develop the mindset and habits of successful entrepreneurs and business leaders",
        "Apply proven strategies for goal achievement and personal transformation",
    ],
    productType: "communities", // Added productType value
},
{
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    image: "https://i.ibb.co/BHcDXgQt/product5.webp",
    price: "$29.99",
    originalPrice: "$149.99",
    rating: 4.6,
    reviews: 3200,
    level: "Beginner",
    duration: "4h",
    students: "50k",
    points: [
        "Understand the difference between assets and liabilities",
        "Learn how to make money work for you",
        "Develop financial literacy and investment strategies",
    ],
    productType: "bundles", // Added productType value
},
  // Repeat for other objects in the array
];

