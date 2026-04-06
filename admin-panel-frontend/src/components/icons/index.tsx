import React from 'react';

export interface IconProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

// User Management Icons
export const UserIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      fill="currentColor" 
      d="M4.61265 2.94598C5.37842 2.18021 6.41703 1.75 7.5 1.75C8.58297 1.75 9.62158 2.18021 10.3874 2.94598C11.1531 3.71175 11.5833 4.75037 11.5833 5.83333C11.5833 6.9163 11.1531 7.95491 10.3874 8.72069C9.62158 9.48646 8.58297 9.91667 7.5 9.91667C6.41703 9.91667 5.37842 9.48646 4.61265 8.72069C3.84687 7.95491 3.41667 6.9163 3.41667 5.83333C3.41667 4.75037 3.84687 3.71175 4.61265 2.94598Z" 
      clipRule="evenodd" 
      fillRule="evenodd"
    />
  </svg>
);

export const ActiveUsersIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path 
      fill="currentColor" 
      d="M4.61265 2.94598C5.37842 2.18021 6.41703 1.75 7.5 1.75C8.58297 1.75 9.62158 2.18021 10.3874 2.94598C11.1531 3.71175 11.5833 4.75037 11.5833 5.83333C11.5833 6.9163 11.1531 7.95491 10.3874 8.72069C9.62158 9.48646 8.58297 9.91667 7.5 9.91667C6.41703 9.91667 5.37842 9.48646 4.61265 8.72069C3.84687 7.95491 3.41667 6.9163 3.41667 5.83333C3.41667 4.75037 3.84687 3.71175 4.61265 2.94598Z" 
      clipRule="evenodd" 
      fillRule="evenodd"
    />
    <path 
      fill="currentColor" 
      d="M14.0827 12.7093C14.4273 12.9391 14.5205 13.4047 14.2907 13.7494L13.4014 15.0833H15.3333C15.6099 15.0833 15.8641 15.2356 15.9946 15.4794C16.1251 15.7233 16.1108 16.0192 15.9574 16.2494L14.2907 18.7494C14.0609 19.094 13.5953 19.1871 13.2506 18.9574C12.906 18.7276 12.8129 18.262 13.0426 17.9173L13.9319 16.5833H12C11.7234 16.5833 11.4693 16.4311 11.3387 16.1872C11.2082 15.9434 11.2225 15.6474 11.376 15.4173L13.0426 12.9173C13.2724 12.5727 13.738 12.4795 14.0827 12.7093Z" 
      clipRule="evenodd" 
      fillRule="evenodd"
    />
  </svg>
);

export const InstructorsIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M16.9706 14.4402C18.3406 14.6702 19.8506 14.4302 20.9106 13.7202C22.3206 12.7802 22.3206 11.2402 20.9106 10.3002C19.8406 9.59016 18.3106 9.35016 16.9406 9.59016"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 14.6302C11.94 14.6202 11.87 14.6202 11.81 14.6302C10.43 14.5802 9.32996 13.4502 9.32996 12.0502C9.32996 10.6202 10.48 9.47021 11.91 9.47021C13.34 9.47021 14.49 10.6302 14.49 12.0502C14.48 13.4502 13.38 14.5902 12 14.6302Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M9.09009 17.7802C7.68009 18.7202 7.68009 20.2602 9.09009 21.2002C10.6901 22.2702 13.3101 22.2702 14.9101 21.2002C16.3201 20.2602 16.3201 18.7202 14.9101 17.7802C13.3201 16.7202 10.6801 16.7202 9.09009 17.7802Z"
    />
  </svg>
);

export const SuspendedUsersIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3.41003 22C3.41003 18.13 7.26003 15 12 15C12.96 15 13.89 15.13 14.76 15.37"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M20 17.5C20.83 17.5 21.5 18.17 21.5 19S20.83 20.5 20 20.5S18.5 19.83 18.5 19S19.17 17.5 20 17.5Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M20 22V20.5"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M20 17.5V16"
    />
  </svg>
);

export const PendingVerificationIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 -960 960 960" className={className}>
    <path d="M480-200q117 0 198.5-81.5T760-480q0-107-70.5-186.5T513-757q-14-2-23.5 7t-9.5 23v247L311-303q-9 10-8.5 23t10.5 21q35 29 78 44t89 15m0 120q-82 0-155-31.5t-127.5-86-86-127.5T80-480q0-83 31.5-156t86-127T325-848.5 480-880q83 0 156 31.5T763-763t85.5 127T880-480q0 82-31.5 155T763-197.5t-127 86T480-80m0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140m0-340"></path>
  </svg>
);

