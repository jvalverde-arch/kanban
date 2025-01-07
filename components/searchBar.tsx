import React, { useState } from 'react';

interface SKU {
  id: string;
  name: string;
  selected: boolean;
  comment?: string
}

interface Task {
  provider: string;
  id: string;
  title: string;
  assignee: string;
  priority?: "low" | "medium" | "high";
  skus: SKU[],
  state: string;
}

interface SearchBarProps {
    tasks: Task[];
    onSearch: (filteredTasks: Task[]) => void;
    setTasks: (tasks: Task[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ tasks, onSearch, setTasks }) => {
    const [searchText, setSearchText] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSearch = () => {

        console.log(searchText);
        console.log(tasks);

        // search the tasks based on the searchText
        const filteredTasks = tasks.filter((task) => {
            const taskTitle = task.title.toLowerCase();
            const taskAssignee = task.assignee.toLowerCase();
            const taskProvider = task.provider.toLowerCase();
            const taskState = task.state.toLowerCase();
            const taskPriority = task.priority?.toLowerCase();

            return (
                taskTitle.includes(searchText.toLocaleLowerCase()) ||
                taskAssignee.includes(searchText.toLocaleLowerCase()) ||
                taskProvider.includes(searchText.toLocaleLowerCase()) ||
                taskState.includes(searchText.toLocaleLowerCase()) ||
                taskPriority?.includes(searchText.toLocaleLowerCase())

            );
        });

        console.log("filtrado",filteredTasks);

        setTasks(filteredTasks);


    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                placeholder="Search Bookings..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={styles.input}
            />
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={styles.input}
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleSearch} style={styles.button}>
                Search
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        borderRadius: '25px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
        padding: '10px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        outline: 'none',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
};
