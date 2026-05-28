export interface Alert {
  id: string

  severity:
    | "critical"
    | "warning"
    | "info"

  message: string

  timestamp: string
}