/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DataTypes, ModelAttributes } from 'sequelize';
import { Item } from '../service/type';
import toJsonSchema from 'to-json-schema';
export const SchemaTypesMapDataTypes = {
  string: DataTypes.STRING,
  integer: DataTypes.INTEGER,
  boolean: DataTypes.BOOLEAN,
  object: DataTypes.JSON,
  array: DataTypes.ARRAY,
};
export function jsonToModel(data: Item) {
  const schema = toJsonSchema(data) as any;

  const properties = schema.properties as Item;

  const entries = Object.entries(properties);
  const model: ModelAttributes = {};

  for (const [key, value] of entries) {
    const { type } = value as { type: keyof typeof SchemaTypesMapDataTypes };
    if (type) {
      model[key] = {
        type: SchemaTypesMapDataTypes[type],
        allowNull: true,
      };
    }
  }
  return model;
}
