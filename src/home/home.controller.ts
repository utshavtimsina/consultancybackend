import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  IAchievements,
  IStudyCarousel,
  ITestomonialCarousel,
  IUpdateTitleRequestBody,
} from './dto/home.dto';
import { HomeService } from './home.service';

@UseGuards(AuthGuard)
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Put('change-title')
  async updateTitle(@Body() body: IUpdateTitleRequestBody) {
    return this.homeService.updateTitle(body);
  }

  @Put('change-study-carousel')
  async addStudyCarousel(@Body() body: IStudyCarousel) {
    return this.homeService.addStudyCarousel(body);
  }

  @Delete('change-study-carousel/:id')
  async deleteStudyCarousel(@Param('id') id: string) {
    return this.homeService.deleteStudyCarousel(id);
  }

  @Put('change-study-carousel/:id')
  async updateStudyCarousel(
    @Param('id') id: string,
    @Body() body: IStudyCarousel,
  ) {
    return this.homeService.updateStudyCarousel(id, body);
  }

  @Post('add-testomonial-carousel')
  async addTestomonialCarousel(@Body() body: ITestomonialCarousel) {
    return this.homeService.addTestomonialCarousel(body);
  }

  @Delete('delete-testomonial-carousel/:id')
  async deleteTestomonialCarousel(@Param('id') id: string) {
    return this.homeService.deleteTestomonialCarousel(id);
  }

  @Put('update-testomonial-carousel/:id')
  async updateTestomonialCarousel(
    @Param('id') id: string,
    @Body() body: ITestomonialCarousel,
  ) {
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
