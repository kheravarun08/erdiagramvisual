import ColumnRow from "./ColumnRow";
import "./SidebarUI.css";

export default function TableCard({
  table, isSelected, isOpen,
  editingName, editingCol,
  handlers, onSelectTable,
}) {
  const {
    toggleCollapse, commitTableName,
    setEditingName, addColumn, deleteTable,
  } = handlers;

  return (
    <div className={`table-card ${isSelected ? "table-card--selected" : ""}`}>

      {/* ── Header ── */}
      <div className={[
        "table-card__header",
        isSelected ? "table-card__header--selected" : "",
        isOpen     ? "table-card__header--open"     : "",
      ].join(" ")}>

        <button
          className="btn-collapse"
          title={isOpen ? "Collapse" : "Expand"}
          onClick={() => toggleCollapse(table.id)}
        >
          {isOpen ? "▾" : "▸"}
        </button>

        {editingName === table.id ? (
          <input
            autoFocus
            defaultValue={table.name}
            className="table-card__name-input"
            placeholder="Table name..."
            onBlur={(e)    => commitTableName(table.id, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter")  commitTableName(table.id, e.target.value);
              if (e.key === "Escape") setEditingName(null);
            }}
          />
        ) : (
          <span
            title="Double-click to rename"
            className="table-card__name"
            onClick={() => onSelectTable(table.id)}
            onDoubleClick={() => setEditingName(table.id)}
          >
            {table.name}
          </span>
        )}

        <span className="table-card__col-count">
          {table.columns.length}c
        </span>

        <button
          title="Add column"
          className="btn-add-col"
          onClick={() => addColumn(table.id)}
        >+</button>

        <button
          title="Delete table"
          className="btn-delete-table"
          onClick={() => deleteTable(table.id)}
        >✕</button>

      </div>

      {/* ── Columns ── */}
      {isOpen && (
        <div className="table-card__columns">
          {table.columns.length === 0 && (
            <div className="table-card__columns-empty">
              No columns yet — click + to add one
            </div>
          )}
          {table.columns.map((col, ci) => (
            <ColumnRow
              key={ci}
              col={col}
              colIndex={ci}
              tableId={table.id}
              isEditing={
                editingCol?.tableId === table.id &&
                editingCol?.colIndex === ci
              }
              handlers={handlers}
            />
          ))}
        </div>
      )}

    </div>
  );
}