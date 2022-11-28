import fs from 'fs';
import { MemoryStoredFile } from 'nestjs-form-data';
import path from 'path';

export const saveFile = (fileName: string, file: MemoryStoredFile): string => {
  const url = '/files/' + fileName + path.extname(file.originalName).toString();
  fs.writeFileSync(process.cwd() + url, file.buffer);
  return url;
};

export const removeFile = (url: string): string => {
  const p = process.cwd() + url;
  if (existFile(p)) {
    fs.unlinkSync(p);
  }
  return url;
};

export const existFile = (url: string, absolute = true): boolean => {
  if (absolute) {
    return fs.existsSync(url);
  }
  return fs.existsSync(process.cwd() + url);
};
