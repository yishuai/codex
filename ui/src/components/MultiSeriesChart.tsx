// src/components/MultiSeriesChart.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts'
import dayjs from 'dayjs'
import type { TimeseriesPoint } from '../types'

export default function MultiSeriesChart({data, metrics}:{data:TimeseriesPoint[]; metrics:string[]}) {
  return (
    <div className="card h-[420px]">
      <div className="title mb-2">多指标联动曲线</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tickFormatter={(t)=>dayjs(t as string).format('HH:mm')} minTickGap={50} />
          <YAxis />
          <Tooltip labelFormatter={(t)=>dayjs(t as string).format('YYYY-MM-DD HH:mm:ss')} />
          <Legend />
          {metrics.map((m) => (
            <Line key={m} type="monotone" dataKey={m} dot={false} strokeWidth={2} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
