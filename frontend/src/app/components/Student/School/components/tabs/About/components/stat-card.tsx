interface StatCardProps {
  label: string
  value: string
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-xl bg-gray-50 p-6 text-center">
      <div className="mb-2 text-sm font-semibold text-[#3B6E91]">{label}</div>
      <div className="text-2xl font-bold text-[#262B3D]">{value}</div>
    </div>
  )
}
