import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react'

declare interface MessageProps {
    value: string,
    color?: 'blue' | 'red' | 'green' | 'yellow',
    onClick: () => void
}

const Message = ({ value, color = "green", onClick }: MessageProps) => {
    const colorClasses = {
    red: "text-red-800 border-red-300 bg-red-50",
    green: "text-green-800 border-green-300 bg-green-50",
    blue: "text-blue-800 border-blue-300 bg-blue-50",
    yellow: "text-yellow-800 border-yellow-300 bg-yellow-50"
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
            >
                <div className={`flex items-center justify-between p-4 text-sm rounded-lg shadow-md max-w-md w-full ${colorClasses[color]}`}>
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-5 h-5 shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span>{value}</span>
                    </div>
                    <button onClick={onClick}>
                        <X size={18} />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Message