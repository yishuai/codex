export default function ContextBadges({ ctx }: { ctx: Record<string, number> | undefined }) {
  if (!ctx) return null
  const keys = Object.keys(ctx)
  return (
    <div className="flex flex-wrap gap-2">
      {keys.map((k) => (
        <span key={k} className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-sm">
          {k}: {ctx[k].toFixed(3)}
        </span>
      ))}
    </div>
  )
}
