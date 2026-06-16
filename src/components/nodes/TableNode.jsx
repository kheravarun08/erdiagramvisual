import TableNodeUI from "./TableNodeUI";

/**
 * ReactFlow calls this with { data, selected }.
 * Unpacks the ReactFlow props and passes clean props to the UI.
 * This is the only file that knows about ReactFlow's node prop shape.
 */
export default function TableNode({ data, selected }) {
  return (
    <TableNodeUI
      label={data.label}
      columns={data.columns ?? []}
      selected={selected}
    />
  );
}