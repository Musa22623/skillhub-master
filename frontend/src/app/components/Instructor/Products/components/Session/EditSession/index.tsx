/** @format */

import { useIsMobile } from "@/hooks/use-mobile";
import { default as DesktopCreateSession } from "./Desktop";
import { default as MobileCreateSession } from "./Mobile";

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
const EditSession = ({
  open,
  setOpen,
  session,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  session: ProductCardProps;
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-sm:hidden flex flex-col">
        <MobileCreateSession open={open} setOpen={setOpen} session={session} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col max-sm:hidden">
        <DesktopCreateSession
          onClose={() => setOpen(false)}
          session={session}
        />
      </div>
    );
  }
};
export default EditSession;
