import { useState } from 'react';
import Image from 'next/image';

interface AddReviewProps {
  onClose?: () => void;
}

export default function BookReviewModal({ onClose }: AddReviewProps) {
  const [rating, setRating] = useState(0);
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  const maxChars = 2000;

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setComment(e.target.value);
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleSubmit = () => {
    console.log('Review submitted:', { rating, reason, comment });
    if (onClose) onClose();
  };

  return (
    <div className="flex justify-center items-center min-h-screen inset-0 bg-black/30 z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Review this Item</h2>
          <button 
            onClick={handleClose}
            className="text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-5">
          {/* Book Info */}
          <div className="flex gap-4 mb-5 pb-5 border-b border-gray-200">
            <Image
              src="https://i.ibb.co/jJ4GHXP/img1.jpg" 
              alt="Book Cover" 
              className="w-32 h-20 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex flex-col">
              <div className="text-lg font-semibold text-gray-800 mb-1">
                How to Write Better Prompts
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-normal">By </span>
                <span className="font-semibold">Ray Dalio</span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 p-4 rounded mb-5 text-gray-700 text-sm">
            To help us improve this item, please leave a reason and a comment for your rating
          </div>

          {/* Rating Section */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold text-gray-800">
              Your rating<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => handleStarClick(index)}
                  className={`text-2xl cursor-pointer ${
                    index < rating ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Dropdown Section */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold text-gray-800">
              Main reason for your rating<span className="text-red-500 ml-1">*</span>
            </label>
            <select 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="">-- Select --</option>
              <option value="valuable-info">Valuable Information</option>
              <option value="concept-clarity">Concept Clarity</option>
              <option value="engaging-delivery">Engaging Delivery</option>
              <option value="applied-learning">Applied Learning</option>
              <option value="meets-expectations">Meets Expectations</option>
              <option value="instructor-knowledge">Instructor Knowledge</option>
            </select>
          </div>

          {/* Comments Section */}
          <div className="mb-5">
            <div className="flex justify-between mb-1">
              <label className="text-sm text-gray-800">
                <span className="font-semibold">Comments</span> 
                <span className="font-normal">(optional)</span>
              </label>
              <span className="text-xs text-gray-500">
                {maxChars - comment.length}
              </span>
            </div>
            <textarea 
              value={comment}
              onChange={handleCommentChange}
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none text-sm" 
              placeholder="Please describe the reason for your rating.."
            />
          </div>

          {/* Visibility Note */}
          <div className="text-xs text-gray-500 mb-5">
            Your rating and comments will be <span className="font-semibold">publicly visible</span>.
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="flex justify-end gap-2 p-5 border-t border-gray-200">
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded text-sm hover:bg-gray-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}