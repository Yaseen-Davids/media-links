export type FilterOptions = string[];

export const sortOptions: {
  [index: string]: { column: string; order: string };
} = {
  sortDateAscending: { column: "date_added", order: "asc" },
  sortDateDescending: { column: "date_added", order: "desc" },
  sortTitleAscending: { column: "title", order: "asc" },
  sortTitleDescending: { column: "title", order: "desc" },
};

export const downloadStateOptions: {
  [index: string]: { downloaded: number };
} = {
  active: { downloaded: 0 },
  removed: { downloaded: 1 },
};
