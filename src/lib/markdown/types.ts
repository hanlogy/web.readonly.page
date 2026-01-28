export type TocDepth = 1 | 2 | 3 | 4 | 5 | 6;

export interface TocItem {
  id: string;
  text: string;
  depth: TocDepth;
}

export interface SidebarItem {
  text: string;
  link?: string;
  children: SidebarItem[];
}
