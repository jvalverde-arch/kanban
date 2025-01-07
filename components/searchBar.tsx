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
        <div className="flex items-center gap-2 p-2 rounded-full bg-gray-100 shadow-md">
            <input
                type="text"
                placeholder="Search Bookings..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="p-2 rounded-full border border-gray-300 outline-none w-full"
            />
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 rounded-full border border-gray-300 outline-none w-[9em]"
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 rounded-full border border-gray-300 outline-none w-[9em]"
            />
            <button onClick={handleSearch} className="p-2 px-4 rounded-full border-none bg-blue-500 text-white cursor-pointer w-[9em]">
                Search
            </button>
        </div>
    );
};
