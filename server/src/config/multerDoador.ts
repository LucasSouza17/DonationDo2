import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default{
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads', 'Doador'),
    filename(request, file, callback){
      const hash = crypto.randomBytes(6).toString('hex');
      
      let filename = `${hash}-${file.originalname}`;
      
      callback(null, filename);
    }
  }),
}