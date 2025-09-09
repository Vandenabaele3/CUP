import React, { useState, useEffect } from "react";
import {
  Trash2,
  Pencil,
  Plus,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useBannerColor } from "../../context/ColorContext";

interface Item {
  id: string;
  text: string;
  created: string;
  status: string;
}

type SortOrder = "asc" | "desc";

type Props = {
  items: Item[];
  onDelete?: (id: string) => void;
  itemsPerPage?: number;
};

const ListWidget: React.FC<Props> = ({
  items,
  onDelete,
  itemsPerPage = 10,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof Item>("text");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(itemsPerPage);
  const { bannerColor } = useBannerColor();

  const filteredItems = items.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aVal = a[sortBy].toString().toLowerCase();
    const bVal = b[sortBy].toString().toLowerCase();
    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedItems.length / currentItemsPerPage)
  );
  const startIndex = (currentPage - 1) * currentItemsPerPage;
  const currentItems = sortedItems.slice(
    startIndex,
    startIndex + currentItemsPerPage
  );

  const handleDelete = (id: string) => {
    if (onDelete) onDelete(id);
  };

  const handleSort = (key: keyof Item) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Zoeken op naam..."
          className="flex-grow px-3 py-1 rounded-md text-sm text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="px-2 py-1 rounded text-sm text-black"
          value={currentItemsPerPage}
          onChange={(e) => {
            setCurrentItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n}/pagina
            </option>
          ))}
        </select>

        <div className="flex items-center gap-3">
          <Menu className="cursor-pointer" />
          <Plus className="text-green-600 cursor-pointer" />
        </div>
      </div>

      {/* Tabel */}
      <table className="w-full text-left border-collapse bg-white/10 rounded-xl overflow-hidden">
        <thead style={{ backgroundColor: bannerColor }}>
          <tr className="text-white">
            <th
              className="p-2 cursor-pointer select-none"
              onClick={() => handleSort("text")}
            >
              Text {sortBy === "text" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="text-left p-2">Created</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Acties</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {currentItems.map((item) => (
            <tr
              key={item.id}
              className="border-t border-white/10 hover:bg-white/10 transition-colors"
            >
              <td className="p-2">{item.text}</td>
              <td className="p-2">{item.created}</td>
              <td className="p-2">{item.status}</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <Pencil className="text-blue-600 cursor-pointer" />
                  <Trash2
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2 text-sm text-white">
        <span>
          Pagina {currentPage} van {totalPages}
        </span>
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`text-white text-lg ${
              currentPage === 1 ? "opacity-30 cursor-default" : "hover:text-gray-300"
            }`}
            aria-label="Vorige pagina"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`text-white text-lg ${
              currentPage === totalPages
                ? "opacity-30 cursor-default"
                : "hover:text-gray-300"
            }`}
            aria-label="Volgende pagina"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListWidget;
