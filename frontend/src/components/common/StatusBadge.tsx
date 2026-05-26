interface Props {
  status: "Healthy" | "Warning" | "Critical"
}

function StatusBadge({ status }: Props) {

  const styles = {
    Healthy: "bg-green-500/20 text-green-400",
    Warning: "bg-yellow-500/20 text-yellow-400",
    Critical: "bg-red-500/20 text-red-400",
  }

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-sm font-medium
        ${styles[status]}
      `}
    >
      {status}
    </span>
  )
}

export default StatusBadge