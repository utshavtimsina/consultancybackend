import homeDb from '../db/home.db.json';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { dbPathResolver } from './common.util';
import { InternalServerErrorException } from '@nestjs/common';

export const pushObjToFile = (
  fileDbName: string,
  propertyName: string,
  data: any,
) => {
  let updatedData = [...homeDb[propertyName]];
  const uuid = uuidv4();
  updatedData.push({ ...data, id: uuid });
  const dbData = {
    ...homeDb,
    [propertyName]: [...updatedData],
  };
  fs.writeFileSync(dbPathResolver(fileDbName), JSON.stringify(dbData));
  return { ...data, id: uuid };
};

export const pushObjToNestedFile = (
  fileDbName: string,
  propertyName: string,
  pathName: string,
  data: any,
  db: any,
) => {
  let updatedData = [...db[pathName][propertyName]];
  const uuid = uuidv4();
  updatedData.push({ ...data, id: uuid });
  console.log(updatedData);
  const dbData = {
    ...db,
    [pathName]: {
      ...db[pathName],
      [propertyName]: updatedData,
    },
  };
  fs.writeFileSync(dbPathResolver(fileDbName), JSON.stringify(dbData));
  return { ...data, id: uuid };
};

export const deleteById = (
  fileDbName: string,
  propertyName: string,
  id: string,
) => {
  let updatedData = [...homeDb[propertyName]];
  const index = updatedData.findIndex((record) => record.id === id);
  if (index > -1) {
    updatedData.splice(index, 1);
    const dbData = {
      ...homeDb,
      [propertyName]: [...updatedData],
    };
    fs.writeFileSync(dbPathResolver(fileDbName), JSON.stringify(dbData));
    return { message: 'Record deleted successfully' };
  }
  throw new InternalServerErrorException('No records found');
};

export const deleteByIdInNestedValue = (
  fileDbName: string,
  propertyName: string,
  id: string,
  pathName: string,
  db: any,
) => {
  let updatedData = [...db[pathName][propertyName]];
  const index = updatedData.findIndex((record) => record.id === id);
  if (index > -1) {
    updatedData.splice(index, 1);
    const dbData = {
      ...db,
      [pathName]: {
        ...db[pathName],
        [propertyName]: updatedData,
      },
    };
    fs.writeFileSync(dbPathResolver(fileDbName), JSON.stringify(dbData));
    return { message: 'Record deleted successfully' };
  }
  throw new InternalServerErrorException('No records found');
};

export const updateById = (
  fileDbName: string,
  propertyName: string,
  id: string,
  data: any,
) => {
  let updatedData = [...homeDb[propertyName]];
  const index = updatedData.findIndex((record) => record.id === id);
  if (index > -1) {
    updatedData[index] = {
      ...updatedData[index],
      ...data,
      id: updatedData[index]?.id,
    };
    const dbData = {
      ...homeDb,
      [propertyName]: [...updatedData],
    };
    fs.writeFileSync(dbPathResolver(fileDbName), JSON.stringify(dbData));
    return { message: 'Record updated successfully' };
  }
  throw new InternalServerErrorException('No records found');
};

export const updateByIdInNestedValue = (
  fileDbName: string,
  propertyName: string,
  id: string,
  data: any,
  pathName: string,
  db: any,
) => {
  let updatedData = [...db[pathName][propertyName]];
  const index = updatedData.findIndex((record) => record.id === id);
  if (index > -1) {
    updatedData[index] = { ...data, id: updatedData[index]?.id };
    const dbData = {
      ...db,
      [pathName]: {
        ...db[pathName],
        [propertyName]: updatedData,
      },
    };
    fs.writeFileSync(dbPathResolver(fileDbName), JSON.stringify(dbData));
    return { message: 'Record updated successfully' };
  }
  throw new InternalServerErrorException('No records found');
};
