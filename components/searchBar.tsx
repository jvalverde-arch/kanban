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


const cases = [
    { title: 'Alojamiento', value: 'title' },
    { title: 'Alimentación', value: 'assignee' },
    { title: 'Sitios de Visita', value: 'provider' },
    { title: 'Trenes', value: 'state' },
    { title: 'Buses', value: 'priority' },
    { title: 'Otros', value: 'priority' },
];

// Initialize `selectedViews` dynamically based on cases
const [selectedViews, setSelectedViews] = useState<{ [key: string]: boolean }>({});

useEffect(() => {
    // Set initial state for selectedViews based on cases
    const initialViews = cases.reduce((acc, item) => {
        acc[item.title] = false; // Set all titles to true initially

        if (item.title === 'Alojamiento') {
            acc[item.title] = true; // Set 'Alojamiento
        }

        return acc;
    }, {} as { [key: string]: boolean });
    setSelectedViews(initialViews);
}, []);

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
    setSelectedViews((prevViews) => {
        const newViews = Object.keys(prevViews).reduce((acc, key) => {
            acc[key] = key === view ? !prevViews[key] : false;
            return acc;
        }, {} as { [key: string]: boolean });
        return newViews;
    });
};

    return (
        <div>
<button
    onClick={() => setShowMenu((prev) => !prev)}
    className="p-2 px-4 rounded-full border-none bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer w-full shadow-lg transform transition-transform hover:scale-102">
                Casos
            </button>
            <div className="h-4"></div>
            <div className="flex items-center gap-2 p-2 rounded-full bg-gray-100 shadow-md relative">
                <input
                    type="text"
                    placeholder="Search Bookings..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="p-2 rounded-full border border-gray-300 outline-none w-full"
                    onInput={handleSearch}
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


                {showMenu && (
                    <div className="absolute top-[0rem] left-0 bg-white shadow-md p-4 rounded-md w-full">
                        <h4 className="font-bold mb-2">Selecciona un caso a trabajar</h4>
                        <div className="flex-row flex">
                        {Object.keys(selectedViews).map((view) => (
                            <div key={view} className="flex flex-row items-center gap-2 mb-2">
                                <div className="m-2"></div>
                                <input
                                    type="checkbox"
                                    id={view}
                                    checked={selectedViews[view]}
                                    onChange={() => toggleView(view)}
                                    className="cursor-pointer"
                                />
                                <label htmlFor={view} className="cursor-pointer">
                                    <p className="text-lg"> {view}</p>
                                </label>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
``
