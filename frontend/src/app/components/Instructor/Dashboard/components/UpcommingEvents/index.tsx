import Event from "./Event";
import Badge from "@/app/components/ui/badge";

const UpcommingEvents = () => {
  return (
    <div className="bg-white rounded-[8px] h-full overflow-hidden border border-[#e5e7eb] xs:p-6 max-md:mt-4 min-md:ml-1">
      <div className="font-semibold text-[16px] flex justify-between items-center max-xs:border-b max-xs:pb-2 max-xs:px-4 max-xs:pt-2">
        <div className="flex-1 ">
          <div className="text-[14px] text-[#262b3d] mb-2">
            UPCOMING EVENTS
          </div>
          <div className="text-[28px] font-bold text-[#142e53] flex items-center gap-[12px]">
            5<Badge color="error">-5%</Badge>
          </div>
        </div>
        <div className="w-10 h-10 flex items-center justify-center bg-[rgba(19,196,204,.08)] rounded-[10px]">
          <svg fill="none" viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="#13c4cc"
              d="M5 6.75C4.66848 6.75 4.35054 6.8817 4.11612 7.11612C3.8817 7.35054 3.75 7.66848 3.75 8V16C3.75 16.3315 3.8817 16.6495 4.11612 16.8839C4.35054 17.1183 4.66848 17.25 5 17.25H13C13.3315 17.25 13.6495 17.1183 13.8839 16.8839C14.1183 16.6495 14.25 16.3315 14.25 16V8C14.25 7.66848 14.1183 7.35054 13.8839 7.11612C13.6495 6.8817 13.3315 6.75 13 6.75H5ZM15.75 8.78622V8C15.75 7.27065 15.4603 6.57118 14.9445 6.05546C14.4288 5.53973 13.7293 5.25 13 5.25H5C4.27065 5.25 3.57118 5.53973 3.05546 6.05546C2.53973 6.57118 2.25 7.27065 2.25 8V16C2.25 16.7293 2.53973 17.4288 3.05546 17.9445C3.57118 18.4603 4.27065 18.75 5 18.75H13C13.7293 18.75 14.4288 18.4603 14.9445 17.9445C15.4603 17.4288 15.75 16.7293 15.75 16V15.213L19.2176 16.9465C19.4844 17.0798 19.7809 17.1427 20.0787 17.1293C20.3766 17.1159 20.6661 17.0266 20.9198 16.8699C21.1735 16.7131 21.3829 16.4942 21.5282 16.2338C21.6735 15.9734 21.7498 15.6802 21.75 15.382V8.61763C21.7498 8.31945 21.6735 8.02585 21.5282 7.76546C21.3829 7.50506 21.1735 7.28612 20.9198 7.12939C20.6661 6.97266 20.3766 6.88335 20.0787 6.86994C19.7809 6.85652 19.4845 6.91944 19.2177 7.05273L15.75 8.78622ZM15.75 10.4632V13.5361L19.8883 15.6047C19.8882 15.6047 19.8883 15.6047 19.8883 15.6047C19.9263 15.6237 19.9687 15.6328 20.0112 15.6308C20.0538 15.6289 20.0952 15.6162 20.1314 15.5938C20.1676 15.5714 20.1976 15.5401 20.2183 15.5029C20.2391 15.4657 20.25 15.4238 20.25 15.3812V8.61803C20.25 8.57543 20.2391 8.53354 20.2183 8.49635C20.1976 8.45915 20.1676 8.42787 20.1314 8.40548C20.0952 8.38309 20.0538 8.37033 20.0112 8.36842C19.9687 8.3665 19.9264 8.37547 19.8884 8.39448C19.8883 8.3945 19.8884 8.39446 19.8884 8.39448L15.75 10.4632Z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-0 mt-2">
        <Event
          title="Advanced React Workshop"
          image="https://i.ibb.co/jJ4GHXP/img1.jpg"
          type="zoom"
          attendees={[
            "https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png",
            "https://i.ibb.co/S3QRdcX/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
            "https://i.ibb.co/YP71Tb6/profile9.jpg",
          ]}
        />
        <Event
          title="Team Strategy Planning"
          image="https://i.ibb.co/jJ4GHXP/img1.jpg"
          type="teams"
          attendees={[
            "https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png",
            "https://i.ibb.co/S3QRdcX/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
            "https://i.ibb.co/YP71Tb6/profile9.jpg",
          ]}
        />
        <Event
          title="1:1 Coaching Session"
          image="https://i.ibb.co/jJ4GHXP/img1.jpg"
          type="session"
          isLast={true}
          attendees={[
            "https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png",
            "https://i.ibb.co/S3QRdcX/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
            "https://i.ibb.co/YP71Tb6/profile9.jpg",
          ]}
        />
      </div>

      <div className="xs:hidden flex items-center justify-center py-4 bg-accent text-blue-500 font-semibold text-sm border-t">
        View All Events
      </div>
    </div>
  );
};

export default UpcommingEvents;
