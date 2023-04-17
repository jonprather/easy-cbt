import React from "react";
import type { TSortBy } from "src/server/api/routers/CBTForm";

export type TSortOptionValues = {
  property: TSortBy;
  direction: "asc" | "desc";
};

type Tnames = {
  name: string;
  value: TSortBy;
};
const sortPropertyOptions = (
  arr: Tnames[] = [
    { name: "Name", value: "name" },
    { name: "Created", value: "createdAt" },
    { name: "Updated", value: "updatedAt" },
  ]
) => {
  return arr.map(({ name, value }) => {
    if (!name) return null;
    return (
      <option key={name} value={value} className="capitalize">
        {name}
      </option>
    );
  });
};

interface TSortingProps {
  emitSortingData: (sortingOption: TSortOptionValues) => void;
  sortingOptions: {
    direction: "asc" | "desc";
    property: "id" | "createdAt" | "updatedAt" | "name";
  };
}

const SortingComponent: React.FC<TSortingProps> = ({
  emitSortingData,
  sortingOptions,
}) => {
  return (
    <div className="mb-10 flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property</span>
          </label>
          <select
            className="select-bordered select"
            value={sortingOptions?.property}
            onChange={(e) =>
              emitSortingData({
                ...sortingOptions,
                property: e.target.value as TSortBy,
              })
            }
          >
            {sortPropertyOptions()}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Direction</span>
          </label>
          <select
            className="select-bordered select"
            value={sortingOptions?.direction}
            onChange={(e) =>
              emitSortingData({
                ...sortingOptions,
                direction: e.target.value as "asc" | "desc",
              })
            }
          >
            <option value="asc">Oldest</option>
            <option value="desc">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortingComponent;
