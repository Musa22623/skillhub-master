/** @format */

import {
  EditPenIcon,
  PlusSquareIcon,
  BundleSvg,
  VideoSvg,
  SubscriptionSvg,
  CurrencyIcon,
  SettingsIcon,
  CourseSvg,
  EyeIcon,
  InvoiceIcon,
  ChartIcon,
  CommunitySvg,
  MailIcon,
  SpaceIcon,
  EditPenIcon2,
  DeleteIcon,
} from "@/app/components/svg";
import { SVGProps, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/app/components/ui/drawer";

import CreateSessionEdit from "../../../../Session/EditSession";

import Image, {StaticImageData} from 'next/image';
import img5 from '@/assets/img5.jpg';
import {useIsMobile} from '@/hooks/use-mobile';
import EditSchoolForm from '@/app/components/School/EditSchool';
import {useRouter} from 'next/navigation'; // ✅ Correct import
import EditMobileCourse from "@/app/components/EditCourse/componets/Mobile";

export const getBundleItems = () => [
  {
    id: 1,
    title: "Web Development Pro",
    price: "$199.99",
    isSelected: true,
    imageurl: img5,
  },
  {
    id: 2,
    title: "Data Science Master",
    price: "$249.99",
    isSelected: false,
    imageurl: img5,
  },
  {
    id: 3,
    title: "UI/UX Design Elite",
    price: "$179.99",
    isSelected: false,
    imageurl: img5,
  },
];

export const getSessionItems = () => [
  {
    id: 1,
    title: "Advanced JavaScript Concepts",
    price: "$199.99",
    isSelected: true,
    imageurl: img5,
  },
  {
    id: 2,
    title: "React Performance Workshop",
    price: "$249.00",
    isSelected: false,
    imageurl: img5,
  },
  {
    id: 3,
    title: "System Design Deep Dive",
    price: "$99",
    isSelected: false,
    imageurl: img5,
  },
];

export const getSubscriptionItems = () => [
  {
    id: 1,
    title: "Pro Developer Plan",
    price: "$49/mo",
    isSelected: true,
    imageurl: img5,
  },
  {
    id: 2,
    title: "Enterprise Team",
    price: "$299/mo",
    isSelected: false,
    imageurl: img5,
  },
  {
    id: 3,
    title: "Student Access",
    price: "$29/mo",
    isSelected: false,
    imageurl: img5,
  },
];

export type MenuItem = {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  hasSubmenu?: boolean;
  onClick?: () => void;
};

// Add section support to menu items
export type MenuSection = {
  title?: string;
  items: MenuItem[];
};

export type MenuItems = {
  [key: string]: MenuSection[];
};

// Updated menu items with sections

const getSubmenuItems = (label: string) => {
  switch (label) {
    case "Add to Bundle":
    case "Link to Course":
      return getSessionItems();
    case "View Linked Courses":
      return getBundleItems();
    case "Link to Session":
    case "Included Products":
      return getBundleItems();
    case "View Linked Sessions":
      return getSessionItems();
    case "Add to Subscription":
      return getSubscriptionItems();
    default:
      return [];
  }
};
interface ProductCardProps {
  id: string;
  image: string;
  type: string;
  status?: string;
  title: string;
  price?: string;
  students?: string;
  members?: string;
  posts?: string;
  spaces?: string;
  certificates?: string;
  subscribers?: string;
  products?: string;
  lastActivity: string;
  action?: string;
}
interface MenuDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  product: ProductCardProps;
}

