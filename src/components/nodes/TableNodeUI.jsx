import { Handle, Position } from "@xyflow/react";
import "./TableNode.css";

// ── Badge sub-component ───────────────────────────────────────────────────

function ConstraintBadge({ constraint }) {
  const classMap = {
    PK:       "col-badge col-badge--pk",
    FK:       "col-badge col-badge--fk",
    // UNIQUE:   "col-badge col-badge--unique",
    // "NOT NULL": "col-badge col-badge--notnull",
  };

  const className = classMap[constraint];
  if (!className) return null;

  return <span className={className}>{constraint}</span>;
}

// ── Column row sub-component ──────────────────────────────────────────────

function ColumnRow({ col, isLast }) {
  const VISIBLE_CONSTRAINTS = ["PK", "FK", "UNIQUE", "NOT NULL"];
  const badges = (col.constraints ?? []).filter((c) =>
    VISIBLE_CONSTRAINTS.includes(c)
  );

  return (
    <div className="table-node__col">

      {/* Fixed-width badge slot — keeps column names aligned */}
      <div className="table-node__badge-slot">
        {badges.map((c) => (
          <ConstraintBadge key={c} constraint={c} />
        ))}
      </div>

      <span className="table-node__col-name">{col.name}</span>
      <span className="table-node__col-type">{col.type}</span>

    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────

export default function TableNodeUI({ label, columns, selected }) {
  return (
    <div className={`table-node ${selected ? "table-node--selected" : ""}`}>

      <Handle
        type="target"
        position={Position.Left}
        className="table-node__handle"
      />

      {/* Header */}
      <div className="table-node__header">
        <span className="table-node__icon">⊞</span>
        <span className="table-node__title">{label}</span>
      </div>

      {/* Columns */}
      <div className="table-node__columns">
        {columns.map((col, i) => (
          <ColumnRow
            key={col.name ?? i}
            col={col}
            isLast={i === columns.length - 1}
          />
        ))}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="table-node__handle"
      />

    </div>
  );
}