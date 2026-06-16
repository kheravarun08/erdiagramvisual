// utils/schemaToFlow.js
import dagre from "@dagrejs/dagre"; // auto-layout

const NODE_WIDTH = 280;
const NODE_HEIGHT_BASE = 48 + 32; // header + padding

export function schemaToFlow(schema) {
  // Build nodes
  const nodes = schema.tables.map((table) => ({
    id: table.id,
    type: "tableNode",
    data: {
      label: table.name,
      columns: table.columns,
    },
    position: { x: 0, y: 0 }, // dagre will set this
    width: NODE_WIDTH,
    height: NODE_HEIGHT_BASE + table.columns.length * 32,
  }));

  // Build edges with relationship labels
  const edges = schema.relationships.map((rel) => ({
    id: rel.id,
    source: rel.source,
    target: rel.target,
    type: "smoothstep",
    animated: false,
    label: rel.type,
    markerEnd: { type: "arrowclosed" },
    style: { stroke: "#6366f1" },
  }));

  return applyDagreLayout(nodes, edges);
}

function applyDagreLayout(nodes, edges) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "LR", ranksep: 80, nodesep: 40 });

  nodes.forEach((n) => g.setNode(n.id, { width: n.width, height: n.height }));
  edges.forEach((e) => g.setEdge(e.source, e.target));

  dagre.layout(g);

  return {
    nodes: nodes.map((n) => {
      const pos = g.node(n.id);
      return { ...n, position: { x: pos.x - n.width / 2, y: pos.y - n.height / 2 } };
    }),
    edges,
  };
}