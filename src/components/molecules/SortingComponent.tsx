import React from "react";
import type { TSortBy } from "src/server/api/routers/CBTForm";

export type SortOption = {
  property: TSortBy;
  direction: "asc" | "desc";
};

const sortPropertyOptions = (
  arr: TSortBy[] = ["name", "id", "createdAt", "updatedAt"]
) => {
  return arr.map((name) => {
    if (!name) return null;
    return (
      <option key={name} value={name} className="capitalize">
        {`${name[0]?.toLocaleUpperCase() ?? ""}${name.slice(1)}`}
      </option>
    );
  });
};

interface TSortingProps {
  emitSortingData: (sortingOption: SortOption) => void;
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
            className="input-bordered input"
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
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortingComponent;
