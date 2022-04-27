import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { editFileName, imageFileFilter } from 'src/util/common.util';
import {
  IAchievements,
  IStudyCarousel,
  ITestomonialCarousel,
  IUpdateTitleRequestBody,
} from './dto/home.dto';
import { HomeService } from './home.service';
import { diskStorage } from 'multer';

@UseGuards(AuthGuard)
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Put('change-title')
  async updateTitle(@Body() body: IUpdateTitleRequestBody) {
    return this.homeService.updateTitle(body);
  }

  @Put('change-study-carousel')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: editFileName,
        destination: './upload',
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async addStudyCarousel(@Body() body: IStudyCarousel,  @UploadedFile() file: any) {
    return this.homeService.addStudyCarousel({...body, img: file?.path});
  }

  @Delete('change-study-carousel/:id')
  async deleteStudyCarousel(@Param('id') id: string) {
    return this.homeService.deleteStudyCarousel(id);
  }

  @Put('change-study-carousel/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: editFileName,
        destination: './upload',
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateStudyCarousel(
    @Param('id') id: string,
    @Body() body: IStudyCarousel,
    @UploadedFile() file: any,
  ) {
    body = file ? { ...body, img: file.path } : body;
    return this.homeService.updateStudyCarousel(id, body);
  }

  @Post('add-testomonial-carousel')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: editFileName,
        destination: './upload',
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async addTestomonialCarousel(
    @Body() body: ITestomonialCarousel,
    @UploadedFile() file: any,
  ) {
    return this.homeService.addTestomonialCarousel({
      ...body,
      img: file?.path,
    });
  }

  @Delete('delete-testomonial-carousel/:id')
  async deleteTestomonialCarousel(@Param('id') id: string) {
    return this.homeService.deleteTestomonialCarousel(id);
  }

  @Put('update-testomonial-carousel/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: editFileName,
        destination: './upload',
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateTestomonialCarousel(
    @Param('id') id: string,
    @Body() body: ITestomonialCarousel,
    @UploadedFile() file: any,
  ) {
    body = file ? { ...body, img: file.path } : body;
    return this.homeService.updateTestomonialCarousel(id, body);
  }

  @Put('update-achievements/:id')
  async updateAchiements(@Param('id') id: string, @Body() body: IAchievements) {
    return this.homeService.updateAchiements(id, body);
  }

  @Get()
  async getHomeContent() {
    return this.homeService.getHomeContent();
  }
}
