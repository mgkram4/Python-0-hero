export const Table = ({ children }: { children: React.ReactNode }) => (
  <table className="w-full">{children}</table>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-50">{children}</thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr>{children}</tr>
);

export const TableHead = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-2 text-left">{children}</th>
);

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="px-4 py-2">{children}</td>
); 