import type { ReactNode } from "react";

export interface DataTableColumn<Row> {
  header: string;
  /** Rend la cellule pour une ligne donnée. */
  cell: (row: Row) => ReactNode;
  align?: "left" | "right";
}

interface DataTableProps<Row> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  /** Clé React unique pour chaque ligne. */
  rowKey: (row: Row) => string;
}

/**
 * Tableau minimaliste : pas de conteneur marqué, en-têtes discrets
 * en petites capitales, fines lignes de séparation, rangées aérées.
 */
export function DataTable<Row>({ columns, rows, rowKey }: DataTableProps<Row>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-155 text-left">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-ink-400">
            {columns.map((column) => (
              <th
                key={column.header}
                className={`px-4 py-3 font-medium ${column.align === "right" ? "text-right" : ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-t border-hairline">
              {columns.map((column) => (
                <td
                  key={column.header}
                  className={`px-4 py-5 text-[15px] ${column.align === "right" ? "text-right" : ""}`}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
