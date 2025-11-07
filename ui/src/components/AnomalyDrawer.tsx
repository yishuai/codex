import type { AnomalyFlag } from '../types'

export default function AnomalyDrawer({
  open, onClose, anomaly,
}: { open: boolean; onClose: () => void; anomaly?: AnomalyFlag }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end">
      <div className="w-[380px] h-full bg-white p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="title">异常详情</div>
          <button onClick={onClose} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">关闭</button>
        </div>
        {anomaly ? (
          <div className="mt-4 space-y-2">
            <div>指标：<b>{anomaly.metric}</b></div>
            <div>方法：{anomaly.method}</div>
            <div>分数：{anomaly.score.toFixed(3)}</div>
            <div>是否异常：{anomaly.is_anomaly ? '是' : '否'}</div>
            <div className="text-sm text-gray-500 mt-4">（此处可扩展：局部曲线、相似片段、共现指标）</div>
          </div>
        ) : (
          <div className="mt-4 text-gray-500 text-sm">未选择异常</div>
        )}
      </div>
    </div>
  )
}
