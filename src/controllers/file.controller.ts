import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { Public } from 'src/decorators/auth.decorator';
import { existFile } from 'src/utils/file';

@Public()
@Controller('files')
export class FileController {
  @Get('/:filename')
  async download(@Param('filename') filename, @Res() res) {
    const path = process.cwd() + '/files/' + filename;
    if (existFile(path)) {
      const file = createReadStream(process.cwd() + '/files/' + filename);
      return file.pipe(res);
    }
    throw new NotFoundException();
  }
}
