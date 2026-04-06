import React from "react";
import Image from "next/image";
import Tooltip from "@/app/components/ui/tooltips";

interface ProductCardProps {
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

type IConfig = {
  icon: React.ReactNode;
  items: Array<string>;
  showCount?: boolean;
  total?: number;
  itemType?: "sessions" | "courses" | "communities";
};

const handleMenu = () => {
  
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  type,
  status,
  price,
  students,
  members,
  posts,
  spaces,
  certificates,
  subscribers,
  products,
  lastActivity,
  action,
}) => {
  const statItemClass = "flex items-center gap-1.5 relative";

  const getTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      course: "Course",
      session: "1:1 Session",
      "group-session": "Group Session",
      community: "Community",
      certificate: "Certificate",
      bundle: "Bundle",
      subscription: "Subscription",
    };
    return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      published: "Published",
      draft: "Draft",
      pending: "Pending Approval",
      rejected: "Rejected",
    };
    return statusMap[status] || "";
  };

  const getLabelColor = (type: string) => {
    const typeColorMap: Record<string, string> = {
      course: "text-[#1c4ed8] bg-[#dbe9fe]",
      session: "text-[#991b1b] bg-[#fee2e1]",
      "group-session": "text-[#991b1b] bg-[#fee2e1]",
      community: "text-[#db7303] bg-[#fff3c6]",
      certificate: "text-[#12b76a] bg-[#E5FEF0]",
      bundle: "text-[#343332] bg-[#e4e4e4]",
      subscription: "text-[#343332] bg-[#e4e4e4]",
      published: "text-[#085c37] bg-[#d3f8df]",
      draft: "text-[#343332] bg-[#e4e4e4]",
      pending: "text-[#402fa4] bg-[#e0e4ff]",
      rejected: "text-[#991b1b] bg-[#fee2e1]",
    };

    return typeColorMap[type] || "";
  };

  const getSvgForType = (type: string) => {
    const svgMap: Record<string, React.ReactNode> = {
      price: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          className="w-4 h-4 shrink-0"
        >
          <path
            fill="#343332"
            d="M10.3031 4.71338C10.638 4.71338 10.9096 4.98493 10.9096 5.3199V5.62947C11.7726 5.74654 12.5494 6.11208 13.0363 6.67319C13.2559 6.92617 13.2288 7.30925 12.9758 7.52881C12.7229 7.74837 12.3398 7.72128 12.1202 7.4683C11.8892 7.20209 11.4627 6.96219 10.9096 6.85747V9.13097C11.5063 9.2117 12.0549 9.41056 12.4966 9.70499C13.0803 10.0941 13.5358 10.6984 13.5358 11.4478C13.5358 12.1973 13.0803 12.8015 12.4966 13.1907C12.0549 13.4851 11.5063 13.684 10.9096 13.7647V14.0741C10.9096 14.4091 10.638 14.6806 10.3031 14.6806C9.9681 14.6806 9.69656 14.4091 9.69656 14.0741V13.7645C8.83357 13.6474 8.0568 13.2819 7.5698 12.7208C7.35024 12.4678 7.37733 12.0847 7.63031 11.8652C7.88329 11.6456 8.26636 11.6727 8.48592 11.9257C8.71697 12.1919 9.14345 12.4318 9.69656 12.5365V10.263C9.09982 10.1823 8.55128 9.98342 8.10959 9.68899C7.52581 9.29985 7.07031 8.69563 7.07031 7.94614C7.07031 7.19665 7.52581 6.59244 8.10959 6.2033C8.55128 5.90886 9.09982 5.71 9.69656 5.62928V5.3199C9.69656 4.98493 9.9681 4.71338 10.3031 4.71338ZM9.69656 6.85766C9.33347 6.92644 9.02055 7.0539 8.78241 7.21264C8.4157 7.45709 8.28336 7.7283 8.28336 7.94614C8.28336 8.16399 8.4157 8.4352 8.78241 8.67964C9.02055 8.83839 9.33347 8.96585 9.69656 9.03463V6.85766ZM10.9096 10.3594V12.5363C11.2727 12.4675 11.5856 12.3401 11.8237 12.1813C12.1905 11.9369 12.3228 11.6657 12.3228 11.4478C12.3228 11.23 12.1905 10.9588 11.8237 10.7143C11.5856 10.5556 11.2727 10.4281 10.9096 10.3594Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
          <path
            fill="#343332"
            d="M10.3399 2.51392C6.38177 2.51392 3.1731 5.72259 3.1731 9.6807C3.1731 13.6388 6.38177 16.8475 10.3399 16.8475C14.298 16.8475 17.5067 13.6388 17.5067 9.6807C17.5067 5.72259 14.298 2.51392 10.3399 2.51392ZM1.9231 9.6807C1.9231 5.03224 5.69142 1.26392 10.3399 1.26392C14.9883 1.26392 18.7567 5.03224 18.7567 9.6807C18.7567 14.3292 14.9883 18.0975 10.3399 18.0975C5.69142 18.0975 1.9231 14.3292 1.9231 9.6807Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      ),
      students: (
        <svg fill="none" viewBox="0 0 20 20" className="w-4 h-4 shrink-0">
          <path
            fill="#193cb8"
            d="M9.72154 3.47033C9.90035 3.39881 10.0998 3.39881 10.2786 3.47033L18.612 6.80366C18.8967 6.91756 19.0834 7.19334 19.0834 7.50002V12.5C19.0834 12.9142 18.7476 13.25 18.3334 13.25C17.9192 13.25 17.5834 12.9142 17.5834 12.5V8.6078L15.7501 9.34113V13.3334C15.7501 14.4243 14.9016 15.2566 13.871 15.7719C12.8053 16.3048 11.4126 16.5834 10.0001 16.5834C8.58758 16.5834 7.19484 16.3048 6.12914 15.7719C5.09852 15.2566 4.25008 14.4243 4.25008 13.3334V9.34113L1.38821 8.19638C1.10346 8.08248 0.916748 7.8067 0.916748 7.50002C0.916748 7.19334 1.10346 6.91756 1.38821 6.80366L9.72154 3.47033ZM5.29422 8.14324C5.2838 8.13879 5.27326 8.13457 5.2626 8.13059L3.68619 7.50002L10.0001 4.97446L16.314 7.50002L14.7376 8.13059C14.7269 8.13457 14.7164 8.13879 14.7059 8.14323L10.0001 10.0256L5.29422 8.14324ZM5.75008 9.94113V13.3334C5.75008 13.5685 5.95521 14.0079 6.79996 14.4303C7.60962 14.8351 8.76042 15.0834 10.0001 15.0834C11.2397 15.0834 12.3905 14.8351 13.2002 14.4303C14.0449 14.0079 14.2501 13.5685 14.2501 13.3334V9.94113L10.2786 11.5297C10.0998 11.6012 9.90035 11.6012 9.72154 11.5297L5.75008 9.94113Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      ),
      calendar: (
        <svg fill="none" viewBox="0 0 20 20" className="w-4 h-4 shrink-0">
          <path
            fill="#193cb8"
            d="M6.66671 1.75C7.08092 1.75 7.41671 2.08579 7.41671 2.5V3.41667H12.5834V2.5C12.5834 2.08579 12.9192 1.75 13.3334 1.75C13.7476 1.75 14.0834 2.08579 14.0834 2.5V3.41667H15C15.641 3.41667 16.2557 3.67128 16.7089 4.12449C17.1621 4.5777 17.4167 5.19239 17.4167 5.83333V15.8333C17.4167 16.4743 17.1621 17.089 16.7089 17.5422C16.2557 17.9954 15.641 18.25 15 18.25H5.00004C4.3591 18.25 3.74441 17.9954 3.2912 17.5422C2.83799 17.089 2.58337 16.4743 2.58337 15.8333V5.83333C2.58337 5.19239 2.83799 4.5777 3.2912 4.12449C3.74441 3.67128 4.3591 3.41667 5.00004 3.41667H5.91671V2.5C5.91671 2.08579 6.25249 1.75 6.66671 1.75ZM5.91671 4.91667H5.00004C4.75693 4.91667 4.52377 5.01324 4.35186 5.18515C4.17995 5.35706 4.08337 5.59022 4.08337 5.83333V8.41667H15.9167V5.83333C15.9167 5.59022 15.8201 5.35706 15.6482 5.18515C15.4763 5.01324 15.2432 4.91667 15 4.91667H14.0834V5.83333C14.0834 6.24755 13.7476 6.58333 13.3334 6.58333C12.9192 6.58333 12.5834 6.24755 12.5834 5.83333V4.91667H7.41671V5.83333C7.41671 6.24755 7.08092 6.58333 6.66671 6.58333C6.25249 6.58333 5.91671 6.24755 5.91671 5.83333V4.91667ZM15.9167 9.91667H4.08337V15.8333C4.08337 16.0764 4.17995 16.3096 4.35186 16.4815C4.52377 16.6534 4.75693 16.75 5.00004 16.75H15C15.2432 16.75 15.4763 16.6534 15.6482 16.4815C15.8201 16.3096 15.9167 16.0764 15.9167 15.8333V9.91667ZM8.41671 12.5C8.41671 12.0858 8.75249 11.75 9.16671 11.75H10C10.4143 11.75 10.75 12.0858 10.75 12.5V15C10.75 15.4142 10.4143 15.75 10 15.75C9.58583 15.75 9.25004 15.4142 9.25004 15V13.25H9.16671C8.75249 13.25 8.41671 12.9142 8.41671 12.5Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      ),
      members: (
        <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
          <path
            fill="#193cb8"
            d="M5.64124 3.64124C6.53204 2.75044 7.74022 2.25 9 2.25C10.2598 2.25 11.468 2.75044 12.3588 3.64124C13.2496 4.53204 13.75 5.74022 13.75 7C13.75 8.25978 13.2496 9.46796 12.3588 10.3588C11.468 11.2496 10.2598 11.75 9 11.75C7.74022 11.75 6.53204 11.2496 5.64124 10.3588C4.75044 9.46796 4.25 8.25978 4.25 7C4.25 5.74022 4.75044 4.53204 5.64124 3.64124ZM9 3.75C8.13805 3.75 7.3114 4.09241 6.7019 4.7019C6.09241 5.3114 5.75 6.13805 5.75 7C5.75 7.86195 6.09241 8.6886 6.7019 9.2981C7.3114 9.90759 8.13805 10.25 9 10.25C9.86195 10.25 10.6886 9.90759 11.2981 9.2981C11.9076 8.6886 12.25 7.86195 12.25 7C12.25 6.13805 11.9076 5.3114 11.2981 4.7019C10.6886 4.09241 9.86195 3.75 9 3.75ZM15.2734 2.94385C15.3762 2.54258 15.7848 2.30058 16.186 2.40332C17.2078 2.66493 18.1134 3.25915 18.7601 4.09231C19.4068 4.92547 19.7578 5.95018 19.7578 7.00488C19.7578 8.05959 19.4068 9.08429 18.7601 9.91745C18.1134 10.7506 17.2078 11.3448 16.186 11.6064C15.7848 11.7092 15.3762 11.4672 15.2734 11.0659C15.1707 10.6646 15.4127 10.2561 15.814 10.1533C16.5131 9.97433 17.1327 9.56775 17.5752 8.99769C18.0177 8.42763 18.2578 7.72652 18.2578 7.00488C18.2578 6.28325 18.0177 5.58213 17.5752 5.01207C17.1327 4.44201 16.5131 4.03544 15.814 3.85645C15.4127 3.7537 15.1707 3.34512 15.2734 2.94385ZM7 15.75C6.13805 15.75 5.3114 16.0924 4.7019 16.7019C4.09241 17.3114 3.75 18.138 3.75 19V21C3.75 21.4142 3.41421 21.75 3 21.75C2.58579 21.75 2.25 21.4142 2.25 21V19C2.25 17.7402 2.75044 16.532 3.64124 15.6412C4.53204 14.7504 5.74022 14.25 7 14.25H11C12.2598 14.25 13.468 14.7504 14.3588 15.6412C15.2496 16.532 15.75 17.7402 15.75 19V21C15.75 21.4142 15.4142 21.75 15 21.75C14.5858 21.75 14.25 21.4142 14.25 21V19C14.25 18.138 13.9076 17.3114 13.2981 16.7019C12.6886 16.0924 11.862 15.75 11 15.75H7ZM17.2738 14.9624C17.3774 14.5614 17.7864 14.3202 18.1875 14.4237C19.2026 14.6858 20.1025 15.2763 20.7469 16.1033C21.3913 16.9303 21.744 17.9472 21.75 18.9956L21.75 18.9999L21.75 20.9999C21.75 21.4141 21.4142 21.7499 21 21.7499C20.5858 21.7499 20.25 21.4141 20.25 20.9999V19.002C20.2454 18.2855 20.0041 17.5905 19.5637 17.0253C19.1228 16.4595 18.5071 16.0554 17.8125 15.8761C17.4115 15.7725 17.1703 15.3635 17.2738 14.9624Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      ),
      posts: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          className="w-4 h-4 shrink-0"
        >
          <path
            fill="#193cb8"
            d="M9.16659 3.25C9.14448 3.25 9.12329 3.25878 9.10766 3.27441C9.09203 3.29004 9.08325 3.31123 9.08325 3.33333V8.33333C9.08325 8.35543 9.09203 8.37663 9.10766 8.39226C9.12329 8.40789 9.14448 8.41667 9.16659 8.41667H14.9999C15.1988 8.41667 15.3896 8.49569 15.5302 8.63634L16.7499 9.85601V3.33333C16.7499 3.31123 16.7411 3.29003 16.7255 3.27441C16.7099 3.25878 16.6887 3.25 16.6666 3.25H9.16659ZM8.047 2.21375C8.34393 1.91682 8.74666 1.75 9.16659 1.75H16.6666C17.0865 1.75 17.4892 1.91681 17.7862 2.21375C18.0831 2.51068 18.2499 2.91341 18.2499 3.33333V11.6667C18.2499 11.97 18.0672 12.2435 17.7869 12.3596C17.5067 12.4757 17.1841 12.4115 16.9696 12.197L14.6893 9.91667H9.16659C8.74666 9.91667 8.34393 9.74985 8.047 9.45292C7.75007 9.15599 7.58325 8.75326 7.58325 8.33333V3.33333C7.58325 2.91341 7.75007 2.51068 8.047 2.21375Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
          <path
            fill="#193cb8"
            d="M3.33333 9.08333C3.31123 9.08333 3.29004 9.09211 3.27441 9.10774C3.25878 9.12336 3.25 9.14456 3.25 9.16666V15.6893L4.46967 14.4697C4.61032 14.329 4.80109 14.25 5 14.25H10.8333C10.8554 14.25 10.8766 14.2412 10.8923 14.2256C10.9079 14.21 10.9167 14.1888 10.9167 14.1667V12.5C10.9167 12.0858 11.2525 11.75 11.6667 11.75C12.0809 11.75 12.4167 12.0858 12.4167 12.5V14.1667C12.4167 14.5866 12.2499 14.9893 11.9529 15.2862C11.656 15.5832 11.2533 15.75 10.8333 15.75H5.31066L3.03033 18.0303C2.81583 18.2448 2.49324 18.309 2.21299 18.1929C1.93273 18.0768 1.75 17.8033 1.75 17.5V9.16666C1.75 8.74674 1.91682 8.34401 2.21375 8.04708C2.51068 7.75014 2.91341 7.58333 3.33333 7.58333H5C5.41421 7.58333 5.75 7.91911 5.75 8.33333C5.75 8.74754 5.41421 9.08333 5 9.08333H3.33333Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      ),
      spaces: (
        <svg
          fill="none"
          viewBox="0 0 20 20"
          height="20"
          width="20"
          id="icon-20-spaces-v3"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 shrink-0"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.5"
            stroke="currentColor"
            d="M3 5C3 3.89543 3.89543 3 5 3H6.44444C7.54901 3 8.44444 3.89543 8.44444 5V6.44444C8.44444 7.54901 7.54901 8.44444 6.44444 8.44444H5C3.89543 8.44444 3 7.54901 3 6.44444V5Z"
          ></path>
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.5"
            stroke="currentColor"
            d="M11.5555 5C11.5555 3.89543 12.451 3 13.5555 3H15C16.1046 3 17 3.89543 17 5V6.44444C17 7.54901 16.1046 8.44444 15 8.44444H13.5555C12.451 8.44444 11.5555 7.54901 11.5555 6.44444V5Z"
          ></path>
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.5"
            stroke="currentColor"
            d="M3 13.5557C3 12.4511 3.89543 11.5557 5 11.5557H6.44444C7.54901 11.5557 8.44444 12.4511 8.44444 13.5557V15.0001C8.44444 16.1047 7.54901 17.0001 6.44444 17.0001H5C3.89543 17.0001 3 16.1047 3 15.0001V13.5557Z"
          ></path>
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.5"
            stroke="currentColor"
            d="M11.5555 13.5557C11.5555 12.4511 12.451 11.5557 13.5555 11.5557H15C16.1046 11.5557 17 12.4511 17 13.5557V15.0001C17 16.1047 16.1046 17.0001 15 17.0001H13.5555C12.451 17.0001 11.5555 16.1047 11.5555 15.0001V13.5557Z"
          ></path>
        </svg>
      ),
      certificates: (
        <svg fill="none" viewBox="0 0 32 32" className="w-4 h-4 shrink-0">
          <path
            fill="#333333"
            d="M6.66667 7.66406C5.75228 7.66406 5 8.41635 5 9.33073V22.6641C5 23.1061 5.17559 23.53 5.48816 23.8426C5.80072 24.1551 6.22464 24.3307 6.66667 24.3307H13.3333C13.8856 24.3307 14.3333 24.7784 14.3333 25.3307C14.3333 25.883 13.8856 26.3307 13.3333 26.3307H6.66667C5.69421 26.3307 4.76157 25.9444 4.07394 25.2568C3.38631 24.5692 3 23.6365 3 22.6641V9.33073C3 7.31178 4.64772 5.66406 6.66667 5.66406H25.3333C26.3058 5.66406 27.2384 6.05037 27.9261 6.738C28.6137 7.42564 29 8.35827 29 9.33073V22.6651C28.9993 23.3081 28.8296 23.9396 28.5078 24.4963C28.186 25.053 27.7235 25.5153 27.1667 25.8368C26.6884 26.1129 26.0768 25.949 25.8006 25.4707C25.5245 24.9924 25.6884 24.3808 26.1667 24.1047C26.4198 23.9586 26.63 23.7484 26.7763 23.4954C26.9226 23.2424 26.9997 22.9553 27 22.663V9.33073C27 8.8887 26.8244 8.46478 26.5118 8.15222C26.1993 7.83966 25.7754 7.66406 25.3333 7.66406H6.66667ZM7 11.9974C7 11.4451 7.44772 10.9974 8 10.9974H24C24.5523 10.9974 25 11.4451 25 11.9974C25 12.5497 24.5523 12.9974 24 12.9974H8C7.44772 12.9974 7 12.5497 7 11.9974ZM7 15.9974C7 15.4451 7.44772 14.9974 8 14.9974H12C12.5523 14.9974 13 15.4451 13 15.9974C13 16.5497 12.5523 16.9974 12 16.9974H8C7.44772 16.9974 7 16.5497 7 15.9974ZM20 16.9974C18.3431 16.9974 17 18.3405 17 19.9974C17 21.6543 18.3431 22.9974 20 22.9974C21.6569 22.9974 23 21.6543 23 19.9974C23 18.3405 21.6569 16.9974 20 16.9974ZM15 19.9974C15 17.236 17.2386 14.9974 20 14.9974C22.7614 14.9974 25 17.236 25 19.9974C25 21.3101 24.4941 22.5047 23.6667 23.3968V29.3307C23.6667 29.7095 23.4527 30.0558 23.1139 30.2252C22.7751 30.3946 22.3697 30.358 22.0667 30.1307L20 28.5807L17.9333 30.1307C17.6303 30.358 17.2249 30.3946 16.8861 30.2252C16.5473 30.0558 16.3333 29.7095 16.3333 29.3307V23.3968C15.5059 22.5047 15 21.3101 15 19.9974ZM18.3333 24.7129V27.3307L19.4 26.5307C19.7556 26.2641 20.2444 26.2641 20.6 26.5307L21.6667 27.3307V24.7129C21.1454 24.8971 20.5844 24.9974 20 24.9974C19.4156 24.9974 18.8546 24.8971 18.3333 24.7129ZM7 19.9974C7 19.4451 7.44772 18.9974 8 18.9974H10.6667C11.219 18.9974 11.6667 19.4451 11.6667 19.9974C11.6667 20.5497 11.219 20.9974 10.6667 20.9974H8C7.44772 20.9974 7 20.5497 7 19.9974Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      ),
      subscribers: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
          className="w-4 h-4 shrink-0"
        >
          <path
            fill="#333333"
            d="M17 12.7992V13.5992C17.4418 13.5992 17.8 13.241 17.8 12.7992H17ZM17 8.39922H17.8C17.8 7.95739 17.4418 7.59922 17 7.59922V8.39922ZM4.96739 4.12628C4.59574 4.3652 4.48814 4.86017 4.72706 5.23183C4.96598 5.60348 5.46095 5.71108 5.83261 5.47216L4.96739 4.12628ZM11 1.19922L11.6315 0.708066C11.3773 0.381231 10.9157 0.302372 10.5674 0.526276L11 1.19922ZM13.1685 5.29037C13.4398 5.63913 13.9424 5.70196 14.2912 5.4307C14.6399 5.15945 14.7027 4.65682 14.4315 4.30807L13.1685 5.29037ZM17 11.9992H14.4V13.5992H17V11.9992ZM14.4 9.19922H17V7.59922H14.4V9.19922ZM16.2 8.39922V12.7992H17.8V8.39922H16.2ZM13 10.5992C13 9.82602 13.6268 9.19922 14.4 9.19922V7.59922C12.7431 7.59922 11.4 8.94237 11.4 10.5992H13ZM14.4 11.9992C13.6268 11.9992 13 11.3724 13 10.5992H11.4C11.4 12.2561 12.7431 13.5992 14.4 13.5992V11.9992ZM5.83261 5.47216L11.4326 1.87216L10.5674 0.526276L4.96739 4.12628L5.83261 5.47216ZM10.3685 1.69037L13.1685 5.29037L14.4315 4.30807L11.6315 0.708066L10.3685 1.69037ZM1.8 5.59922H15.4V3.99922H1.8V5.59922ZM15.4 15.9992H1.8V17.5992H15.4V15.9992ZM1.8 15.9992V5.59922H0.2V15.9992H1.8ZM1.8 15.9992H1.8H0.2C0.2 16.8829 0.916343 17.5992 1.8 17.5992V15.9992ZM15.4 15.9992H15.4V17.5992C16.2837 17.5992 17 16.8829 17 15.9992H15.4ZM15.4 5.59922H15.4H17C17 4.71556 16.2837 3.99922 15.4 3.99922V5.59922ZM1.8 3.99922C0.916344 3.99922 0.2 4.71556 0.2 5.59922H1.8H1.8V3.99922ZM15.4 13.3992V15.9992H17V13.3992H15.4ZM15.4 5.59922V7.69922H17V5.59922H15.4Z"
          ></path>
        </svg>
      ),
      products: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 shrink-0"
        >
          <path d="M4 4h6v6h-6z"></path>
          <path d="M14 4h6v6h-6z"></path>
          <path d="M4 14h6v6h-6z"></path>
          <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        </svg>
      ),
    };

    return svgMap[type] || "";
  };

  const createStatItem = (
    type: string,
    value: string,
    tooltipText: string,
    tooltipValue: string
  ) => (
    <Tooltip classNames={statItemClass} title={tooltipValue || tooltipText}>
      <div>{getSvgForType(type)}</div>
      <span className="text-sm leading-5 text-[#4d4d4c] font-semibold tracking-[-0.006em]">
        {value}
      </span>
    </Tooltip>
  );

  const createLinkedItem = (type: string, config: IConfig) => {
    console.log(type);
    return (
      <div className="linked-item flex items-center gap-2 cursor-pointer py-0.5 px-1 mx-[-4px] my-[-2px] rounded-sm transition-colors duration-200 ease-in-out group">
        <div className="relative w-[18] h-[18] bg-white rounded-[50%] flex items-center justify-center shrink-0">
          <div
            className="absolute top-0 left-0 w-full h-full border-[1.5px] border-[#13c4cc] rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(19, 196, 204, 0.2) 0%, rgba(255, 255, 255, 0) 60%)",
            }}
          ></div>
          <div className="relative w-[14px] h-[14px] text-[#13c4cc] flex- items-center justify-center">
            {config.icon}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#65676b] flex-1">
          <span className="text-[#65676b]">Linked to </span>
          <div className="flex ites-center gap-1">
            <span className="text-[#1c1e21] font-semibold group-hover:text-[#13c4cc] group-hover:underline">
              {config.items.join(" • ")}
            </span>
            {config.showCount !== false &&
              config.total &&
              config.total > config.items.length && (
                <span className="text-[#65676b] relative pl-2 group-hover:text-[#13c4cc] group-hover:underline">{`${config.total} ${config.itemType}`}</span>
              )}
          </div>
        </div>

        <div className="w-4 h-4 text-[#65676b]">
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full"
            stroke="currentColor"
          >
            <path d="M14.29 5.71c-.39.39-.39 1.02 0 1.41L18.17 11H3c-.55 0-1 .45-1 1s.45 1 1 1h15.18l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l5.59-5.59c.39-.39.39-1.02 0-1.41l-5.6-5.58c-.38-.39-1.02-.39-1.41 0" />
          </svg>
        </div>
      </div>
    );
  };

  const getSessionIcon = () => {
    return (
      <svg fill="none" viewBox="0 0 24 24" className="w-full h-full">
        <path
          fill="currentColor"
          d="M5 6.75C4.66848 6.75 4.35054 6.8817 4.11612 7.11612C3.8817 7.35054 3.75 7.66848 3.75 8V16C3.75 16.3315 3.8817 16.6495 4.11612 16.8839C4.35054 17.1183 4.66848 17.25 5 17.25H13C13.3315 17.25 13.6495 17.1183 13.8839 16.8839C14.1183 16.6495 14.25 16.3315 14.25 16V8C14.25 7.66848 14.1183 7.35054 13.8839 7.11612C13.6495 6.8817 13.3315 6.75 13 6.75H5ZM15.75 8.78622V8C15.75 7.27065 15.4603 6.57118 14.9445 6.05546C14.4288 5.53973 13.7293 5.25 13 5.25H5C4.27065 5.25 3.57118 5.53973 3.05546 6.05546C2.53973 6.57118 2.25 7.27065 2.25 8V16C2.25 16.7293 2.53973 17.4288 3.05546 17.9445C3.57118 18.4603 4.27065 18.75 5 18.75H13C13.7293 18.75 14.4288 18.4603 14.9445 17.9445C15.4603 17.4288 15.75 16.7293 15.75 16V15.213L19.2176 16.9465C19.4844 17.0798 19.7809 17.1427 20.0787 17.1293C20.3766 17.1159 20.6661 17.0266 20.9198 16.8699C21.1735 16.7131 21.3829 16.4942 21.5282 16.2338C21.6735 15.9734 21.7498 15.6802 21.75 15.382V8.61763C21.7498 8.31945 21.6735 8.02585 21.5282 7.76546C21.3829 7.50506 21.1735 7.28612 20.9198 7.12939C20.6661 6.97266 20.3766 6.88335 20.0787 6.86994C19.7809 6.85652 19.4845 6.91944 19.2177 7.05273L15.75 8.78622ZM15.75 10.4632V13.5361L19.8883 15.6047C19.8882 15.6047 19.8883 15.6047 19.8883 15.6047C19.9263 15.6237 19.9687 15.6328 20.0112 15.6308C20.0538 15.6289 20.0952 15.6162 20.1314 15.5938C20.1676 15.5714 20.1976 15.5401 20.2183 15.5029C20.2391 15.4657 20.25 15.4238 20.25 15.3812V8.61803C20.25 8.57543 20.2391 8.53354 20.2183 8.49635C20.1976 8.45915 20.1676 8.42787 20.1314 8.40548C20.0952 8.38309 20.0538 8.37033 20.0112 8.36842C19.9687 8.3665 19.9264 8.37547 19.8884 8.39448C19.8883 8.3945 19.8884 8.39446 19.8884 8.39448L15.75 10.4632Z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>
      </svg>
    );
  };

  const getCommunityIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
        className="w-full h-full"
      >
        <path
          fill="currentColor"
          d="M9.16659 3.25C9.14448 3.25 9.12329 3.25878 9.10766 3.27441C9.09203 3.29004 9.08325 3.31123 9.08325 3.33333V8.33333C9.08325 8.35543 9.09203 8.37663 9.10766 8.39226C9.12329 8.40789 9.14448 8.41667 9.16659 8.41667H14.9999C15.1988 8.41667 15.3896 8.49569 15.5302 8.63634L16.7499 9.85601V3.33333C16.7499 3.31123 16.7411 3.29003 16.7255 3.27441C16.7099 3.25878 16.6887 3.25 16.6666 3.25H9.16659ZM8.047 2.21375C8.34393 1.91682 8.74666 1.75 9.16659 1.75H16.6666C17.0865 1.75 17.4892 1.91681 17.7862 2.21375C18.0831 2.51068 18.2499 2.91341 18.2499 3.33333V11.6667C18.2499 11.97 18.0672 12.2435 17.7869 12.3596C17.5067 12.4757 17.1841 12.4115 16.9696 12.197L14.6893 9.91667H9.16659C8.74666 9.91667 8.34393 9.74985 8.047 9.45292C7.75007 9.15599 7.58325 8.75326 7.58325 8.33333V3.33333C7.58325 2.91341 7.75007 2.51068 8.047 2.21375Z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>
        <path
          fill="currentColor"
          d="M3.33333 9.08333C3.31123 9.08333 3.29004 9.09211 3.27441 9.10774C3.25878 9.12336 3.25 9.14456 3.25 9.16666V15.6893L4.46967 14.4697C4.61032 14.329 4.80109 14.25 5 14.25H10.8333C10.8554 14.25 10.8766 14.2412 10.8923 14.2256C10.9079 14.21 10.9167 14.1888 10.9167 14.1667V12.5C10.9167 12.0858 11.2525 11.75 11.6667 11.75C12.0809 11.75 12.4167 12.0858 12.4167 12.5V14.1667C12.4167 14.5866 12.2499 14.9893 11.9529 15.2862C11.656 15.5832 11.2533 15.75 10.8333 15.75H5.31066L3.03033 18.0303C2.81583 18.2448 2.49324 18.309 2.21299 18.1929C1.93273 18.0768 1.75 17.8033 1.75 17.5V9.16666C1.75 8.74674 1.91682 8.34401 2.21375 8.04708C2.51068 7.75014 2.91341 7.58333 3.33333 7.58333H5C5.41421 7.58333 5.75 7.91911 5.75 8.33333C5.75 8.74754 5.41421 9.08333 5 9.08333H3.33333Z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>
      </svg>
    );
  };

  const getCourseIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="w-full h-full"
      >
        <path
          fill="currentColor"
          d="M7 4.75C6.66848 4.75 6.35054 4.8817 6.11612 5.11612C5.8817 5.35054 5.75 5.66848 5.75 6V15.5505C6.13355 15.3548 6.56137 15.25 7 15.25H18.25V4.75H7ZM19.75 4C19.75 3.58579 19.4142 3.25 19 3.25H7C6.27065 3.25 5.57118 3.53973 5.05546 4.05546C4.53973 4.57118 4.25 5.27065 4.25 6V18C4.25 18.7293 4.53973 19.4288 5.05546 19.9445C5.57118 20.4603 6.27065 20.75 7 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20V4ZM18.25 16.75H7C6.66848 16.75 6.35054 16.8817 6.11612 17.1161C5.8817 17.3505 5.75 17.6685 5.75 18C5.75 18.3315 5.8817 18.6495 6.11612 18.8839C6.35054 19.1183 6.66848 19.25 7 19.25H18.25V16.75ZM8.25 8C8.25 7.58579 8.58579 7.25 9 7.25H15C15.4142 7.25 15.75 7.58579 15.75 8C15.75 8.41421 15.4142 8.75 15 8.75H9C8.58579 8.75 8.25 8.41421 8.25 8Z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>
      </svg>
    );
  };

  const createCardFooter = (type: string) => {
    if (type === "course") {
      return (
        <React.Fragment>
          {createLinkedItem("session", {
            icon: getSessionIcon(),
            items: ["Design Fundamentals", "UX Principles"],
            total: 5,
            itemType: "sessions",
          })}
          {createLinkedItem("community", {
            icon: getCommunityIcon(),
            items: ["Prompt Engineering Hub"],
            showCount: false,
          })}
        </React.Fragment>
      );
    } else if (type === "session") {
      return (
        <React.Fragment>
          {createLinkedItem("course", {
            icon: getCourseIcon(),
            items: ["Advanced Prompting", "Prompt Patterns"],
            total: 5,
            itemType: "courses",
          })}
          {createLinkedItem("community", {
            icon: getCommunityIcon(),
            items: ["AI Writers Hub", "Prompt Masters"],
            total: 5,
            itemType: "communities",
          })}
        </React.Fragment>
      );
    } else if (type === "community") {
      return (
        <React.Fragment>
          {createLinkedItem("course", {
            icon: getCourseIcon(),
            items: ["Prompt Engineering 101", "Advanced AI Writing"],
            total: 5,
            itemType: "courses",
          })}
          {createLinkedItem("session", {
            icon: getSessionIcon(),
            items: ["Weekly Workshop", "Group Practice"],
            total: 5,
            itemType: "sessions",
          })}
        </React.Fragment>
      );
    }
  };

  return (
    <div className="flex flex-col border border-[#e0e0e0] rounded-lg overflow-hidden transition-border-color duration-200 hover:border-[#ccc]">
      <div className="flex p-4 w-full">
        <Image
          className="object-cover rounded-lg mr-4 w-[150px] h-[80px]"
          src={image}
          alt={title}
          width={150}
          height={80}
        />
        <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[80px]">
          <h3 className="text-md font-semibold text-[#111827] mb-auto tracking-[-0.011em] leading-6">
            {title}
          </h3>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span
                className={`py-1 px-3.5 rounded-2xl text-xs font-semibold whitespace-nowrap leading-4 ${getLabelColor(
                  type
                )}`}
              >
                {getTypeLabel(type)}
              </span>
              {["course", "session", "group-session"].includes(type) &&
                status && (
                  <span
                    className={`py-1 px-3.5 rounded-2xl text-xs font-semibold whitespace-nowrap leading-4 ${getLabelColor(
                      status
                    )}`}
                  >
                    {getStatusLabel(status)}
                  </span>
                )}
            </div>

            <div className="flex items-center gap-4 mr-6">
              {price && createStatItem("price", price, "Price", `$${price}`)}
              {students &&
                createStatItem(
                  "students",
                  students,
                  "Students",
                  `$${students} students`
                )}
              {members &&
                createStatItem(
                  "members",
                  members,
                  "Members",
                  `${members} members`
                )}
              {posts &&
                createStatItem("posts", posts, "Posts", `${posts} posts`)}
              {spaces &&
                createStatItem("spaces", spaces, "Spaces", `${spaces} spaces`)}
              {certificates &&
                createStatItem(
                  "certificates",
                  certificates,
                  "Certificates",
                  `${certificates} issued`
                )}
              {subscribers &&
                createStatItem(
                  "subscribers",
                  subscribers,
                  "Subscribers",
                  `${subscribers} subscribers`
                )}
              {products &&
                createStatItem(
                  "products",
                  products,
                  "Products",
                  `${products} products`
                )}
              {createStatItem(
                "calendar",
                lastActivity,
                "Last Activity",
                lastActivity
              )}
            </div>
          </div>
        </div>

        <div className="product-actions relative flex items-center ml-6 pl-6">
          <button className="w-[140px] py-2 px-0 bg-[#00BCD4] text-white border-none text-sm rounded-md font-semibold cursor-pointer text-center transition-all duration-200 ease-in-out hover:bg-[#00ACC1] active:bg-[#0fa3aa] active:transform active:translate-y-[1px] focus:outline-none focus:shadow-custom">
            {action}
          </button>
          <button onClick={handleMenu} className="ml-3 w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f5]">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#666]">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>
      {[
        "course",
        "community",
        "certificate",
        "session",
        "group-session",
      ].includes(type) && (
        <div className="bg-[#f8f9fa] broder-t border-[#e0e0e0] px-4 py-2 mt-auto flex flex-col gap-2 rounded-b-lg">
          <div className="flex items-center gap-3">
            {createCardFooter(type)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
