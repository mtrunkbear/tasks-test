# Task Manager App

This is a task management application built using React.js and Redux for state management. It allows users to create, modify, and delete tasks. Each task has a description, creation date, and due date. The application also provides a color-coded system to indicate tasks that are on time, approaching their due date, or overdue. Users can sort and filter tasks by date or description content.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd tasks-test
```

3. Install backend dependencies:

```bash
npm install json-server
```

4. Start the JSON server for the API:

```bash
npx json-server --watch db.json --port 5000
```

5. In a new terminal, install frontend dependencies:

```bash
npm install
```

6. Run the development server:

```bash
npm run dev
```

7. Open your browser and go to [http://localhost:5173](http://localhost:5173) to access the application.

## Features

- Create tasks with a description and due date.
- Modify task details and due date.
- Delete tasks.
- Tasks are color-coded based on their due date status.
- Sort tasks by creation date, due date, or status.
- Filter tasks by text, date range, and status.
- Utilizes Redux for state management.
- Additional styles and design elements for enhanced user experience.

## Technologies Used

- React.js
- Redux (with Redux Toolkit)
- Emotion (for styling)
- Material-UI Icons and Components
- Axios (for API communication)
- JSON Server (for backend mock API)
- TypeScript (optional, for type checking)
