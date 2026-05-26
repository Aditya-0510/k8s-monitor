interface Props {
  title: string
  value: string | number
}

function SummaryCard({ title, value }: Props) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-slate-400 text-sm">
        {title}
      </h2>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  )
}

export default SummaryCard