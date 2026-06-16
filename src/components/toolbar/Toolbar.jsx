import { useToolbar } from "./useToolbar";
import ToolbarUI     from "./ToolbarUI";

/**
 * Orchestrator — wires the hook to the UI.
 * No logic, no styles, no JSX beyond delegating to ToolbarUI.
 */
export default function Toolbar({ schema, onImport, onAddTable, onAutoLayout, onClear }) {
  const {
    fileRef,
    exportJSON,
    openFilePicker,
    handleFileImport,
    handleSQLImport,
  } = useToolbar(schema, onImport);

  return (
    <ToolbarUI
      fileRef={fileRef}
      onAddTable={onAddTable}
      onAutoLayout={onAutoLayout}
      onSQLImport={handleSQLImport}
      onOpenFilePicker={openFilePicker}
      onFileImport={handleFileImport}
      onExportJSON={exportJSON}
      onClear={onClear}
    />
  );
}