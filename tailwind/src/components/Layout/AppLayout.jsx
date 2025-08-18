import { useTodoFilters } from '../../hooks/useTodoFilters';

export default function AppLayout({ children }) {
    const { stats } = useTodoFilters();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Todo App - Tailwind CSS
                    </h1>
                    <p className="text-gray-600">
                        Manage your tasks with style and efficiency
                    </p>

                    {/* Stats Bar */}
                    <div className="mt-6 flex justify-center space-x-6">
                        <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                            <span className="text-sm text-gray-500">Total</span>
                            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                        </div>
                        <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                            <span className="text-sm text-gray-500">Active</span>
                            <div className="text-2xl font-bold text-orange-600">{stats.active}</div>
                        </div>
                        <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                            <span className="text-sm text-gray-500">Completed</span>
                            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                        </div>
                        <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                            <span className="text-sm text-gray-500">Progress</span>
                            <div className="text-2xl font-bold text-purple-600">{stats.completionRate}%</div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="bg-white rounded-xl shadow-lg p-6">
                    {children}
                </main>

                {/* Footer */}
                <footer className="mt-8 text-center text-gray-500 text-sm">
                    Built with React, Vite, and Tailwind CSS
                </footer>
            </div>
        </div>
    );
}
