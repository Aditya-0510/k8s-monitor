interface Props {
  status: string;
}

function StatusBadge({ status }: Props) {
  const styles: Record<string, string> = {
    // Kubernetes pod statuses
    Running: "bg-green-500/20 text-green-400",
    Pending: "bg-yellow-500/20 text-yellow-400",
    ContainerCreating: "bg-blue-500/20 text-blue-400",
    Completed: "bg-slate-500/20 text-slate-300",

    ImagePullBackOff: "bg-red-500/20 text-red-400",
    ErrImagePull: "bg-red-500/20 text-red-400",
    CrashLoopBackOff: "bg-red-500/20 text-red-400",
    Failed: "bg-red-500/20 text-red-400",
    Unknown: "bg-red-500/20 text-red-400",

    // Cluster health statuses
    Healthy: "bg-green-500/20 text-green-400",
    Warning: "bg-yellow-500/20 text-yellow-400",
    Critical: "bg-red-500/20 text-red-400",
  };

  const style =
    styles[status] ??
    "bg-slate-500/20 text-slate-300";

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${style}
      `}
    >
      {status}
    </span>
  );
}

export default StatusBadge;