const MenuDrawer = ({open, setOpen, type, product}: MenuDrawerProps) => {
	const router = useRouter();

	const [submenuState, setSubmenuState] = useState<{
		isOpen: boolean;
		currentLabel: string;
		items: {
			id: number;
			title: string;
			price?: string;
			isSelected: boolean;
			imageurl: string | StaticImageData;
		}[];
	}>({
		isOpen: false,
		currentLabel: '',
		items: [],
	});
	const [isEditSchoolPopupOpen, setIsEditSchoolPopupOpen] =
		useState<boolean>(false);
	const [isEditSessionPopupOpen, setIsEditSessionPopupOpen] =
		useState<boolean>(false);

  const [isEditCoursePopupOpen,setIsEditCoursePopupOpen] = useState<boolean>(false);

	const encryptedId = btoa(product.id.toString());

	const menuItems: MenuItems = {
		course: [
			{
				title: 'Course Management',
				items: [
					{icon: PlusSquareIcon, label: 'Request Approval'},
					{
						icon: EditPenIcon,
						label: 'Edit Landing Page',
						onClick: () => setIsEditCoursePopupOpen(true),
					},
					{icon: BundleSvg, label: 'Add to Bundle', hasSubmenu: true},
					{icon: VideoSvg, label: 'Link to Session', hasSubmenu: true},
					{
						icon: SubscriptionSvg,
						label: 'Add to Subscription',
						hasSubmenu: true,
					},
				],
			},
			{
				title: 'Settings & Controls',
				items: [
					{icon: CurrencyIcon, label: 'Edit Price'},
					{icon: SettingsIcon, label: 'Edit Settings'},
					{icon: CourseSvg, label: 'Edit Course Activities'},
				],
			},
			{
				title: 'View & Reports',
				items: [
					{icon: ChartIcon, label: 'View Report'},
					{icon: EyeIcon, label: 'View Course Details Page'},
					{
						icon: InvoiceIcon,
						label: 'View Sales History',
						onClick: () =>
							router.push(`/instructor/sales-history?product_id=${product.id}`),
					},
					{icon: CommunitySvg, label: 'View Linked Community'},
					{
						icon: MailIcon,
						label: 'New Announcement',
						onClick: () =>
							router.push(`/instructor/marketing?product_id=${encryptedId}`),
					},
				],
			},
		],
		session: [
			{
				items: [
					{icon: PlusSquareIcon, label: 'Request Approval'},
					{
						icon: EditPenIcon,
						label: 'Edit Landing Page',
						onClick: () => setIsEditSessionPopupOpen(true),
					},
					{icon: CurrencyIcon, label: 'Edit Price'},
					{icon: SettingsIcon, label: 'Edit Settings'},
				],
			},
			{
				items: [
					{icon: BundleSvg, label: 'Add to Bundle', hasSubmenu: true},
					{icon: VideoSvg, label: 'Link to Session', hasSubmenu: true},
					{
						icon: SubscriptionSvg,
						label: 'Add to Subscription',
						hasSubmenu: true,
					},
				],
			},
			{
				items: [
					{icon: CourseSvg, label: 'Edit Session Activities'},
					{icon: EyeIcon, label: 'View Session Details Page'},
					{
						icon: InvoiceIcon,
						label: 'View Sales History',
						onClick: () =>
							router.push(`/instructor/sales-history?product_id=${product.id}`),
					},
					{icon: ChartIcon, label: 'View Report'},
					{icon: CommunitySvg, label: 'View Linked Community'},
					{
						icon: MailIcon,
						label: 'New Announcement',
						onClick: () =>
							router.push(`/instructor/marketing?product_id=${encryptedId}`),
					},
				],
			},
		],
		community: [
			{
				items: [
					{icon: EditPenIcon, label: 'Edit Details'},
					{icon: EyeIcon, label: 'View community'},
				],
			},
			{
				items: [
					{icon: CourseSvg, label: 'Link to Course', hasSubmenu: true},
					{icon: SpaceIcon, label: 'Edit Space Details'},
					{icon: SpaceIcon, label: 'View Linked Products'},
				],
			},
		],
		bundle: [
			{
				items: [
					{icon: BundleSvg, label: 'Edit Bundle Details'},
					{icon: SpaceIcon, label: 'Included Products', hasSubmenu: true},
					{icon: CurrencyIcon, label: 'Edit Price'},
				],
			},
			{
				items: [
					{
						icon: MailIcon,
						label: 'New Announcement',
						onClick: () =>
							router.push(`/instructor/marketing?product_id=${encryptedId}`),
					},
					{
						icon: InvoiceIcon,
						label: 'View Sales History',
						onClick: () =>
							router.push(`/instructor/sales-history?product_id=${product.id}`),
					},
				],
			},
		],
		subscription: [
			{
				items: [
					{icon: SubscriptionSvg, label: 'View Subscription Details'},
					{icon: SpaceIcon, label: 'Included Products', hasSubmenu: true},
				],
			},
			{
				items: [
					{
						icon: MailIcon,
						label: 'New Announcement',
						onClick: () =>
							router.push(`/instructor/marketing?product_id=${encryptedId}`),
					},
					{
						icon: InvoiceIcon,
						label: 'View Sales History',
						onClick: () =>
							router.push(`/instructor/sales-history?product_id=${product.id}`),
					},
				],
			},
		],
		school: [
			{
				items: [
					{
						icon: EditPenIcon2,
						label: 'Edit School',
						onClick: () => setIsEditSchoolPopupOpen(true),
					},
					{icon: EyeIcon, label: 'Preview'},
				],
			},
			{
				items: [
					{icon: CourseSvg, label: 'View Linked Courses', hasSubmenu: true},
					{icon: VideoSvg, label: 'View Linked Sessions', hasSubmenu: true},
				],
			},
			{
				items: [{icon: DeleteIcon, label: 'Delete School'}],
			},
		],
		default: [
			{
				items: [
					{icon: EditPenIcon, label: 'Edit'},
					{icon: SettingsIcon, label: 'Settings'},
				],
			},
		],
	};

  const sections = menuItems[type] || menuItems.default;

  const handleSubMenuClick = (label: string) => {
    try {
      const submenuItems = getSubmenuItems(label);
      setSubmenuState({
        isOpen: true,
        currentLabel: label,
        items: Array.isArray(submenuItems) ? submenuItems : [],
      });
    } catch (error) {
      console.error("Error loading submenu:", error);
      setSubmenuState({
        isOpen: true,
        currentLabel: label,
        items: [],
      });
    }
  };

  const closeSubmenu = () => {
    setSubmenuState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="">
            <section className="overflow-y-auto pt-2 px-4 pb-2">
              {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="">
                  {/* Section Header */}
                  {section.title && (
                    <h3 className="text-xs  font-semibold text-gray-500 uppercase tracking-wider mb-4 mt-2 ">
                      {section.title}
                    </h3>
                  )}

                  {/* Section Items */}

                  {section.items.map((item, itemIndex) => (
                    <div
                      key={`${sectionIndex}-${itemIndex}`}
                      className="flex items-center gap-4 flex-1 p-4 rounded-md cursor-pointer font-semibold active:bg-[#f5f5f5]"
                      onClick={
                        item.hasSubmenu
                          ? () => handleSubMenuClick(item.label)
                          : item.onClick
                      }
                    >
                      <item.icon className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700 text-sm flex-1">
                        {item.label}
                      </span>
                      {item.hasSubmenu && (
                        <ChevronRight className="w-4 h-4 text-gray-700 stroke-gray-500" />
                      )}
                    </div>
                  ))}

                  {/* Divider between sections (except the last one) */}
                  {section.title && sectionIndex < sections.length - 1 && (
                    <div className="border-b border-gray-100 my-6"></div>
                  )}
                </div>
              ))}
            </section>
          </DrawerContent>
        </Drawer>

        {/* Submenu Drawer - Independent from parent drawer */}
        <Drawer open={submenuState.isOpen} onOpenChange={closeSubmenu}>
          <DrawerContent className="min-h-fit">
            <DrawerHeader className="flex-row justify-between items-center py-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={closeSubmenu}
                  className=" w-8 h-8 flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <DrawerTitle>{submenuState.currentLabel}</DrawerTitle>
              </div>
            </DrawerHeader>

            <section className="overflow-y-auto pt-2 px-4 pb-4">
              {Array.isArray(submenuState.items) &&
              submenuState.items.length > 0 ? (
                submenuState.items.map(
                  (subItem: {
                    id: number;
                    title: string;
                    price?: string;
                    isSelected: boolean;
                    imageurl: string | StaticImageData;
                  }) => (
                    <div
                      key={subItem.id || `item-${subItem.title}`}
                      className="flex items-center mb-2 gap-4 active:bg-[#f5f5f5] p-2.5 rounded-md"
                    >
                      {
                        <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={subItem.imageurl}
                            alt={subItem.title || "Item"}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      }
                      <div className="flex-1">
                        <p className="text-sm font-semibold">
                          {subItem.title || "Untitled Item"}
                        </p>
                        {subItem.price && (
                          <p className="text-xs text-gray-500">
                            {subItem.price}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 p-1 justify-end hover:bg-red-500 hover:text-white hover:rounded ">
                        <X className="size-4" />
                      </div>
                    </div>
                  )
                )
              ) : (
                <p className="text-sm text-gray-500 py-4 text-center">
                  No items available
                </p>
              )}
            </section>
          </DrawerContent>
        </Drawer>

        {isEditSchoolPopupOpen && (
          <EditSchoolForm
            product={product}
            onClose={() => setIsEditSchoolPopupOpen(false)}
          />
        )}
        {isEditSessionPopupOpen && (
          <CreateSessionEdit
            open={isEditSessionPopupOpen}
            session={product}
            setOpen={() => setIsEditSessionPopupOpen(false)}
          />
        )}
        {
          isEditCoursePopupOpen && (
            <EditMobileCourse
            open={isEditCoursePopupOpen}
            onClose={() => setIsEditCoursePopupOpen(false)}
          />
          )
        }
      </>
    );
  }
};

export default MenuDrawer;
