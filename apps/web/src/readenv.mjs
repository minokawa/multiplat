import dotenv from 'dotenv';
import path from 'path';
const p =  path.resolve(process.cwd(), '.env');
dotenv.config({ path:  p});

if (dotenv.error) {
  throw dotenv.error;
}



