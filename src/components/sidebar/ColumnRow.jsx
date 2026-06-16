import "./SidebarUI.css";

const TYPES = [
  "INT", "BIGINT", "VARCHAR(255)", "VARCHAR(100)", "VARCHAR(50)",
  "TEXT", "BOOLEAN", "TIMESTAMP", "DATE", "DECIMAL(10,2)", "FLOAT", "JSON",
];

export default function ColumnRow({ col, colIndex, tableId, isEditing, handlers }) {
  const { setEditingCol, updateColumn, deleteColumn, toggleConstraint } = handlers;

  return (
    <div className="col-row">

      {/* ── Row 1: badges + column name ── */}
      <div className="col-row__top">
        <button
          title="Toggle PK"
          className={`badge ${col.constraints.includes("PK") ? "badge--pk-active" : ""}`}
          onClick={() => toggleConstraint(tableId, colIndex, "PK")}
        >
          PK
        </button>

        <button
          title="Toggle FK"
          className={`badge ${col.constraints.includes("FK") ? "badge--fk-active" : ""}`}
          onClick={() => toggleConstraint(tableId, colIndex, "FK")}
        >
          FK
        </button>

        {isEditing ? (
          <input
            autoFocus
            value={col.name}
            className="col-row__name-input"
            onChange={(e) => updateColumn(tableId, colIndex, "name", e.target.value)}
            onBlur={() => setEditingCol(null)}
            onKeyDown={(e) => e.key === "Enter" && setEditingCol(null)}
          />
        ) : (
          <span
            title="Double-click to rename"
            className="col-row__name"
            onDoubleClick={() => setEditingCol({ tableId, colIndex })}
          >
            {col.name}
          </span>
        )}
      </div>

      {/* ── Row 2: type dropdown + delete ── */}
      <div className="col-row__bottom">
        <select
          value={col.type}
          className="col-row__type-select"
          onChange={(e) => updateColumn(tableId, colIndex, "type", e.target.value)}
        >
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <button
          title="Delete column"
          className="btn-delete"
          onClick={() => deleteColumn(tableId, colIndex)}
        >
          ✕
        </button>
      </div>

    </div>
  );
}