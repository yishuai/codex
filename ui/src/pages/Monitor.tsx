
import { useQuery } from '@tanstack/react-query'
import { getTimeseries } from '../api'
import MultiSeriesChart from '../components/MultiSeriesChart'
import { useUI } from '../store'
import AnomalyList from '../components/AnomalyList'
import { useLivePerceive } from '../hooks/useLivePerceive'

export default function Monitor(){
  const { metric, setMetric } = useUI()
  const q = useQuery({ queryKey: ['ts', metric], queryFn: ()=>getTimeseries({metric}), refetchInterval: 10000 })
  const live = useLivePerceive(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">监控</div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">指标:</label>
          <select className="border rounded px-2 py-1 text-sm" value={metric} onChange={e=>{
            setMetric(e.target.value)
          }}>
            {['flow','pressure','frequency','power','current'].map(m=>(
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <MultiSeriesChart data={q.data ?? []} metric={metric} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <AnomalyList items={live.data?.anomalies} />
        </div>
        <div className="card">
          <div className="title mb-2">状态</div>
          <div className="text-sm text-gray-600">模式：{live.data?.state.status_data.mode}</div>
          <div className="text-sm text-gray-600">开机：{live.data?.state.status_data.status ? '是' : '否'}</div>
        </div>
      </div>
    </div>
  )
}
