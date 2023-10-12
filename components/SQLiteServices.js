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

    // Create the "settings" table if it doesn't exist
    db.executeSql(
      `CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        deleteolditems INTEGER
      );`,
      [],
      () => {
        console.log('Table "settings" created successfully.');
      },
      (error) => {
        console.error('Error creating table "settings":', error);
      }
    );

    // Insert default settings data
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO settings (name, deleteolditems) VALUES (?, ?)',
        ['User', 0],
        () => {
          console.log('Settings added successfully.');
        },
        (error) => {
          console.error('Error adding settings:', error);
        }
      );
    });
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

export const updateSetting = (updateSetting) => {
  try{
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE settings SET name=?, deleteolditems=?',
      [updateSetting.name, updateSetting.deleteolditems],
      () => {
        console.log('Setting updated successfully.');
      },
      (error) => {
        console.error('Error updating Setting:', error);
      }
    );
  });
}catch(e){}
};

export const updateTodo = (id, updatedData) => {
  try{
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
}catch(e){}
};

export const deleteTodo = (id) => {
  try{
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
}catch(e){}
};

export const getAllTodos = (callback) => {
  try{
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
}catch(e){}
};



export const getSettings = (callback) => {
  try{
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM settings LIMIT 1',
      [],
      (_, { rows }) => {
        const settings = rows.raw();
        callback(settings);
      },
      (error) => {
        console.error('Error fetching settings:', error);
        callback([]);
      }
    );
  });
}catch(e){}
};