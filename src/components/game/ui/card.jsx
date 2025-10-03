export function Card({ children, className = "" }) {
  return <div className={`rounded-lg border p-4 bg-white ${className}`}>{children}</div>;
}
export function CardHeader({ children, className = "" }) { return <div className={`mb-2 ${className}`}>{children}</div>; }
export function CardTitle({ children, className = "" }) { return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>; }
export function CardContent({ children, className = "" }) { return <div className={className}>{children}</div>; }