import React, { useState, useMemo, ChangeEvent } from "react";

type ListItem = {
  id: string;
  text: string;
  created: string;
  status: string;
};

type SortKey = keyof ListItem;

type ListWidgetProps = {
  initialItems?: ListItem[];
  itemsPerPage?: number;
};

export default function ListWidget({
  initialItems = [],
  itemsPerPage = 20,
}: ListWidgetProps) {
  const [items, setItems] = useState<ListItem[]>(initialItems);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("text");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(itemsPerPage);
  const [visibleColumns, setVisibleColumns] = useState<SortKey[]>(["text", "created", "status"]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const toggleColumn = (key: SortKey) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const filtered = useMemo(() => {
    return items
      .filter((item) =>
        item.text.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (typeof aVal === "string" && typeof bVal === "string") {
          const comparison = aVal.localeCompare(bVal);
          return sortOrder === "asc" ? comparison : -comparison;
        }
        return 0;
      });
  }, [items, search, sortKey, sortOrder]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const startEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = () => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, text: editingText } : item
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const handleAddClick = () => {
    alert("Nieuwe wizard wordt hier gelanceerd (dummy knop).");
  };

  const handleColumnsClick = () => {
    alert("Kolommen toevoegen/verwijderen (dummy knop)");
  };

  return (
    <div style={{ padding: "1rem", fontSize: "0.875rem", minWidth: "500px" }}>
      {/* Zoeken + Acties */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <input
          placeholder="Zoeken op naam..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          style={{ flex: 1, padding: "0.25rem", fontSize: "0.875rem" }}
        />
        <button onClick={handleColumnsClick} style={{ padding: "0.25rem" }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="orange"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <button onClick={handleAddClick} style={{ padding: "0.25rem" }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="green"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Tabel */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#d1e3f8" }}>
            {visibleColumns.map((key) => (
              <th
                key={key}
                onClick={() => toggleSort(key)}
                style={{
                  textAlign: "left",
                  padding: "0.5rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                  borderBottom: "1px solid #ccc",
                  backgroundColor: sortKey === key ? "#d0d6dc" : undefined,
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {sortKey === key && (sortOrder === "asc" ? " ↑" : " ↓")}
              </th>
            ))}
            <th style={{ padding: "0.5rem", borderBottom: "1px solid #ccc" }}>
              Acties
            </th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((item, index) => (
            <tr
              key={item.id}
              style={{
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f0f4f8",
              }}
            >
              {visibleColumns.map((key) => (
                <td key={key} style={{ padding: "0.5rem" }}>
                  {editingId === item.id && key === "text" ? (
                    <input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    item[key]
                  )}
                </td>
              ))}
              <td style={{ padding: "0.5rem" }}>
                {editingId === item.id ? (
                  <button onClick={saveEdit} title="Opslaan">✔</button>
                ) : (
                  <button onClick={() => startEdit(item.id, item.text)} title="Bewerken">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="blue"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                    </svg>
                  </button>
                )}
                <button onClick={() => deleteItem(item.id)} title="Verwijderen">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="red"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginering */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "0.5rem",
          fontSize: "0.75rem",
        }}
      >
        <span>Pagina {page} van {totalPages}</span>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            style={{ fontSize: "0.75rem", padding: "0.25rem" }}
          >
            {[5, 10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n} per pagina
              </option>
            ))}
          </select>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
            Vorige
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Volgende
          </button>
        </div>
      </div>
    </div>
  );
}
