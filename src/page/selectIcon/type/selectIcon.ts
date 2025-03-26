import {
  Chacolate,
  Curry,
  Dance,
  Lemon,
  Mike,
  Smile,
  Spoon,
  Strewberry,
  Sun,
} from "../../common/icon/MemoIcon";

export const memoMap = {
  0: Strewberry,
  1: Chacolate,
  2: Curry,
  3: Mike,
  4: Lemon,
  5: Dance,
  6: Smile,
  7: Spoon,
  8: Sun,
} as const;

export interface MemoItem {
  id: number;
  svg: React.ReactNode;
  x?: number;
  y?: number;
}
