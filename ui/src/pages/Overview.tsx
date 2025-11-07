
import { useLivePerceive } from '../hooks/useLivePerceive'
import KpiCard from '../components/KpiCard'
import LiveBadge from '../components/LiveBadge'
import ContextBadges from '../components/ContextBadges'
import dayjs from 'dayjs'

export default function Overview(){
  const [live, setLive] = [true, ()=>{}] as const
  const { data, isLoading, isError } = useLivePerceive(true)
  const s = data?.state
  const ctx = data?.context
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">总览</div>
          <div className="text-sm text-gray-500">{
            s ? `更新时间：${dayjs(s.environmental_data.timestamp).format('YYYY-MM-DD HH:mm:ss')}` : '正在加载...'}</div>
        </div>
        <LiveBadge live={live} setLive={()=>{}} />
      </div>

      {isError && <div className="card text-red-600">后端不可用，请先启动 FastAPI。</div>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard title="流量" value={s?.operational_data.flow ?? '-'} unit="m³/h" />
        <KpiCard title="压力" value={s?.operational_data.pressure ?? '-'} unit="bar" />
        <KpiCard title="频率" value={s?.operational_data.frequency ?? '-'} unit="Hz" />
        <KpiCard title="功率" value={s?.operational_data.power ?? '-'} unit="kW" />
        <KpiCard title="电流" value={s?.operational_data.current ?? '-'} unit="A" />
        <KpiCard title="温度" value={s?.environmental_data.temp ?? '-'} unit="°C" />
      </div>

      <div className="card">
        <div className="title mb-2">上下文</div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-sm ${s?.environmental_data.is_peak ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
            {s?.environmental_data.is_peak ? '峰时' : '非峰时'}
          </span>
          <ContextBadges ctx={ctx} />
        </div>
      </div>

      <div className="card">
        <div className="title mb-2">异常（最近）</div>
        <ul className="text-sm list-disc pl-5">
          {data?.anomalies?.slice(0,6).map((a,i)=>(
            <li key={i}>{a.metric} · {a.method} · 分数 {a.score.toFixed(2)} {a.is_anomaly ? '⚠️' : ''}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
