import React from "react";

interface TabButtonProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  label,
  active = false,
  onClick,
}) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium ${
        active ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"
      } rounded-md focus:outline-none`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
