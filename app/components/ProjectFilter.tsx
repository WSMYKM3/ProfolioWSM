'use client';

interface ProjectFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterOptions = [
  { id: 'all', label: '#All' },
  { id: 'featured', label: '#Featured' },
  { id: 'xr', label: '#XR' },
  { id: 'ai', label: '#AI+' },
  { id: 'animation', label: '#Animation' },
  { id: 'exploration', label: '#Exploration' },
];

export default function ProjectFilter({ selectedFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="about-filter-section">
      {filterOptions.map((option) => (
        <button
          key={option.id}
          className={`about-filter-button ${selectedFilter === option.id ? 'active' : ''}`}
          onClick={() => onFilterChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
