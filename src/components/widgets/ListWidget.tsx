import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaEdit,
  FaPlus,
  FaBars,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface Item {
  id: string;
  text: string;
  created: string;
  status: string;
}

interface ListWidgetProps {
  initialItems: Item[];
  itemsPerPage?: number;
}

const ListWidget: React.FC<ListWidgetProps> = ({
  initialItems,
  itemsPerPage = 15,
}) => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof Item>("text");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentItemsPerPage, setCurrentItemsPerPage] =
    useState(itemsPerPage);

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

  const totalPages = Math.ceil(sortedItems.length / currentItemsPerPage);
  const startIndex = (currentPage - 1) * currentItemsPerPage;
  const currentItems = sortedItems.slice(
    startIndex,
    startIndex + currentItemsPerPage
  );

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
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
          {[5, 10, 15, 20, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num} per pagina
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 text-white">
          <FaBars className="cursor-pointer" />
          <FaPlus className="cursor-pointer" />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm bg-white/5 rounded-md overflow-hidden">
        <thead>
          <tr className="bg-white/10">
            <th
              className="cursor-pointer text-left p-2"
              onClick={() => handleSort("text")}
            >
              Text {sortBy === "text" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="text-left p-2">Created</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Acties</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? "bg-white/5" : "bg-white/10"}
            >
              <td className="p-2">{item.text}</td>
              <td className="p-2">{item.created}</td>
              <td className="p-2">{item.status}</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <FaEdit className="text-blue-600 cursor-pointer" />
                  <FaTrash
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
              currentPage === 1
                ? "opacity-30 cursor-default"
                : "hover:text-gray-300"
            }`}
            aria-label="Vorige pagina"
          >
            <FaChevronLeft />
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
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListWidget;
