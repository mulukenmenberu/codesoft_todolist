import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'mydb.db',
    location: 'default',
  },
  (db) => {
    // Create the "todos" table if it doesn't exist
    db.executeSql(
      `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        actionDate TEXT,
        priority TEXT,
        count INTEGER
      );`,
      [],
      () => {
        console.log('Table "todos" created successfully.');
      },
      (error) => {
        console.error('Error creating table "todos":', error);
      }
    );
  },
  (error) => {
    console.error('Error opening the database:', error);
  }
);

export const addTodo = (todoData) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO todos (title, description, actionDate, priority, count) VALUES (?, ?, ?, ?, ?)',
      [
        todoData.title,
        todoData.description,
        todoData.actionDate,
        todoData.priority,
        todoData.count,
      ],
      () => {
        console.log('Todo added successfully.');
      },
      (error) => {
        console.error('Error adding todo:', error);
      }
    );
  });
};

export const updateTodo = (id, updatedData) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE todos SET title=?, description=?, actionDate=?, priority=?, count=? WHERE id=?',
      [
        updatedData.title,
        updatedData.description,
        updatedData.actionDate,
        updatedData.priority,
        updatedData.count,
        id,
      ],
      () => {
        console.log('Todo updated successfully.');
      },
      (error) => {
        console.error('Error updating todo:', error);
      }
    );
  });
};

export const deleteTodo = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM todos WHERE id=?',
      [id],
      () => {
        console.log('Todo deleted successfully.');
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  });
};

export const getAllTodos = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM todos',
      [],
      (_, { rows }) => {
        const todos = rows.raw();
        callback(todos);
      },
      (error) => {
        console.error('Error fetching todos:', error);
        callback([]);
      }
    );
  });
};
