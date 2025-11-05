export type ComponentID = string;
export type FieldID = string;
export type FieldType =
  | "text"
  | "image"
  | "video"
  | "number"
  | "url"
  | "boolean"
  | "rich-text";
export type Field<T = FieldType> = { id: FieldID; type: T; label: string };
export type FieldValue<T = string> = { [id: FieldID]: T };
export type PickIdValuesFromType<Fields extends Field[]> = {
  [P in Fields[number]as P["id"]]: P["type"] extends "boolean"
  ? boolean
  : P["type"] extends "number"
  ? number
  : string;
} & {
  // For each url field, add an optional `${id}_target` boolean flag
  [P in Extract<Fields[number], { type: "url" }> as `${P["id"]}_target`]?:
  | "_blank" | "_self";
};

export type PageData<T extends Field[] = Field[]> = {
  [id: ComponentID]: PickIdValuesFromType<T>;
} & {
  /**
   * Special key reserved for page-level SEO metadata captured by the CMS
   */
  __seo?: Record<string, string>;
};

export type ContextType<Fields extends Field[] = Field[]> = {
  editMode: boolean;
  screenSize: "desktop" | "tablet" | "phone" | "default";
  pageData: PageData<Fields>;
  editing: {
    inputs: Fields;
    id: string | null;
  };
  setEditing: (editing: { id: string | null; inputs: Fields }) => void;
  setPageData: (data: PageData) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  disabledItems: string[];
  setDisabledItems: (items: string[]) => void;
  assetSource?: AssetSource;
  pages: { id: string; path: string; title: string }[];
  onPageSearch?: (search: string) => Promise<{ path: string; title: string }[]>;
};

export type AssetDescriptor = {
  id: string;
  url: string;
  name?: string;
  thumbUrl?: string;
};

export type AssetSource = {
  listAssets: () => Promise<AssetDescriptor[]>;
  uploadAsset?: (file: File) => Promise<AssetDescriptor>;
};

export type User = { email?: string };
