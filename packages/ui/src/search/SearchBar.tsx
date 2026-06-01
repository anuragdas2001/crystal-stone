"use client";

import { useState } from "react";

const propertyTypes = ["Signature Villa", "Penthouse", "Prime Commercial", "Residential Land", "Estate"];
const locations = ["Global Portfolio", "London, UK", "Dubai, UAE", "New York, USA", "Amalfi Coast", "Aspen"];
const priceRanges = ["$1M – $10M", "$10M – $25M", "$25M – $50M", "$50M+"];

export default function SearchBar() {
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  return (
    <div className="glass-panel w-full max-w-4xl p-2 rounded-lg flex flex-col md:flex-row shadow-2xl">
      <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-outline-variant/30">
        <SearchField
          label="Property Type"
          value={propertyType}
          onChange={setPropertyType}
          placeholder="All Types"
          options={propertyTypes}
        />
        <SearchField
          label="Location"
          value={location}
          onChange={setLocation}
          placeholder="Any Location"
          options={locations}
        />
        <SearchField
          label="Price Range"
          value={priceRange}
          onChange={setPriceRange}
          placeholder="Any Price"
          options={priceRanges}
        />
      </div>
      <button
        type="button"
        className="bg-primary text-on-primary font-label-md uppercase tracking-widest px-10 py-4 md:py-0 rounded-b-lg md:rounded-r-lg md:rounded-bl-none hover:bg-primary-fixed transition-colors mt-2 md:mt-0 md:ml-2 luxury-button shrink-0"
      >
        Search
      </button>
    </div>
  );
}

function SearchField({
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <div className="flex-1 px-6 py-4 relative group">
      <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-1">
        {label}
      </label>
      <div className="flex justify-between items-center gap-2">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-none text-on-surface font-body-md text-body-md focus:ring-0 p-0 cursor-pointer appearance-none"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-surface-container-high text-on-surface">
              {o}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined text-primary text-[20px] shrink-0 pointer-events-none">
          expand_more
        </span>
      </div>
    </div>
  );
}
