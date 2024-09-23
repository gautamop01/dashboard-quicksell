# Kanban Board - Frontend Assignment

This is an interactive Kanban board application built using **React JS**. The application interacts with the provided API to display and group tickets by status, user, or priority.

## Project Features

- Group tickets by **Status**, **User**, or **Priority**.
- Sort tickets by **Priority** or **Title**.
- Persist user-selected view state even after page reload.
- Responsive design matching the provided screenshots.

## Technologies Used

- React JS
- Pure CSS (No external CSS libraries)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later)

### Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/gautamop01/dashboard-quicksell/
   ```

2. Navigate to the project directory:

   ```bash
   cd dashboard-quicksell
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser:

   ```bash
   http://localhost:5173/
   ```

### Build for Production

To create a production build of the application:

```bash
npm run build
```

## Application Design

- **API URL:** [Frontend Assignment API](https://api.quicksell.co/v1/internal/frontend-assignment)

### Grouping Options

1. **By Status:** Group tickets based on their current status (e.g., Backlog, In-progress, Done).
2. **By User:** Organize tickets by the user to whom they are assigned.
3. **By Priority:** Arrange tickets by their priority level:
   - Urgent (Priority 4)
   - High (Priority 3)
   - Medium (Priority 2)
   - Low (Priority 1)
   - No Priority (Priority 0)

### Sorting Options

1. **By Priority:** Tickets are sorted in descending order based on their priority level.
2. **By Title:** Tickets are sorted in ascending order by their title.

## Screenshots

1. **Kanban Board Overview**

   ![Kanban Overview](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e1a13657-9dc2-496d-a5c7-b27be15e9fe0/Untitled.png)

2. **Group by User**

   ![Group by User](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/de6f9ade-433a-4185-a6df-4d396ea8be2d/Untitled.png)

3. **Group by Priority**

   ![Group by Priority](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2f8e52ba-2b96-40e8-be6a-34e25dd240eb/Untitled.png)
