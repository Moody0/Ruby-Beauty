import React from 'react'

const Newsletter = () => {
    return (
        <section className="px-4 md:px-8">
            <div className="max-w-[1200px] mx-auto">
                <div className="rounded-2xl bg-surface-light dark:bg-surface-dark border border-primary/10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16 gap-8">
                        <div className="flex flex-col gap-4 text-center md:text-left max-w-lg">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-text-main-light dark:text-text-main-dark">Join the Glow Club</h3>
                            <p className="text-text-muted-light dark:text-text-muted-dark">Subscribe to our newsletter and get 15% off your first order, plus exclusive access to new launches.</p>
                        </div>
                        <div className="w-full md:w-auto flex-1 max-w-md">
                            <form className="flex flex-col sm:flex-row gap-3">
                                <input
                                    className="flex-1 px-5 py-3.5 rounded-lg border border-primary/20 bg-white dark:bg-background-dark/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-main-light dark:text-text-main-dark placeholder-text-muted-light dark:placeholder-text-muted-dark"
                                    placeholder="Enter your email address"
                                    type="email"
                                />
                                <button className="px-6 py-3.5 bg-text-main-light dark:bg-white text-white dark:text-text-main-light font-bold rounded-lg hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-all whitespace-nowrap" type="button">
                                    Subscribe
                                </button>
                            </form>
                            <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-3 text-center md:text-left">By subscribing you agree to our Terms & Conditions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter