import React, { useState, useEffect } from 'react';

interface SKU {
    id: string;
    name: string;
    selected: boolean;
    comment?: string;
}

interface Task {
    provider: string;
    id: string;
    title: string;
    assignee: string;
    priority?: 'low' | 'medium' | 'high';
    skus: SKU[];
    state: string;
}

interface Column {
    id: string;
    title: string;
    color: string;
}

interface SearchBarProps {
    tasks: Task[];
    onSearch: (filteredTasks: Task[]) => void;
    columns: Column[];
    setTasks: (tasks: Task[]) => void;
    setView: (view: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
                                                        tasks,
                                                        onSearch,
                                                        setTasks,
                                                        columns,
                                                        setView,
                                                    }) => {
    const [searchText, setSearchText] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showMenu, setShowMenu] = useState(false);







    // Initialize `selectedViews` dynamically based on columns
    const [selectedViews, setSelectedViews] = useState<{ [key: string]: boolean }>(
        {}
    );

    useEffect(() => {
        // Set initial state for selectedViews based on columns
        const initialViews = columns.reduce((acc, column) => {
            acc[column.title] = true; // Set all titles to false initially
            return acc;
        }, {} as { [key: string]: boolean });
        setSelectedViews(initialViews);
    }, [columns]);

    const handleSearch = () => {
        console.log(searchText);
        console.log(tasks);

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

        console.log('Filtered:', filteredTasks);
        setTasks(filteredTasks);
    };

const toggleView = (view: string) => {
    setSelectedViews((prev) => {
        const updatedViews = { ...prev, [view]: !prev[view] };
        const column = columns.find(column => column.title === view);
        if (column) {
            setTimeout(() => setView(column.id), 0); // Delay the state update to avoid setState during render
        }
        return updatedViews;
    });
};

    return (
        <div className="flex items-center gap-2 p-2 rounded-full bg-gray-100 shadow-md relative">
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
            <button
                onClick={handleSearch}
                className="p-2 px-4 rounded-full border-none bg-blue-500 text-white cursor-pointer w-[9em]"
            >
                Search
            </button>
            <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="p-2 px-4 rounded-full border-none bg-slate-500 text-white cursor-pointer w-[9em]"
            >
                Views
            </button>

            {showMenu && (
                <div className="absolute top-[3.5rem] right-0 bg-white shadow-md p-4 rounded-md w-56">
                    <h4 className="font-bold mb-2">Select Views</h4>
                    {Object.keys(selectedViews).map((view) => (
                        <div key={view} className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                id={view}
                                checked={selectedViews[view]}
                                onChange={() => toggleView(view)}
                                className="cursor-pointer"
                            />
                            <label htmlFor={view} className="cursor-pointer">
                                {view}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
``
