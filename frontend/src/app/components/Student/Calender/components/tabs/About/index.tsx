import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { CourseCard } from "./components/course-card";
import { LeaderboardSection } from "./components/leaderboard-section";
import { StatCard } from "./components/stat-card";
import { useState } from "react";
import { EventsCard } from "./components/event-card";
export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  // const [isOpenEvent, setIsOpenEvent] = useState(true);
  return (
    <div className="w-full ">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900">
        The 4D Copywriting School
      </h1>

      {/* Banner with instructor avatar */}
      <div className="relative mb-8">
        <div className="overflow-hidden rounded-xl">
          <Image
            src="https://i.ibb.co/jJ4GHXP/img1.jpg"
            alt="4D Copywriting School"
            width={1000}
            height={240}
            className="h-60 w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-6 left-8 rounded-full border-4 border-white bg-white p-1 shadow-md">
          <Image
            src="https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg"
            alt="Instructor"
            width={65}
            height={65}
            className="h-14 w-14 rounded-full"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-8 text-[#3B6E91]">
        <p>
          The best place to be to become a full-time freelance copywriter. Join
          our community of passionate writers and learn from experienced
          professionals.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link
          href="#"
          className="flex items-center gap-3 p-4 rounded-[8px] bg-[#f8f9fd] text-[#142E53] no-underline font-semibold transition-all duration-200 ease-in-out"
        >
          💎 1-on-1 4DCI Mentorship
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 p-4 rounded-[8px] bg-[#f8f9fd] text-[#142E53] no-underline font-semibold transition-all duration-200 ease-in-out"
        >
          ✍️ 4D Copywriting Academy 2.0
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 p-4 rounded-[8px] bg-[#f8f9fd] text-[#142E53] no-underline font-semibold transition-all duration-200 ease-in-out"
        >
          🧠 $D Copyright Map
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard label="Members" value="44.8k" />
        <StatCard label="Products" value="9" />
        <StatCard label="Posts" value="5.7k" />
      </div>

      {/* Leaderboard Section */}
      <LeaderboardSection />

      {/* Courses Section */}
      <div className="mb-4">
        <div
          className="flex items-center justify-between border-b pb-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-xl font-bold text-gray-800">Courses</h2>
          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="The 7 Habits of Highly Effective People"
              author="Stephen Covey"
              image="https://i.ibb.co/jJ4GHXP/img1.jpg"
              price="$14.99"
              originalPrice="$89.99"
              rating={4.8}
              reviews={2300}
              level="Beginner"
              duration="1.5h"
              students="35k"
              points={[
                "Master proven strategies for personal effectiveness through hands-on exercises",
                "Develop proactive mindset and build sustainable habits with scientifically-backed techniques",
                "Transform your approach to life and work using paradigm-shifting principles",
              ]}
            />

            <CourseCard
              title="How to Win Friends and Influence People"
              author="Dale Carnegie"
              image="https://i.ibb.co/jJ4GHXP/img1.jpg"
              price="$19.99"
              originalPrice="$99.99"
              rating={4.9}
              reviews={1900}
              level="Advanced"
              duration="2.5h"
              students="28k"
              points={[
                "Master the art of communication through practical exercises and real-world scenarios",
                "Build lasting relationships using proven psychological principles",
                "Enhance leadership capabilities with time-tested methods for influence",
              ]}
            />

            <CourseCard
              title="Think and Grow Rich"
              author="Napoleon Hill"
              image="https://i.ibb.co/jJ4GHXP/img1.jpg"
              price="$24.99"
              originalPrice="$129.99"
              rating={4.7}
              reviews={2800}
              level="Intermediate"
              duration="3.5h"
              students="42k"
              points={[
                "Master the foundational principles of wealth creation and financial success",
                "Develop the mindset and habits of successful entrepreneurs and business leaders",
                "Apply proven strategies for goal achievement and personal transformation",
              ]}
            />
          </div>
        )}
      </div>

      {/* Events Section */}
      <div className="mb-8">
        <div
          className="flex cursor-pointer items-center justify-between border-b pb-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-xl font-bold text-gray-800">Events</h2>
          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <EventsCard
              title="Advanced Machine Learning Workshop"
              author="Dr. Sarah Connor"
              image="https://i.ibb.co/jJ4GHXP/img1.jpg"
              thumbnail="https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg"
              description="Deep dive into advanced ML algorithms, neural networks, and practical applications."
              sessionType="1on1"
              participants="28k"
              engagementCount="2.3k"
            />

            <EventsCard
              title="Web Development Masterclass"
              author="David Chen"
              image="https://i.ibb.co/jJ4GHXP/img1.jpg"
              thumbnail="https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg"
              description="Master modern web development with React, Node.js, and cloud technologies."
              sessionType="Group"
              participants="35k"
              engagementCount="1.9k"
            />

            <EventsCard
              title="Data Science Bootcamp"
              author="Jane Doe"
              image="https://i.ibb.co/jJ4GHXP/img1.jpg"
              thumbnail="https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg"
              description="Comprehensive bootcamp covering data analysis, visualization, and machine learning."
              sessionType="1on1"
              participants="28k"
              engagementCount="3.1k"
            />

            <EventsCard
              title="AI for Beginners"
              author="John Smith"
              image="https://i.ibb.co/jJ4GHXP/img1.jpg"
              thumbnail="https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg"
              description="An introductory course on AI concepts, tools, and applications for beginners."
              sessionType="Group"
              participants="35k"
              engagementCount="1.2k"
            />
          </div>
        )}
      </div>


    </div>
  );
}
