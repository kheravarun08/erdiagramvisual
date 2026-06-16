import TableCard   from "./TableCard";
import "./SidebarUI.css";

export default function SidebarUI({ schema, selectedId, onSelectTable, state, handlers }) {
  return (
    <div className="sidebar">

      <div className="sidebar__header">
        TABLES ({schema.tables.length})
      </div>

      <div className="sidebar__list">
        {schema.tables.length === 0 && (
          <p className="sidebar__empty">No tables yet.</p>
        )}
        {schema.tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            isSelected={selectedId === table.id}
            isOpen={!state.isCollapsed(table.id)}
            editingName={state.editingName}
            editingCol={state.editingCol}
            handlers={handlers}
            onSelectTable={onSelectTable}
          />
        ))}
      </div>

      <div className="sidebar__footer">
        Double-click name to rename
      </div>

    </div>
  );
}