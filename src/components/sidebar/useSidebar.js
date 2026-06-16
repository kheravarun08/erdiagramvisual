import { useState } from "react";

/**
 * All sidebar business logic — state, mutations, and schema updates.
 * Zero JSX. Fully testable without mounting any component.
 */
export function useSidebar(schema, onUpdateSchema) {
  const [editingCol,  setEditingCol]  = useState(null); // { tableId, colIndex }
  const [editingName, setEditingName] = useState(null); // tableId string
  const [collapsed,   setCollapsed]   = useState({});   // { tableId: bool }

  // ── Internal helpers ──────────────────────────────────────────────────────

  /** Push an updated tables array into the parent schema */
  const pushTables = (tables) =>
    onUpdateSchema({ ...schema, tables });

  /** Apply a transformation to one table's columns only */
  const mutateCols = (tableId, mapFn) =>
    pushTables(
      schema.tables.map((t) =>
        t.id !== tableId ? t : { ...t, columns: mapFn(t.columns) }
      )
    );

  // ── Collapse ──────────────────────────────────────────────────────────────

  const toggleCollapse = (tableId) =>
    setCollapsed((prev) => ({ ...prev, [tableId]: !prev[tableId] }));

  const isCollapsed = (tableId) => !!collapsed[tableId];

  // ── Table actions ─────────────────────────────────────────────────────────

  const commitTableName = (tableId, rawValue) => {
    const name = rawValue.trim();
    if (name) {
      pushTables(
        schema.tables.map((t) =>
          t.id !== tableId ? t : { ...t, name }
        )
      );
    }
    setEditingName(null);
  };

  const deleteTable = (tableId) =>
    onUpdateSchema({
      tables: schema.tables.filter((t) => t.id !== tableId),
      relationships: schema.relationships.filter(
        (r) => r.source !== tableId && r.target !== tableId
      ),
    });

  // ── Column actions ────────────────────────────────────────────────────────

  const addColumn = (tableId) => {
    mutateCols(tableId, (cols) => [
      ...cols,
      { name: "new_col", type: "INT", constraints: [] },
    ]);
    setCollapsed((prev) => ({ ...prev, [tableId]: false })); // auto-expand
  };

  const deleteColumn = (tableId, colIndex) =>
    mutateCols(tableId, (cols) =>
      cols.filter((_, i) => i !== colIndex)
    );

  const updateColumn = (tableId, colIndex, field, value) =>
    mutateCols(tableId, (cols) =>
      cols.map((c, i) =>
        i !== colIndex ? c : { ...c, [field]: value }
      )
    );

  const toggleConstraint = (tableId, colIndex, key) =>
    mutateCols(tableId, (cols) =>
      cols.map((c, i) => {
        if (i !== colIndex) return c;
        const has = c.constraints.includes(key);
        return {
          ...c,
          constraints: has
            ? c.constraints.filter((x) => x !== key)
            : [...c.constraints, key],
        };
      })
    );

  // ── Public API ────────────────────────────────────────────────────────────

  return {
    // UI state
    editingCol,  setEditingCol,
    editingName, setEditingName,
    isCollapsed, toggleCollapse,
    // Table actions
    commitTableName,
    deleteTable,
    // Column actions
    addColumn,
    deleteColumn,
    updateColumn,
    toggleConstraint,
  };
}