export const NewUsersIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M8 2V5"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M16 2V5"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3.5 9.09H20.5"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M11.9955 13.7H12.0045"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M8.29431 13.7H8.30329"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M8.29431 16.7H8.30329"
    />
  </svg>
);

export const InactiveUsersIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3.41003 22C3.41003 18.13 7.26003 15 12 15C12.96 15 13.89 15.13 14.76 15.37"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M22 18C22 18.75 21.79 19.46 21.42 20.06C21.21 20.42 20.94 20.74 20.63 21C19.93 21.63 19.01 22 18 22C16.54 22 15.27 21.22 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.74 14.58 15.61 15.5 14.88C16.19 14.33 17.06 14 18 14C20.21 14 22 15.79 22 18Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M16.4399 18L17.4299 18.99L19.5599 17.02"
    />
  </svg>
);

// Action Icons
export const PlusIcon: React.FC<IconProps> = ({ className = "", size = 16, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path 
      d="M8 3V13M3 8H13" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M21 21L16.65 16.65" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const SortIcon: React.FC<IconProps> = ({ className = "", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" strokeLinejoin="round" className={className}>
    <path 
      fill="currentColor" 
      d="M1.75 12H1V10.5H1.75H5.25H6V12H5.25H1.75ZM1.75 7.75H1V6.25H1.75H4.25H5V7.75H4.25H1.75ZM1.75 3.5H1V2H1.75H7.25H8V3.5H7.25H1.75ZM12.5303 14.7803C12.2374 15.0732 11.7626 15.0732 11.4697 14.7803L9.21967 12.5303L8.68934 12L9.75 10.9393L10.2803 11.4697L11.25 12.4393V2.75V2H12.75V2.75V12.4393L13.7197 11.4697L14.25 10.9393L15.3107 12L14.7803 12.5303L12.5303 14.7803Z" 
      clipRule="evenodd" 
      fillRule="evenodd"
    />
  </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ className = "", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" className={className}>
    <path 
      d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z" 
      fill="currentColor"
    />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = "", size = 16, strokeWidth = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" fill="none" className={className}>
    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
  </svg>
);

export const MoreHorizontalIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <g fillRule="nonzero" fill="currentColor">
      <path d="M12 10.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214M18 10.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214M6 10.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214" />
    </g>
  </svg>
);

export const CopyIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M20 9V7C20 5.89543 19.1046 5 18 5H16M20 9V16C20 17.1046 19.1046 18 18 18H16M20 9H16M16 5V3C16 1.89543 15.1046 1 14 1H6C4.89543 1 4 1.89543 4 3V15C4 16.1046 4.89543 17 6 17H8M16 5H14C12.8954 5 12 5.89543 12 7V9M16 18V20C16 21.1046 15.1046 22 14 22H6C4.89543 22 4 21.1046 4 20V8C4 6.89543 4.89543 6 6 6H8M16 18H14C12.8954 18 12 17.1046 12 16V14"
    />
  </svg>
);

