"use client"

import React from "react";

interface UrunInputProps {
    label: string;
    selected?: boolean;
    onClick: (value: string) => void
    icon?: string;
}

const UrunInput: React.FC<UrunInputProps> = ({ label, selected, onClick, icon }) => {
    return (
        <div className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${selected ? "border-black" : "border-neutral-200"}`} onClick={() => (onClick(label))}>
            <div className="font-semibold">
                {label}
            </div>
        </div>
    )
}

export default UrunInput