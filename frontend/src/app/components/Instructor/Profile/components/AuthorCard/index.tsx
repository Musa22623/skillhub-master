import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface CourseItem {
  id: string;
  title: string;
  thumbnailUrl: string | StaticImageData;
}

interface AuthorCardProps {
  name: string;
  description: string;
  avatarUrl: string;
  courses: CourseItem[];
  totalCourses: number;
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  name,
  description,
  avatarUrl,
  courses,
  totalCourses
}) => {
  return (
      <div className="bg-white">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{name}</h2>
            <p className="text-sm text-gray-700 leading-normal mb-4">{description}</p>
          </div>
          <Image 
            src={avatarUrl} 
            alt={name} 
            width={64}
            height={64}
            className="w-16 h-16 rounded-full ml-4 object-cover"
          />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded flex-1 transition-colors">
            View Profile
          </button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6">
            <path fill="#193cb8" d="M5.64124 3.64124C6.53204 2.75044 7.74022 2.25 9 2.25C10.2598 2.25 11.468 2.75044 12.3588 3.64124C13.2496 4.53204 13.75 5.74022 13.75 7C13.75 8.25978 13.2496 9.46796 12.3588 10.3588C11.468 11.2496 10.2598 11.75 9 11.75C7.74022 11.75 6.53204 11.2496 5.64124 10.3588C4.75044 9.46796 4.25 8.25978 4.25 7C4.25 5.74022 4.75044 4.53204 5.64124 3.64124ZM9 3.75C8.13805 3.75 7.3114 4.09241 6.7019 4.7019C6.09241 5.3114 5.75 6.13805 5.75 7C5.75 7.86195 6.09241 8.6886 6.7019 9.2981C7.3114 9.90759 8.13805 10.25 9 10.25C9.86195 10.25 10.6886 9.90759 11.2981 9.2981C11.9076 8.6886 12.25 7.86195 12.25 7C12.25 6.13805 11.9076 5.3114 11.2981 4.7019C10.6886 4.09241 9.86195 3.75 9 3.75ZM15.2734 2.94385C15.3762 2.54258 15.7848 2.30058 16.186 2.40332C17.2078 2.66493 18.1134 3.25915 18.7601 4.09231C19.4068 4.92547 19.7578 5.95018 19.7578 7.00488C19.7578 8.05959 19.4068 9.08429 18.7601 9.91745C18.1134 10.7506 17.2078 11.3448 16.186 11.6064C15.7848 11.7092 15.3762 11.4672 15.2734 11.0659C15.1707 10.6646 15.4127 10.2561 15.814 10.1533C16.5131 9.97433 17.1327 9.56775 17.5752 8.99769C18.0177 8.42763 18.2578 7.72652 18.2578 7.00488C18.2578 6.28324 18.0177 5.58213 17.5752 5.01207C17.1327 4.44201 16.5131 4.03544 15.814 3.85645C15.4127 3.7537 15.1707 3.34512 15.2734 2.94385ZM7 15.75C6.13805 15.75 5.3114 16.0924 4.7019 16.7019C4.09241 17.3114 3.75 18.138 3.75 19V21C3.75 21.4142 3.41421 21.75 3 21.75C2.58579 21.75 2.25 21.4142 2.25 21V19C2.25 17.7402 2.75044 16.532 3.64124 15.6412C4.53204 14.7504 5.74022 14.25 7 14.25H10C10.4142 14.25 10.75 14.5858 10.75 15C10.75 15.4142 10.4142 15.75 10 15.75H7Z" clipRule="evenodd" fillRule="evenodd"></path>
            <path fill="#193cb8" d="M16.4825 13.0684C16.7409 13.0684 16.9811 13.2014 17.1182 13.4205L18.3027 15.3131L20.4686 15.8547C20.7194 15.9174 20.9201 16.1047 21 16.3505C21.0799 16.5963 21.0276 16.8659 20.8616 17.064L19.4276 18.7753L19.5818 21.0026C19.5997 21.2604 19.4835 21.5093 19.2745 21.6612C19.0654 21.8131 18.7928 21.8466 18.5531 21.75L16.4825 20.915L14.4118 21.75C14.1721 21.8466 13.8996 21.8131 13.6905 21.6612C13.4814 21.5093 13.3653 21.2604 13.3831 21.0026L13.5374 18.7753L12.1034 17.064C11.9374 16.8659 11.8851 16.5963 11.965 16.3505C12.0448 16.1047 12.2456 15.9174 12.4963 15.8547L14.6623 15.3131L15.8467 13.4205C15.9838 13.2014 16.224 13.0684 16.4825 13.0684ZM16.4825 15.2321L15.7734 16.3652C15.6705 16.5297 15.5078 16.6479 15.3196 16.6949L14.0228 17.0192L14.8813 18.0437C15.0059 18.1924 15.0681 18.3836 15.0547 18.5772L14.9623 19.9107L16.202 19.4108C16.3819 19.3382 16.583 19.3382 16.763 19.4108L18.0026 19.9107L17.9103 18.5772C17.8969 18.3836 17.959 18.1924 18.0836 18.0437L18.9421 17.0192L17.6454 16.6949C17.4572 16.6479 17.2945 16.5297 17.1916 16.3652L16.4825 15.2321Z" clipRule="evenodd" fillRule="evenodd"></path>
          </svg>
        </div>

        <div className="h-px bg-gray-200 mb-4"></div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-gray-500">COURSES</span>
          <a href="#" className="text-sm text-teal-500 no-underline">See all ({totalCourses})</a>
        </div>

        <div className="flex flex-col gap-4">
          {courses.map((course) => (
            <div key={course.id} className="flex gap-3 items-center">
              <Image
                src={course.thumbnailUrl} 
                alt={course.title} 
                height={48}
                width={48}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <h3 className="text-sm font-semibold text-gray-900 leading-snug">{course.title}</h3>
            </div>
          ))}
        </div>
      </div>
  );
};

// Sample data for demonstration


// Default component export with sample data
export default AuthorCard;