// Pagination Icons
export const ChevronLeftIcon: React.FC<IconProps> = ({ className = "", size = 16, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M15 18L9 12L15 6" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className = "", size = 16, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M9 6L15 12L9 18" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronsLeftIcon: React.FC<IconProps> = ({ className = "", size = 16, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M18 17L13 12L18 7" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M11 17L6 12L11 7" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronsRightIcon: React.FC<IconProps> = ({ className = "", size = 16, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M6 7L11 12L6 17" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M13 7L18 12L13 17" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// View Icons
export const SettingsIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M19.4 15A1.65 1.65 0 0 0 21 13.09V10.91A1.65 1.65 0 0 0 19.4 9A1.65 1.65 0 0 1 18.33 6L18.06 5.74C17.41 5.09 16.37 5.09 15.72 5.74L15.45 6A1.65 1.65 0 0 1 12.4 6A1.65 1.65 0 0 0 11 4.4H9A1.65 1.65 0 0 0 7.6 6A1.65 1.65 0 0 1 4.55 6.27L4.28 6.54C3.63 7.19 3.63 8.23 4.28 8.88L4.55 9.15A1.65 1.65 0 0 1 4.55 12.2L4.28 12.47C3.63 13.12 3.63 14.16 4.28 14.81L4.55 15.08A1.65 1.65 0 0 1 7.6 15.35A1.65 1.65 0 0 0 9 17H11A1.65 1.65 0 0 0 12.4 15.35A1.65 1.65 0 0 1 15.45 15.08L15.72 14.81C16.37 14.16 16.37 13.12 15.72 12.47L15.45 12.2A1.65 1.65 0 0 1 15.45 9.15L15.72 8.88C16.37 8.23 16.37 7.19 15.72 6.54L15.45 6.27A1.65 1.65 0 0 1 12.4 6A1.65 1.65 0 0 0 11 4.4H9A1.65 1.65 0 0 0 7.6 6A1.65 1.65 0 0 1 4.55 6.27L4.28 6.54C3.63 7.19 3.63 8.23 4.28 8.88L4.55 9.15A1.65 1.65 0 0 1 4.55 12.2L4.28 12.47C3.63 13.12 3.63 14.16 4.28 14.81L4.55 15.08A1.65 1.65 0 0 1 7.6 15.35A1.65 1.65 0 0 0 9 17H11A1.65 1.65 0 0 0 12.4 15.35A1.65 1.65 0 0 1 15.45 15.08L15.72 14.81C16.37 14.16 16.37 13.12 15.72 12.47L15.45 12.2A1.65 1.65 0 0 1 15.45 9.15L15.72 8.88C16.37 8.23 16.37 7.19 15.72 6.54Z"
    />
  </svg>
);

export const CreditCardIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21.6389 14.3957H17.5906C16.1042 14.3948 14.8993 13.1909 14.8984 11.7045C14.8984 10.218 16.1042 9.01409 17.5906 9.01318H21.6389"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M18.0485 11.6429H17.7369"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M7.74766 3H16.3911C19.2892 3 21.6388 5.34951 21.6388 8.24766V15.4247C21.6388 18.3229 19.2892 20.6724 16.3911 20.6724H7.74766C4.84951 20.6724 2.5 18.3229 2.5 15.4247V8.24766C2.5 5.34951 4.84951 3 7.74766 3Z"
    />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3 9.10998V14.88C3 17 3 17 5 18.35L10.5 21.53C11.33 22.01 12.68 22.01 13.5 21.53L19 18.35C21 17 21 17 21 14.89V9.10998C21 6.99998 21 6.99999 19 5.64999L13.5 2.46999C12.68 1.98999 11.33 1.98999 10.5 2.46999L5 5.64999C3 6.99999 3 6.99998 3 9.10998Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
    />
  </svg>
);

export const BarChartIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M8 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2H8C4 2 2 4 2 8V16C2 20 4 22 8 22Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M7 10.7402V16.0002"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 7V16"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M17 13.2402V16.0002"
    />
  </svg>
);

export const DocumentIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M7 13H13"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M7 17H11"
    />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M11.7915 18.8542L4.79146 12.5625C1.73958 9.85417 2.09896 5.27083 5.51042 3.01042C8.92188 0.75 13.3073 1.77083 15.2498 5.08333L16.2498 6.77083L17.344 5.08333C19.3385 1.77083 23.5277 0.802083 26.9392 3.01042C30.3506 5.21875 30.8848 9.85417 27.7915 12.5625L20.7915 18.8542C18.4373 20.9167 14.1456 20.9167 11.7915 18.8542Z"
    />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M8 2V5"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M16 2V5"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3.5 9.09H20.5"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
    />
  </svg>
);

// Action Dropdown Icons
export const SuspendIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M20 17.5C20.83 17.5 21.5 18.17 21.5 19S20.83 20.5 20 20.5S18.5 19.83 18.5 19S19.17 17.5 20 17.5Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M20 22V20.5"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M20 17.5V16"
    />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 9v9a3 3 0 01-3 3H6a3 3 0 01-3-3V9"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 9l-7.66 6.48a2 2 0 01-2.68 0L3 9m2.5-2.03L3 9m18 0l-2.5-2.03"
    />
  </svg>
);

export const LayersIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 14H14V21H21V14Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M10 14H3V21H10V14Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 3H14V10H21V3Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M10 3H3V10H10V3Z"
    />
  </svg>
);

export const UsersGroupIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M16.9706 14.4402C18.3406 14.6702 19.8506 14.4302 20.9106 13.7202C22.3206 12.7802 22.3206 11.2402 20.9106 10.3002C19.8406 9.59016 18.3106 9.35016 16.9406 9.59016"
    />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41V13.41Z"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M7 7H7.01"
    />
  </svg>
);

// Success Toast Icon
export const CheckCircleIcon: React.FC<IconProps> = ({ className = "", size = 20, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M7.75 12L10.58 14.83L16.25 9.17004" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Question Mark / Tooltip Icon
export const HelpCircleIcon: React.FC<IconProps> = ({ className = "", size = 12, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M9 9a3 3 0 1 1 6 0c0 2-3 3-3 3"
    />
    <path 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 17h.01"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
    />
  </svg>
);