import { useSidebar } from "./useSidebar";
import SidebarUI      from "./SidebarUI";

export default function Sidebar({ schema, selectedId, onSelectTable, onUpdateSchema }) {
  const {
    editingCol,  setEditingCol,
    editingName, setEditingName,
    isCollapsed, toggleCollapse,
    commitTableName, deleteTable,
    addColumn, deleteColumn, updateColumn, toggleConstraint,
  } = useSidebar(schema, onUpdateSchema);

  const state    = { editingCol, editingName, isCollapsed };
  const handlers = {
    setEditingCol, setEditingName, toggleCollapse,
    commitTableName, deleteTable,
    addColumn, deleteColumn, updateColumn, toggleConstraint,
  };

  return (
    <SidebarUI
      schema={schema}
      selectedId={selectedId}
      onSelectTable={onSelectTable}
      state={state}
      handlers={handlers}
    />
  );
}