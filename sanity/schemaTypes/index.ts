import { type SchemaTypeDefinition } from "sanity";
import { productType } from "./productType";
import { categoryType } from "./categoryType";
import { orderType } from "./orderType";
import { blockContentType } from "./blockContentType";
import { salesType } from "./salesType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, orderType, blockContentType, salesType],
};
