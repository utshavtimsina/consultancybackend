import path, { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const dbPathResolver = (dbJsonFile: string) =>
  path.join(__dirname, '..', '..', 'src', 'db', dbJsonFile);

  export const editFileName = (req, file, callback) => {
    console.log(file);
    
    const fileExtName = extname(file.originalname);
    callback(null, `${uuidv4()}${fileExtName}`);
  };
  export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };