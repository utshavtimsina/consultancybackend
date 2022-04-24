import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { IPageContent, IPageHeader, IPageIntroduction } from './dto/study.dto';
import { StudyService } from './study.service';

@UseGuards(AuthGuard)
@Controller('study')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  @Post('/create')
  async createNewPage(@Body('name') name: string) {
    return this.studyService.createNewPage(name);
  }

  @Put('/header/:name')
  async updatePageHeader(
    @Body() body: IPageHeader,
    @Param('name') name: string,
  ) {
    return this.studyService.updatePageHeader(body, name);
  }

  @Put('/introduction/:name')
  async updatePageIntroduction(
    @Body() body: IPageIntroduction,
    @Param('name') name: string,
  ) {
    return this.studyService.updatePageIntroduction(body, name);
  }

  @Put('/content/:name')
  async addPageContent(
    @Body() body: IPageContent,
    @Param('name') name: string,
  ) {
    return this.studyService.addPageContent(body, name);
  }

  @Delete('/content/:name/:id')
  async deletePageContent(
    @Param('name') name: string,
    @Param('id') id: string,
  ) {
    return this.studyService.deletePageContent(name, id);
  }

  @Put('/content/:name/:id')
  async updatePageContent(
    @Body() body: IPageContent,
    @Param('name') name: string,
    @Param('id') id: string,
  ) {
    return this.studyService.updatePageContent(body, name, id);
  }
}
