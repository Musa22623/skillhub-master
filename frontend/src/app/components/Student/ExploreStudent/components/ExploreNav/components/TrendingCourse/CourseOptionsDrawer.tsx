import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/app/components/ui/drawer";
import { BookmarkSvg, CollectionSvg, PlayListSvg } from "@/app/components/svg";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/app/components/ui/button";
import { StaticImageData } from "next/image";

interface Course {
  id: string;
  title: string;
  author: string;
  image: string | StaticImageData;
  type: string;
  students: string;
  duration: string;
  units: number;
  level: string;
  currentPrice: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  points: Array<{ text: string }>;
}

interface CourseOptionsDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onShowCollections?: () => void;
  course?: Course;
}

export const CourseOptionsDrawer = ({
  isOpen,
  setIsOpen,
  onShowCollections,
  
}: CourseOptionsDrawerProps) => {
  const handleBookmark = () => {
    toast.success("Course saved to bookmarks!");
    setIsOpen(false);
  };

  const handleAddToPlaylist = () => {
    toast.success("Course added to playlist!");
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="mb-4">
        <DrawerHeader className="flex-row items-center justify-between border-b">
          <DrawerTitle>Options</DrawerTitle>
          <Button onClick={() => setIsOpen(false)} variant={"secondary"}>
            <X className="size-4" />
          </Button>
        </DrawerHeader>
        <section className="p-4 overflow-auto no-scrollbar">
          <div className="overflow-x-auto"></div>
          <div className="space-y-2">
            <button
              onClick={handleBookmark}
              className="flex w-full items-center gap-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
            >
              <BookmarkSvg className="w-4 h-4" />
              Save to Bookmarks
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onShowCollections) {
                  onShowCollections();
                  setIsOpen(false); // Close the drawer when opening collection modal
                }
              }}
              className="flex w-full items-center gap-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
            >
              <CollectionSvg className="w-4 h-4" />
              Save to Collection
            </button>

            <button
              onClick={handleAddToPlaylist}
              className="flex w-full items-center gap-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
            >
              <PlayListSvg className="w-4 h-4" />
              Add to Playlist
            </button>
          </div>
        </section>
      </DrawerContent>
    </Drawer>
  );
};
