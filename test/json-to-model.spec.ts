import {
  SchemaTypesMapDataTypes,
  jsonToModel,
} from '../src/utils/json-to-model';
import { expect, it, describe } from 'vitest';
describe('jsonToModel', () => {
  it('传入data对象返回模型对象', () => {
    const data = {
      name: 'lcy',
      age: 18,
      telPhone: '18586856279',
    };
    const result = jsonToModel(data);
    expect(result).toEqual({
      name: {
        type: SchemaTypesMapDataTypes.string,
        allowNull: true,
      },
      age: {
        type: SchemaTypesMapDataTypes.integer,
        allowNull: true,
      },
      telPhone: {
        type: SchemaTypesMapDataTypes.string,
        allowNull: true,
      },
    });
  });
});
