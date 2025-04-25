
import {Console} from 'console';
import FS from 'fs';

const DEB = FS.createWriteStream(process.env.DEBUG_LOG);
const ERR = FS.createWriteStream(process.env.ERR_LOG);
export const Logger = new Console({ stdout: DEB, stderr: ERR });
