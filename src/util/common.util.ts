import path from 'path';

export const dbPathResolver = (dbJsonFile: string) =>
  path.join(__dirname, '..', '..', 'src', 'db', dbJsonFile);
