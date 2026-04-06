import Image from "next/image"

interface LeaderboardProps {
  title: string
  type: "course" | "event" | "community"
}

// Sample data for leaderboards
const leaderboardData = {
  course: [
    { rank: 1, name: "Morgan Miller", points: 75, avatar: "https://i.ibb.co/cLLn8Ys/AVATAR-BHW.png" },
    { rank: 2, name: "Taylor Jones", points: 45, avatar: "https://i.ibb.co/cLLn8Ys/AVATAR-BHW.png" },
    { rank: 3, name: "Sam Williams", points: 122, avatar: "https://i.ibb.co/cLLn8Ys/AVATAR-BHW.png" },
    { rank: 4, name: "Quinn Garcia", points: 77, avatar: "https://i.ibb.co/cLLn8Ys/AVATAR-BHW.png" },
    { rank: 5, name: "Taylor Martinez", points: 144, avatar: "https://i.ibb.co/cLLn8Ys/AVATAR-BHW.png" },
    { rank: 6, name: "Avery Martinez", points: 169, avatar: "https://i.ibb.co/cLLn8Ys/AVATAR-BHW.png" },
    { rank: 7, name: "Sam Garcia", points: 190, avatar: "https://i.ibb.co/cLLn8Ys/AVATAR-BHW.png" },
    { rank: 8, name: "Taylor Rodriguez", points: 195, avatar: "https://i.ibb.co/cLLn8Ys/AVATAR-BHW.png" },
    { rank: 9, name: "Casey Miller", points: 152, avatar: "https://i.ibb.co/cLLn8Ys/AVATAR-BHW.png" },
    { rank: 10, name: "Quinn Garcia", points: 36, avatar: "https://i.ibb.co/cLLn8Ys/AVATAR-BHW.png" },
  ],
  event: [
    { rank: 1, name: "Sam Smith", points: 267, avatar: "https://i.ibb.co/fS9qW38/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg" },
    { rank: 2, name: "Jamie Martinez", points: 345, avatar: "https://i.ibb.co/fS9qW38/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg" },
    { rank: 3, name: "Jamie Garcia", points: 477, avatar: "https://i.ibb.co/fS9qW38/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg" },
    { rank: 4, name: "Quinn Williams", points: 797, avatar: "https://i.ibb.co/fS9qW38/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg" },
    { rank: 5, name: "Quinn Rodriguez", points: 112, avatar: "https://i.ibb.co/fS9qW38/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg" },
    { rank: 6, name: "Jordan Johnson", points: 357, avatar: "https://i.ibb.co/fS9qW38/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg" },
    { rank: 7, name: "Sam Garcia", points: 763, avatar: "https://i.ibb.co/fS9qW38/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg" },
    { rank: 8, name: "Jamie Garcia", points: 454, avatar: "https://i.ibb.co/fS9qW38/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg" },
    { rank: 9, name: "Casey Smith", points: 514, avatar: "https://i.ibb.co/fS9qW38/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg" },
    { rank: 10, name: "Casey Miller", points: 592, avatar: "https://i.ibb.co/fS9qW38/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg" },
  ],
  community: [
    { rank: 1, name: "Jordan Williams", points: 939, avatar: "https://i.ibb.co/BKYjSYN/AVATAR-couponcodefinder.jpg" },
    { rank: 2, name: "Avery Garcia", points: 1673, avatar: "https://i.ibb.co/BKYjSYN/AVATAR-couponcodefinder.jpg" },
    { rank: 3, name: "Quinn Garcia", points: 1276, avatar: "https://i.ibb.co/BKYjSYN/AVATAR-couponcodefinder.jpg" },
    { rank: 4, name: "Morgan Miller", points: 1921, avatar: "https://i.ibb.co/BKYjSYN/AVATAR-couponcodefinder.jpg" },
    { rank: 5, name: "Jamie Brown", points: 1006, avatar: "https://i.ibb.co/BKYjSYN/AVATAR-couponcodefinder.jpg" },
    { rank: 6, name: "Jamie Garcia", points: 1755, avatar: "https://i.ibb.co/BKYjSYN/AVATAR-couponcodefinder.jpg" },
    { rank: 7, name: "Avery Davis", points: 1328, avatar: "https://i.ibb.co/BKYjSYN/AVATAR-couponcodefinder.jpg" },
    { rank: 8, name: "Avery Garcia", points: 1235, avatar: "https://i.ibb.co/BKYjSYN/AVATAR-couponcodefinder.jpg" },
    { rank: 9, name: "Avery Brown", points: 1392, avatar: "https://i.ibb.co/BKYjSYN/AVATAR-couponcodefinder.jpg" },
    { rank: 10, name: "Quinn Davis", points: 981, avatar: "https://i.ibb.co/BKYjSYN/AVATAR-couponcodefinder.jpg" },
  ],
}

export function Leaderboard({ title, type }: LeaderboardProps) {
  const getTooltip = (type: string, points: number) => {
    switch (type) {
      case "course":
        return `+${points} min of video watched`
      case "event":
        return `+${points} event min attended`
      case "community":
        return `+${points} posts created`
      default:
        return `+${points} points`
    }
  }

  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <div className="mb-4 text-center">
        <h3 className="mb-2 text-base font-semibold text-gray-800">{title}</h3>
        <div className="relative mx-auto h-px w-full bg-gray-200">
          <div className="absolute bottom-0 left-1/2 h-0.5 w-10 -translate-x-1/2 bg-blue-500"></div>
        </div>
      </div>

      <ul className="space-y-1">
        {leaderboardData[type].map((item) => (
          <li key={item.rank} className="flex items-center py-2">
            <span
              className={`mr-3 w-6 text-center font-semibold ${
                item.rank === 1
                  ? "text-yellow-400"
                  : item.rank === 2
                    ? "text-gray-400"
                    : item.rank === 3
                      ? "text-orange-400"
                      : "text-gray-500"
              }`}
            >
              {item.rank}
            </span>

            <div className="flex flex-1 items-center">
              <Image
                src={item.avatar || "/placeholder.svg?height=32&width=32"}
                alt={item.name}
                width={32}
                height={32}
                className="mr-3 h-8 w-8 rounded-full"
              />
              <span className="font-semibold text-gray-800">{item.name}</span>
            </div>

            <div className="group relative">
              <span className="font-semibold text-blue-500">+{item.points}</span>
              <div className="invisible absolute -right-2 bottom-full mb-2 w-max rounded bg-gray-800 px-3 py-1 text-xs text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                {getTooltip(type, item.points)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
