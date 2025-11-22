export default function Tabs({ categories, activeTab, onChange }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(c.id)}
          className={`px-3 sm:px-4 py-2 rounded-full font-semibold whitespace-nowrap text-sm sm:text-base transition ${activeTab === c.id
            ? "bg-gray-800 text-white"
            : "bg-white border border-gray-300 text-gray-700 hover:border-gray-500"
          }`}
        >
          {c.icon} {c.label}
        </button>
      ))}
    </div>
  );
}
