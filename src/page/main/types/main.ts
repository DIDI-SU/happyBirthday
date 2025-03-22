export interface Icon {
  id: number;
  left?: number;
  top?: number;
  bottom?: number;
  right?: number;
}

export interface BackgroundIcons extends Icon {
  rotate?: number;
}

export interface Images extends Icon {
  src: string;
}
