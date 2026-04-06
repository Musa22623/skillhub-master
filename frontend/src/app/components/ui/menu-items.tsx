import {
  NewEditPenIcon,
  PlusSquareIcon,
 GrayBundleSvg,
  newVideoSvg,
  NewSubscriptionSvg,
  CurrencyIcon,
  SettingsIcon,
  CourseSvg,
  EyeIcon,
  InvoiceIcon,
  ChartIcon,
  CommunitySvg,
  MailIcon,
  SpaceIcon,
  SpaceIcon2,
  EditPenIcon2,
  DeleteIcon
} from "@/app/components/svg";
import { SVGProps } from "react";

export type MenuItem = {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  hasSubmenu?: boolean;
  onClick?: () => void;
};

export type MenuItems = {
  [key: string]: MenuItem[];
};

export const menuItems: MenuItems = {
  course: [
    { icon: PlusSquareIcon, label: "Request Approval" },
    { icon: NewEditPenIcon, label: "Edit Landing Page" },
    { icon: GrayBundleSvg, label: "Add to Bundle", hasSubmenu: true },
    { icon: newVideoSvg, label: "Link to Session", hasSubmenu: true },
    { icon: NewSubscriptionSvg, label: "Add to Subscription", hasSubmenu: true },
    { icon: CurrencyIcon, label: "Edit Price" },
    { icon: SettingsIcon, label: "Edit Settings" },
    { icon: CourseSvg, label: "Edit Course Activities" },
    { icon: EyeIcon, label: "View Course Details Page" },
    { icon: InvoiceIcon, label: "View Sales History" },
    { icon: ChartIcon, label: "View Report" },
    { icon: CommunitySvg, label: "View Linked Community" },
    { icon: MailIcon, label: "New Announcement" },
  ],
  session: [
    { icon: PlusSquareIcon, label: "Request Approval" },
    { icon: NewEditPenIcon, label: "Edit Landing Page" },
    { icon: GrayBundleSvg, label: "Add to Bundle", hasSubmenu: true },
    { icon: newVideoSvg, label: "Link to Session", hasSubmenu: true },
    { icon: NewSubscriptionSvg, label: "Add to Subscription", hasSubmenu: true },
    { icon: CurrencyIcon, label: "Edit Price" },
    { icon: SettingsIcon, label: "Edit Settings" },
    { icon: CourseSvg, label: "Edit Session Activities" },
    { icon: EyeIcon, label: "View Session Details Page" },
    { icon: InvoiceIcon, label: "View Sales History" },
    { icon: ChartIcon, label: "View Report" },
    { icon: CommunitySvg, label: "View Linked Community" },
    { icon: MailIcon, label: "New Announcement" },
  ],
  community: [
    { icon: NewEditPenIcon, label: "Edit Details"},
    { icon: EyeIcon, label: "View community"},
    { icon: CourseSvg, label: "Link to Course", hasSubmenu: true },
    { icon: SpaceIcon, label: "Edit Space Details" },
    { icon: SpaceIcon2, label: "View Linked Products" },
  ],
  bundle: [
    { icon: GrayBundleSvg, label: "Edit Bundle Details"},
    { icon: SpaceIcon2, label: "Included Products", hasSubmenu: true},
    { icon: CurrencyIcon, label: "Edit Price" },
    { icon: MailIcon, label: "New Announcement" },
    { icon: InvoiceIcon, label: "View Sales History" },
  ],
  subscription: [
    { icon: NewSubscriptionSvg, label: "View Subscription Details"},
    { icon: SpaceIcon2, label: "Included Products", hasSubmenu: true},
    { icon: MailIcon, label: "New Announcement" },
    { icon: InvoiceIcon, label: "View Sales History" },
  ],
  school: [
    { icon: EditPenIcon2, label: "Edit School"},
    { icon: EyeIcon, label: "Preview"},
    { icon: CourseSvg, label: "View Linked Courses", hasSubmenu: true },
    { icon: newVideoSvg, label: "View Linked Sessions", hasSubmenu: true },
    { icon: DeleteIcon, label: "Delete School" },
  ],
  default: [
    { icon: NewEditPenIcon, label: "Edit" },
    { icon: SettingsIcon, label: "Settings" },
  ],
};
