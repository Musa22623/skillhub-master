"use client";
import EditCourse from "../components/EditCourse"
import { useState } from "react";


const EditCoursePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  return <EditCourse open={isOpen} setOpen={setIsOpen} />;
};

export default EditCoursePage;
