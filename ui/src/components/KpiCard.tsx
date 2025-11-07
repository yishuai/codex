export default function KpiCard({
  title, value, unit, hint,
}: { title: string; value: number | string; unit?: string; hint?: string }) {
  return (
    <div className="card">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <div className="text-2xl font-semibold">
          {typeof value === 'number' ? value.toFixed(2) : value}
        </div>
        {unit && <div className="text-sm text-gray-500">{unit}</div>}
      </div>
      {hint && <div className="text-xs text-gray-400 mt-2">{hint}</div>}
    </div>
  )
}
