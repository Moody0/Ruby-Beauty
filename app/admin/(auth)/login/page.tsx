"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid username or password");
            } else {
                router.push("/admin/dashboard");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <div className="w-full max-w-[440px] z-10">
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-[#e6dbdf] dark:border-white/10 p-10 md:p-12">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-10">
                        <h1 className="text-text-main dark:text-white text-2xl font-extrabold tracking-tight">
                            Admin Dashboard
                        </h1>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* Username Field */}
                        <div className="space-y-2">
                            <label
                                className="text-xs font-bold uppercase tracking-widest text-text-sub dark:text-white/60 ml-1"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-text-sub/60 dark:text-white/40">
                                    <span className="material-symbols-outlined text-[20px]">
                                        person
                                    </span>
                                </span>
                                <input
                                    className="w-full pl-11 pr-4 py-3.5 bg-background-light dark:bg-background-dark border border-[#e6dbdf] dark:border-white/10 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary text-text-main dark:text-white placeholder:text-text-sub/40 dark:placeholder:text-white/30 transition-all outline-none"
                                    id="username"
                                    placeholder="admin"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label
                                    className="text-xs font-bold uppercase tracking-widest text-text-sub dark:text-white/60"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-text-sub/60 dark:text-white/40">
                                    <span className="material-symbols-outlined text-[20px]">
                                        lock
                                    </span>
                                </span>
                                <input
                                    className="w-full pl-11 pr-4 py-3.5 bg-background-light dark:bg-background-dark border border-[#e6dbdf] dark:border-white/10 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary text-text-main dark:text-white placeholder:text-text-sub/40 dark:placeholder:text-white/30 transition-all outline-none"
                                    id="password"
                                    placeholder="••••••••"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    className="w-4 h-4 rounded border-[#e6dbdf] dark:border-white/20 text-primary focus:ring-primary/20 transition-all"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="text-sm text-text-sub dark:text-white/60 group-hover:text-text-main dark:group-hover:text-white transition-colors">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In to Dashboard"}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-10 text-center">
                        <p className="text-xs text-text-sub/60 dark:text-white/40 font-medium tracking-wide">
                            © 2026 RUBY BEAUTY ENTERPRISE
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
