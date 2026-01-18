
import React from 'react';
import { StickyNote, AlertTriangle, CheckCircle, Info } from 'lucide-react';

type CalloutProps = {
    type?: 'note' | 'tip' | 'warning' | 'caution';
    children: React.ReactNode;
};

const icons = {
    note: <Info className="w-5 h-5 text-blue-500" />,
    tip: <StickyNote className="w-5 h-5 text-green-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    caution: <AlertTriangle className="w-5 h-5 text-red-500" />,
};

const styles = {
    note: "bg-blue-50 border-blue-200 text-blue-800",
    tip: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    caution: "bg-red-50 border-red-200 text-red-800",
};

export default function Callout({ type = 'note', children }: CalloutProps) {
    return (
        <div className={`flex items-start gap-3 p-4 my-6 rounded-lg border ${styles[type]}`}>
            <div className="shrink-0 mt-0.5">{icons[type]}</div>
            <div className="prose prose-sm max-w-none text-inherit">
                {children}
            </div>
        </div>
    );
}
