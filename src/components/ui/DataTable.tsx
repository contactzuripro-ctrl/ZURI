import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

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

/** Tableau neumorphique : conteneur en relief, séparations discrètes. */
export function DataTable<Row>({ columns, rows, rowKey }: DataTableProps<Row>) {
  return (
    <Card className="overflow-x-auto p-2">
      <table className="w-full min-w-155 text-left">
        <thead>
          <tr className="text-sm text-ink-600">
            {columns.map((column) => (
              <th
                key={column.header}
                className={`px-6 py-4 font-medium ${column.align === "right" ? "text-right" : ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className="border-t border-cream-200/70 text-[15px]"
            >
              {columns.map((column) => (
                <td
                  key={column.header}
                  className={`px-6 py-4 ${column.align === "right" ? "text-right" : ""}`}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
