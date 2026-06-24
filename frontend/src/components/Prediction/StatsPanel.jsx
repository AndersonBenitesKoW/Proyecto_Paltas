import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = { Primera: '#52b788', Segunda: '#ffd166', Tercera: '#ef476f' }

export default function StatsPanel({ stats }) {
  if (!stats) return null

  const data = [
    { name: 'Primera', value: stats.Primera, color: COLORS.Primera },
    { name: 'Segunda', value: stats.Segunda, color: COLORS.Segunda },
    { name: 'Tercera', value: stats.Tercera, color: COLORS.Tercera },
  ].filter((d) => d.value > 0)

  const isCosechar = stats.recommendation === 'Cosechar'

  return (
    <div className="card space-y-6">
      <h3 className="text-lg font-semibold text-white/90">Resultados</h3>

      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold text-white">
          {stats.total}
        </span>
        <span className="text-sm text-white/50">paltas detectadas</span>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#1a1a2e',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                color: '#e2e8f0',
              }}
              formatter={(value) => `${value}%`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: d.color }}
              />
              <span className="text-sm text-white/70">{d.name}</span>
            </div>
            <span className="text-sm font-semibold text-white">{d.value}%</span>
          </div>
        ))}
      </div>

      <div
        className={`rounded-xl px-4 py-3 text-center font-bold text-lg transition-all duration-500 ${
          isCosechar
            ? 'bg-[#52b788]/20 text-[#52b788] border border-[#52b788]/30'
            : 'bg-[#ef476f]/20 text-[#ef476f] border border-[#ef476f]/30'
        }`}
      >
        {isCosechar ? '✅ COSECHAR' : '⏳ ESPERAR'}
      </div>
    </div>
  )
}
