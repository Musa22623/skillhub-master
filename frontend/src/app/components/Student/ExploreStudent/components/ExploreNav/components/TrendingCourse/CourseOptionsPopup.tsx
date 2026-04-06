import { CheckSVG } from "@/app/components/svg";
import { useState } from "react";
import { BookmarkSvg, CollectionSvg, PlayListSvg } from "@/app/components/svg";
import { toast } from "react-toastify";
import { StaticImageData } from "next/image";

interface Course {
  id: string;
  image: string | StaticImageData;
  title: string;
}

interface CourseOptionsPopupProps {
  course: Course;
  onClose: () => void;
  onShowCollections: () => void;
}

export const CourseOptionsPopup = ({
  
  onClose,
  onShowCollections,
}: CourseOptionsPopupProps) => {
  const [showCollections, setShowCollections] = useState(false);
  const [creatingNew, setCreatingNew] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(
    null
  );
  const [collections] = useState([
    { id: 1, name: "Collection A", titles: 1, icon: "😊" },
    { id: 2, name: "Collection B", titles: 63, icon: "🎨" },
    { id: 2, name: "Collection C", titles: 5, icon: "🎨" },
  ]);

  const handleSelectCollection = (id: number) => {
    setSelectedCollectionId(id);
    // trigger backend save action here
    toast.success("Course added to collection!");
  };

  const handleBookmark = () => {
    // Add your bookmark logic here
    toast.success("Course saved to bookmarks!");
    onClose();
  };

  const handleAddToPlaylist = () => {
    // Add your playlist logic here
    toast.success("Course added to playlist!");
    onClose();
  };

  return (
    <>
      <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-md border z-50">
        <div className="p-2">
          <button 
            onClick={handleBookmark}
            className="flex items-center w-full gap-2 p-2 hover:bg-gray-100 text-sm text-gray-800"
          >
            <BookmarkSvg className="w-4 h-4" />
            Save to Bookmarks
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(); // Close the options popup first
              onShowCollections(); // Then show collections
            }}
            className="flex items-center w-full gap-2 p-2 hover:bg-gray-100 text-sm text-gray-800"
          >
            <CollectionSvg className="w-4 h-4" />
            Save to Collection
          </button>
          <button 
            onClick={handleAddToPlaylist}
            className="flex items-center w-full gap-2 p-2 hover:bg-gray-100 text-sm text-gray-800"
          >
            <PlayListSvg className="w-4 h-4" />
            Add to Playlist
          </button>
        </div>
      </div>

      {/* Collection Selection Popup */}
      {showCollections && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCollections(false);
              setCreatingNew(false);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl w-[400px] max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">
                Save to <span className="text-blue-600">Collection</span>
              </h3>
              <button 
                onClick={() => {
                  setShowCollections(false);
                  setCreatingNew(false);
                }}
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
                  onClick={() => setCreatingNew(true)}
                  className="flex items-center gap-3 w-full p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                 +
                  <span className="text-sm font-medium">Create a new collection</span>
                </button>
              )}

              {/* Create New Collection Form */}
              {creatingNew && (
                
                <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                  <input
                    type="text"
                    placeholder="Collection name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                      onClick={() => {
                        setCreatingNew(false);
                        setNewCollectionName("");
                        onClose(); // Close the entire modal
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      disabled={!newCollectionName.trim()}
                      onClick={() => {
                        if (newCollectionName.trim()) {
                          // Here you would normally make an API call to create the collection
                          setCreatingNew(false);
                          setNewCollectionName("");
                          onClose(); // Close the entire modal after creating
                          toast.success("Collection created successfully!");
                        }
                      }}
                    >
                      Create
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
