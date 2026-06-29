export interface SpecRow {
  label: string;
  value: React.ReactNode;
}

interface SpecTableProps {
  rows: SpecRow[];
}

/** Two-column key/value specification table (REDESIGN_SPEC §3.11). */
export function SpecTable({ rows }: SpecTableProps) {
  if (!rows || rows.length === 0) return null;
  return (
    <div className="specs not-prose">
      <table>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
