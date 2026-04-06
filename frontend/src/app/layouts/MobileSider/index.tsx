interface MobileSidebarProps {
  isOpen?: boolean,
  collapse?: () => void
}

const MobileSider = ({ isOpen, collapse }: MobileSidebarProps) => {
  return (
    <div className={`bg-white h-[100vh] w-[220px] fixed top-0 hidden transition-transform duration-300 ease-in-out max-[768px]:flex max-[768px]:flex-col max-[768px]:justify-between z-20
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <button onClick={collapse}>Mobile Sider</button>
    </div>
  )
}

export default MobileSider;