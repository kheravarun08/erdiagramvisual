export const defaultSchema = {
  tables: [
    {
      id: "users",
      name: "users",
      x: 40,
      y: 40,
      columns: [
        { name: "id",         type: "INT",          constraints: ["PK", "NOT NULL"] },
        { name: "email",      type: "VARCHAR(255)",  constraints: ["UNIQUE"] },
        { name: "username",   type: "VARCHAR(100)",  constraints: [] },
        { name: "created_at", type: "TIMESTAMP",     constraints: [] },
      ],
    },
    {
      id: "orders",
      name: "orders",
      x: 320,
      y: 40,
      columns: [
        { name: "id",      type: "INT",           constraints: ["PK"] },
        { name: "user_id", type: "INT",           constraints: ["FK"] },
        { name: "total",   type: "DECIMAL(10,2)", constraints: [] },
        { name: "status",  type: "VARCHAR(50)",   constraints: [] },
      ],
    },
    {
      id: "products",
      name: "products",
      x: 40,
      y: 280,
      columns: [
        { name: "id",    type: "INT",           constraints: ["PK"] },
        { name: "name",  type: "VARCHAR(200)",  constraints: [] },
        { name: "price", type: "DECIMAL(10,2)", constraints: [] },
        { name: "stock", type: "INT",           constraints: [] },
      ],
    },
    {
      id: "order_items",
      name: "order_items",
      x: 320,
      y: 280,
      columns: [
        { name: "id",         type: "INT", constraints: ["PK"] },
        { name: "order_id",   type: "INT", constraints: ["FK"] },
        { name: "product_id", type: "INT", constraints: ["FK"] },
        { name: "quantity",   type: "INT", constraints: [] },
      ],
    },
  ],
  relationships: [
    {
      id: "users-orders",
      source: "users",
      target: "orders",
      sourceColumn: "id",
      targetColumn: "user_id",
    //   type: "one-to-many",
    },
    {
      id: "orders-order_items",
      source: "orders",
      target: "order_items",
      sourceColumn: "id",
      targetColumn: "order_id",
    //   type: "one-to-many",
    },
    {
      id: "products-order_items",
      source: "products",
      target: "order_items",
      sourceColumn: "id",
      targetColumn: "product_id",
    //   type: "one-to-many",
    },
  ],
};