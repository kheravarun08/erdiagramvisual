# ERDiagramVisual

> Interactive SQL Schema to Entity Relationship Diagram (ERD) Visualizer built with React and Vite.

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

ERDiagramVisual is a web application that transforms SQL database schemas into interactive Entity Relationship Diagrams (ERDs).

The application parses SQL table definitions, extracts relationships between entities, and renders a visual representation that helps developers, database administrators, and architects understand database structures quickly.

---

## Features

* SQL schema parsing
* Automatic table detection
* Relationship mapping
* Interactive ER diagram visualization
* Visual representation of primary and foreign keys
* Drag-and-drop node interactions
* Clean sidebar for schema exploration
* Fast Vite-powered development experience

---

## Demo

Add screenshots or a live demo URL here.

```text
SQL Schema
     │
     ▼
 SQL Parser
     │
     ▼
 Schema Model
     │
     ▼
 Flow Generator
     │
     ▼
 Interactive ER Diagram
```

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript (ES6+)
* CSS

### Core Modules

| Module          | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| sqlParser.js    | Parses SQL schema definitions                        |
| schemaToFlow.js | Converts schema objects into diagram nodes and edges |
| TableNode       | Custom node rendering                                |
| Sidebar         | Schema navigation and management                     |
| Toolbar         | Diagram actions and controls                         |

---

## Project Structure

```text
erdiagramvisual/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   └── hero.png
│   │
│   ├── components/
│   │   ├── nodes/
│   │   │   ├── TableNode.jsx
│   │   │   └── TableNodeUI.jsx
│   │   │
│   │   ├── sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TableCard.jsx
│   │   │   └── useSidebar.js
│   │   │
│   │   └── toolbar/
│   │       ├── Toolbar.jsx
│   │       ├── ToolbarUI.jsx
│   │       └── useToolbar.js
│   │
│   ├── utils/
│   │   ├── sqlParser.js
│   │   └── schemaToFlow.js
│   │
│   ├── schema.js
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/kheravarun08/erdiagramvisual.git

cd erdiagramvisual
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Usage

### Example SQL Schema

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Workflow

1. Paste SQL schema.
2. Parse schema definitions.
3. Generate entities and relationships.
4. Render interactive ER diagram.
5. Explore table connections visually.

---

## Architecture

```text
sqlParser.js
      │
      ▼
Parsed Schema
      │
      ▼
schemaToFlow.js
      │
      ▼
React Flow Nodes
      │
      ▼
TableNode Components
      │
      ▼
ER Diagram UI
```

---

## Future Enhancements

* Export diagrams as PNG
* Export diagrams as SVG
* Zoom-to-fit functionality
* Multiple schema support
* PostgreSQL-specific parsing
* MySQL-specific parsing
* Database connection import
* Diagram persistence
* Dark mode support

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Author

**Varun Khera**

GitHub: https://github.com/kheravarun08

---

⭐ If you find this project useful, consider giving it a star on GitHub.
