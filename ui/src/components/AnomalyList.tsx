import type { AnomalyFlag } from '../types'

export default function AnomalyList({ items }: { items: AnomalyFlag[] | undefined }) {
  if (!items || items.length === 0) return <div className="card">暂无异常</div>
  return (
    <div className="card">
      <div className="title mb-2">异常队列</div>
      <ul className="divide-y divide-gray-100">
        {items.map((a, i) => (
          <li key={i} className="py-2 flex items-center justify-between">
            <div>
              <div className="font-medium">{a.metric}</div>
              <div className="text-xs text-gray-500">{a.method}</div>
            </div>
            <div className={`text-sm font-semibold ${a.is_anomaly ? 'text-red-600' : 'text-gray-500'}`}>
              score {a.score.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
