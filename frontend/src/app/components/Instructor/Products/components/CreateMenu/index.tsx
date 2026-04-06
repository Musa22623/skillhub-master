/** @format */

import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { PRODUCT_CREATE_MENU_ITEMS } from "@/constants";
import CourseDrawer from "../Courses/CreateCourse";
import CreateBundleModal from "../Bundle/CreateBundle";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/app/components/ui/drawer";
import { X } from "lucide-react";
import CreateSession from "../Session/CreateSession";
import CreateCommunity from "../Community";
import CreateSchoolForm from "@/app/components/School/CreateSchool";



interface CreateMenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

type IMenuItem = {
  icon: React.ReactNode;
  title: string;
  id: string;
};

const CreateMenu: React.FC<CreateMenuProps> = ({ open, setOpen }) => {
  // State to track which modal to show
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [openCommunityModel, setOpenCommunityModel] = useState(false);
  const [openBundleModel, setOpenBundleModel] = useState(false);
  const [openSessionModel, setOpenSessionModel] = useState(false);


  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  const handleItemClick = (itemId: string) => {
    setOpen(false);
    // Open the modal for the selected item
    if (itemId === "community") {
      setOpenCommunityModel(true);
    } else if (itemId === "bundle") {
      setOpenBundleModel(true);
    } else if (itemId === "session") {
      setOpenSessionModel(true);
    } else {
      setActiveModal(itemId);
    }
  };
  // Function to close the active modal
  const handleCloseModal = () => {
    setActiveModal(null);
    setOpenCommunityModel(false);
    setOpenBundleModel(false);
    setOpenSessionModel(false);

  };

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className=" px-6 flex-row justify-between border-b">
              <DrawerTitle>Create</DrawerTitle>
              <button onClick={() => setOpen(false)}>
                <X className="size-4" />
              </button>
            </DrawerHeader>

            <section className="flex flex-col items-start space-y-4 gap-4 p-6">
              {PRODUCT_CREATE_MENU_ITEMS.map((item: IMenuItem) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="flex gap-4 items-center font-semibold"
                >
                  <span className="">{item.icon}</span>
                  <span className="text-sm">{item.title}</span>
                </button>
              ))}
            </section>
          </DrawerContent>
        </Drawer>

        {activeModal === "school" && (
          <div className="flex text-start text-black">
            <CreateSchoolForm onClose={handleCloseModal} />
          </div>
        )}

        {activeModal === "course" && (
          <CourseDrawer onClose={handleCloseModal} />
        )}

        {openCommunityModel && (
          <CreateCommunity
            open={openCommunityModel}
            setOpen={setOpenCommunityModel}
          />
        )}

        {openBundleModel && (
          <CreateBundleModal
            open={openBundleModel}
            setOpen={setOpenBundleModel}
          />
        )}

        {openSessionModel && (
          <CreateSession
            open={openSessionModel}
            setOpen={setOpenSessionModel}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <div
          ref={menuRef}
          className={`z-2 absolute top-full right-0 bg-white rounded-lg py-2 px-0 mt-2 min-w-[200px] opacity-0 invisible shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 ${
            open ? "visible opacity-100" : ""
          }`}
        >
          {PRODUCT_CREATE_MENU_ITEMS.map((item: IMenuItem, index: number) => (
            <MenuItem
              icon={item.icon}
              title={item.title}
              onClick={() => handleItemClick(item.id)}
              key={index}
            />
          ))}
        </div>

        {activeModal === "school" && (
          <div className="flex text-start text-black">
            <CreateSchoolForm onClose={handleCloseModal} />
          </div>
        )}

        {activeModal === "course" && (
          <CourseDrawer onClose={handleCloseModal} />
        )}

        {openCommunityModel && (
          <CreateCommunity
            open={openCommunityModel}
            setOpen={setOpenCommunityModel}
          />
        )}

        {openBundleModel && (
          <CreateBundleModal
            open={openBundleModel}
            setOpen={setOpenBundleModel}
          />
        )}

        {openSessionModel && (
          <CreateSession
            open={openSessionModel}
            setOpen={setOpenSessionModel}
          />
        )}
     
      </>
    );
  }
};

export default CreateMenu;
