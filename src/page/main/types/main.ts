export interface Icon {
  id: number;
  left?: string | string;
  top?: number | string;
  bottom?: number | string;
  right?: number | string;
}

export interface BackgroundIcons extends Icon {
  rotate?: number;
}

export interface Images extends Icon {
  src: string;
}
