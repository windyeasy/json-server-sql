import { expect, it, describe } from 'vitest';
import DataToModel from '../src/transform-model/data-to-model';
import connect from '../src/app/database';

import { SchemaTypesMapDataTypes } from '../src/utils';

describe('dataToModel', () => {
  const sequelize = connect({
    host: 'localhost',
    port: 3306,
    database: 'demos',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
  });
  const dataToModel = new DataToModel(sequelize);
  it('测试dataToModels', () => {
    const data = {
      user: [
        {
          name: 'lcy',
          age: 18,
          telPhone: '18586856279',
        },
      ],
      address: [
        {
          province: '北京',
          city: '北京',
          district: '东城区',
          street: '东直门',
        },
      ],
    };
    const result = dataToModel.dataToModels(data);

    expect(result).toEqual({
      user: {
        name: { type: SchemaTypesMapDataTypes.string, allowNull: true },
        age: { type: SchemaTypesMapDataTypes.integer, allowNull: true },
        telPhone: { type: SchemaTypesMapDataTypes.string, allowNull: true },
      },
      address: {
        province: { type: SchemaTypesMapDataTypes.string, allowNull: true },
        city: { type: SchemaTypesMapDataTypes.string, allowNull: true },
        district: { type: SchemaTypesMapDataTypes.string, allowNull: true },
        street: { type: SchemaTypesMapDataTypes.string, allowNull: true },
      },
    });
  });

  it('测试genterModelTable, 在数据库中生成表', async () => {
    const data = {
      address: [
        {
          province: '北京',
          city: '北京',
          district: '东城区',
          street: '东直门',
        },
      ],
    };
    const result = await dataToModel.genterModelTable(data);
    expect(result).toMatchInlineSnapshot(`
      [
        [Function],
      ]
    `);
  });
});
