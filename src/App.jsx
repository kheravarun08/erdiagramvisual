import { useState, useCallback } from "react";
import { ReactFlow, Background, Controls, MiniMap,
         useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import TableNode   from "./components/nodes/TableNode";
import Toolbar     from "./components/toolbar/Toolbar";
import Sidebar     from "./components/sidebar/Sidebar";
import { schemaToFlow } from "./utils/schemaToFlow";
import { defaultSchema }  from "./schema";

const nodeTypes = { tableNode: TableNode };

export default function App() {
  const [schema, setSchema] = useState(defaultSchema);
  const { nodes: initNodes, edges: initEdges } = schemaToFlow(schema);

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const [selected, setSelected] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: false,
      style: { stroke: "#4f46e5" }, type: "smoothstep" }, eds)),
    [setEdges]
  );

  const applySchema = useCallback((newSchema) => {
    setSchema(newSchema);
    const { nodes: n, edges: e } = schemaToFlow(newSchema);
    setNodes(n);
    setEdges(e);
  }, [setNodes, setEdges]);

  // Replace the addTable handler in App.jsx
const addTable = useCallback(() => {
  const id = `table_${Date.now()}`;          // unique ID every time
  const newTable = {
    id,
    name: id,                                // user can rename in sidebar
    x: 60 + Math.random() * 300,
    y: 60 + Math.random() * 200,
    columns: [
      { name: "id", type: "INT", constraints: ["PK"] },
    ],
  };
  applySchema({
    ...schema,
    tables: [...schema.tables, newTable],
  });
}, [schema, applySchema]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Toolbar
        schema={schema}
        onImport={applySchema}
        onAddTable={addTable} 
        onAutoLayout={() => applySchema(schema)}
        onClear={() => applySchema({ tables: [], relationships: [] })}
      />

      <div style={{ display: "flex", flex: 5, overflow: "hidden" }}>
        <Sidebar
          schema={schema}
          selectedId={selected}
          onSelectTable={setSelected}
          onUpdateSchema={applySchema}
        />

        <div style={{ flex: 1, height: "100%" }}>
          <ReactFlow
            nodes={nodes} edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={(_, node) => setSelected(node.id)}
            fitView
          >
            <Background variant="dots" gap={16} size={1} />
            <Controls />
            <MiniMap nodeColor={() => "#4f46e5"} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}