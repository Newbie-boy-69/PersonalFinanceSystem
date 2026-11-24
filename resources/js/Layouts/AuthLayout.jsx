export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
            <div className="w-full max-w-[430px]">
                <div className="text-center mb-6">
                    <h1 className="text-slate-800 text-[27px] font-bold mb-2">
                        Personal Finance System
                    </h1>

                    <p className="text-slate-500 text-sm">
                        Manage your money. Track your progress. Reach your goals.
                    </p>
                </div>

                <main className="bg-white p-[35px] rounded-[14px] shadow-lg">
                    {children}
                </main>

                <div className="text-center text-slate-400 text-xs mt-[22px]">
                    Personal Savings and Expense Monitoring System
                </div>
            </div>
        </div>
    );
}
