export type FilterOptions = string[];

export const sortOptions: {
  [index: string]: { column: string; order: string };
} = {
  sortDateAscending: { column: "date_added", order: "asc" },
  sortDateDescending: { column: "date_added", order: "desc" },
  sortTitleAscending: { column: "title", order: "asc" },
  sortTitleDescending: { column: "title", order: "desc" },
};

export const linkStateOptions: {
  [index: string]: { removed: number };
} = {
  active: { removed: 0 },
  removed: { removed: 1 },
};
