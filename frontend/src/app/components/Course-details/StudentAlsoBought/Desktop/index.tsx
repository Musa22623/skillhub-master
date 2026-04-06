import Image from 'next/image';
import React from 'react';
import { Button } from '@/app/components/ui/button';
import { ChevronRight } from 'lucide-react';

const StudentsAlsoBought = () => {
  // Course data
  const courses = [
    {
      id: 1,
      title: "Advanced UI/UX Design Masterclass: From Concept to Implementation",
      description: "Master the complete UI/UX design workflow from research to final implementation with real-world projects.",
      image: "https://i.ibb.co/5NTkykV/product3.jpg",
      students: "12.5K",
      rating: "4.9",
      duration: "2.5h",
      currentPrice: "$89.99",
      originalPrice: "$129.99"
    },
    {
      id: 2,
      title: "Frontend Development: Master React, Redux & Modern Web Development",
      description: "Learn modern frontend development with React, Redux and the latest web technologies through hands-on projects.",
      image: "https://i.ibb.co/LJwrLdW/coaching-image.webp",
      students: "8.2K",
      rating: "4.9",
      duration: "3.5h",
      currentPrice: "$59.99",
      originalPrice: "$89.99"
    },
    {
      id: 3,
      title: "Full Stack Web Development: Build Modern Web Applications",
      description: "Become a full-stack developer by mastering both frontend and backend technologies with practical projects.",
      image: "https://i.ibb.co/60MjrnYw/product1.webp",
      students: "15.7K",
      rating: "4.9",
      duration: "4.5h",
      currentPrice: "$49.99",
      originalPrice: "$79.99"
    }
  ];

  // SVG icons
  const icons = {
    students: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
        <path fill="#6F767E" d="M9.72154 3.47033C9.90035 3.39881 10.0998 3.39881 10.2786 3.47033L18.612 6.80366C18.8967 6.91756 19.0834 7.19334 19.0834 7.50002V12.5C19.0834 12.9142 18.7476 13.25 18.3334 13.25C17.9192 13.25 17.5834 12.9142 17.5834 12.5V8.6078L15.7501 9.34113V13.3334C15.7501 14.4243 14.9016 15.2566 13.871 15.7719C12.8053 16.3048 11.4126 16.5834 10.0001 16.5834C8.58758 16.5834 7.19484 16.3048 6.12914 15.7719C5.09852 15.2566 4.25008 14.4243 4.25008 13.3334V9.34113L1.38821 8.19638C1.10346 8.08248 0.916748 7.8067 0.916748 7.50002C0.916748 7.19334 1.10346 6.91756 1.38821 6.80366L9.72154 3.47033ZM5.29422 8.14324C5.2838 8.13879 5.27326 8.13457 5.2626 8.13059L3.68619 7.50002L10.0001 4.97446L16.314 7.50002L14.7376 8.13059C14.7269 8.13457 14.7164 8.13879 14.7059 8.14323L10.0001 10.0256L5.29422 8.14324ZM5.75008 9.94113V13.3334C5.75008 13.5685 5.95521 14.0079 6.79996 14.4303C7.60962 14.8351 8.76042 15.0834 10.0001 15.0834C11.2397 15.0834 12.3905 14.8351 13.2002 14.4303C14.0449 14.0079 14.2501 13.5685 14.2501 13.3334V9.94113L10.2786 11.5297C10.0998 11.6012 9.90035 11.6012 9.72154 11.5297L5.75008 9.94113Z" clipRule="evenodd" fillRule="evenodd"/>
      </svg>
    ),
    rating: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 4.875a.75.75 0 01.648.372l1.994 3.414 3.893.85a.75.75 0 01.395 1.238l-2.646 2.905.414 3.892a.75.75 0 01-1.042.768L12 16.744l-3.656 1.57a.75.75 0 01-1.042-.768l.414-3.892L5.07 10.75a.75.75 0 01.395-1.238l3.893-.85 1.994-3.414A.75.75 0 0112 4.875zm0 2.237l-1.512 2.59a.75.75 0 01-.488.354l-2.946.643 1.998 2.195a.75.75 0 01.191.584L8.93 16.43l2.775-1.192a.75.75 0 01.592 0l2.775 1.192-.314-2.952a.75.75 0 01.191-.584l1.998-2.195L14 10.056a.75.75 0 01-.488-.355L12 7.112z" clipRule="evenodd" fillRule="evenodd"/>
      </svg>
    ),
    duration: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 32 32">
        <path fill="#6F767E" d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z" clipRule="evenodd" fillRule="evenodd"/>
      </svg>
    ),
    cart: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
        <path fill="white" d="M22.5 16.14L23.92 6l-18.8-.81L4.92 4A4.43 4.43 0 002.51.8L.58 0 0 1.39l1.88.78a2.88 2.88 0 011.56 2.11l2.5 14.86a2.54 2.54 0 103.57 3h5.93a2.54 2.54 0 100-1.5H9.52a2.53 2.53 0 00-2.1-1.79l-.31-1.83 15.39-.88zm-4.65 4.21a1 1 0 11-.1 1.997 1 1 0 01.1-1.997zm4.36-12.92l-1 7.29-14.33.84-1.51-8.85 16.84.72zM8.14 21.4a1 1 0 11-2 0 1 1 0 012 0z"/>
      </svg>
    )
  };

  // Course card component
  interface Course {
    id: number;
    title: string;
    description: string;
    image: string;
    students: string;
    rating: string;
    duration: string;
    currentPrice: string;
    originalPrice: string;
  }

  const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="max-lg:last:col-span-2 bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-transform duration-300 hover:translate-y-[-4px] hover:shadow-lg">
      <Image
        src={course.image} 
        alt={`Course: ${course.title}`} 
        width={144}
        height={144}
        className="w-full h-36 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col h-[calc(100%-9rem)] justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[42px]">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2 min-h-[40px]">
            {course.description}
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center gap-3 text-gray-500 text-sm mb-4">
            <div className="flex items-center gap-1.5 font-semibold">
              {icons.students}
              {course.students}
            </div>
            <div className="flex items-center gap-1.5 font-semibold">
              {icons.rating}
              {course.rating}
            </div>
            <div className="flex items-center gap-1.5 font-semibold">
              {icons.duration}
              {course.duration}
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-[#13C4CC]">{course.currentPrice}</span>
              <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
            </div>
            
            <button className="w-full bg-[#13C4CC] text-white py-2.5 px-5 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#11b3ba] transition-colors">
              {icons.cart}
              <span className="font-semibold">Buy {course.currentPrice}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" bg-white p-4 lg:p-6 rounded-xl shadow-sm">
      <div className="mb-6 flex items-center justify-between ">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Students Also Bought</h2>
        <Button size={'sm'} variant='outline' className='rounded'>
            <ChevronRight/>
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default StudentsAlsoBought;