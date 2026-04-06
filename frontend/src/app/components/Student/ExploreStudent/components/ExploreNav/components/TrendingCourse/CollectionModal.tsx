import { useState } from "react";
import { CheckSVG } from "@/app/components/svg";
import { StaticImageData } from "next/image";

import CreateCollection from "@/app/components/Sidebar/CreateCollectionPopup";
import React from "react";

interface Collection {
  id: number;
  name: string;
  titles: number;
  icon: string;
}

interface Course {
  id: string;
  image: string | StaticImageData;
  title: string;
}

interface CollectionModalProps {
  course: Course;
  onClose: () => void;
}

export const CollectionModal = ({  onClose }: CollectionModalProps) => {
  const [creatingNew, setCreatingNew] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  const [isAddCollectionPopupOpen, setIsAddCollectionPopupOpen] =
        React.useState(false);
  const [collections] = useState<Collection[]>([
    { id: 1, name: "Collection A", titles: 1, icon: "😊" },
    { id: 2, name: "Collection B", titles: 63, icon: "🎨" },
    { id: 3, name: "Collection C", titles: 5, icon: "🎨" },
  ]);

  const handleSelectCollection = (id: number) => {
    setSelectedCollectionId(id);
    // trigger backend save action here
  };

  return (
    <>
      {!isAddCollectionPopupOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-[400px] max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">
              Save to <span className="text-blue-600">Collection</span>
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
      
      <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
        {collections.map((col) => (
          <button
            key={col.id}
            className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => handleSelectCollection(col.id)}
          >
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
              {col.icon}
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-sm font-medium">{col.name}</h4>
              <p className="text-xs text-gray-500">{col.titles} title{col.titles !== 1 ? 's' : ''}</p>
            </div>
            {selectedCollectionId === col.id && (
              <CheckSVG className="w-5 h-5 text-blue-600" />
            )}
          </button>
        ))}
        
        {!creatingNew && (
          <button
            onClick={() => {
              setCreatingNew(true);
              setIsAddCollectionPopupOpen(true);
            }}
            className="flex items-center gap-3 w-full p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 rounded-lg border-2 border-dashed border-blue-600 flex items-center justify-center">
              +
            </div>
            <span className="text-sm font-medium">Create a new collection</span>
          </button>
        )}

        {/* Create New Collection Form */}
      </div>
    </div>
      ) : (
        <CreateCollection onClose={() => {
          setIsAddCollectionPopupOpen(false);
          setCreatingNew(false);
        }} />
      )}
    </>
  );
};
