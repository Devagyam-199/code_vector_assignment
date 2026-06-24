const CATEGORIES = [
  "Electronics",
  "Books",
  "Clothing",
  "Beauty",
  "Sports",
  "Toys",
  "Garden",
  "Automotive",
  "Health",
  "Grocery",
  "Home",
  "Movies",
  "Jewelery",
  "Shoes",
  "Outdoors",
  "Industrial",
  "Kids",
  "Baby",
  "Tools",
  "Computers",
  "Music",
  "Games",
];

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap border-b-2 pb-2 text-sm transition-colors ${
        active
          ? "border-copper font-medium text-paper"
          : "border-transparent text-muted hover:border-line hover:text-paper"
      }`}
    >
      {label}
    </button>
  );
}

export function CategoryFilter({ value, onChange }) {
  return (
    <div className="flex gap-5 overflow-x-auto px-1 pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Tab label="All" active={value === ""} onClick={() => onChange("")} />
      {CATEGORIES.map((cat) => (
        <Tab key={cat} label={cat} active={value === cat} onClick={() => onChange(cat)} />
      ))}
    </div>
  );
}