export default function LiveBadge({ live, setLive }: { live: boolean; setLive: (v: boolean) => void }) {
  return (
    <button
      onClick={() => setLive(!live)}
      className={`px-3 py-1 rounded-full text-sm ${live ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}
      title={live ? '暂停实时刷新' : '恢复实时刷新'}
    >
      {live ? 'LIVE' : 'PAUSE'}
    </button>
  )
}
