import { Injectable, InternalServerErrorException } from '@nestjs/common';
import studyInDb from '../db/studyIn.db.json';
import {
  initialPageData,
  IPageContent,
  IPageHeader,
  IPageIntroduction,
} from './dto/study.dto';
import fs from 'fs';
import { dbPathResolver } from 'src/util/common.util';
import {
  deleteByIdInNestedValue,
  pushObjToNestedFile,
  updateByIdInNestedValue,
} from 'src/util/file.util';

@Injectable()
export class StudyService {
  async createNewPage(name: string) {
    try {
      const pageData = { ...studyInDb, ...initialPageData(name) };
      const pageNames = Object.keys(studyInDb);
      if (pageNames.includes(name)) {
        throw new InternalServerErrorException('Page already exists');
      }
      fs.writeFileSync(
        dbPathResolver('studyIn.db.json'),
        JSON.stringify(pageData),
      );
      return { message: 'Page has been created successfully' };
    } catch (error) {
      throw error;
    }
  }

  async updatePageHeader(data: IPageHeader, pageName: string) {
    try {
      if (studyInDb[pageName]) {
        const pageData = {
          ...studyInDb,
          [pageName]: {
            ...studyInDb[pageName],
            header: {
              ...data,
            },
          },
        };
        fs.writeFileSync(
          dbPathResolver('studyIn.db.json'),
          JSON.stringify(pageData),
        );
        return { message: 'Header has been updated successfully' };
      }
      throw new InternalServerErrorException("Page doesn't exists");
    } catch (error) {
      throw error;
    }
  }

  async updatePageIntroduction(data: IPageIntroduction, pageName: string) {
    try {
      if (studyInDb[pageName]) {
        const pageData = {
          ...studyInDb,
          [pageName]: {
            ...studyInDb[pageName],
            introduction: {
              ...data,
            },
          },
        };
        fs.writeFileSync(
          dbPathResolver('studyIn.db.json'),
          JSON.stringify(pageData),
        );
        return { message: 'Header has been updated successfully' };
      }
      throw new InternalServerErrorException("Page doesn't exists");
    } catch (error) {
      throw error;
    }
  }

  async addPageContent(data: IPageContent, pageName: string) {
    try {
      if (studyInDb[pageName]) {
        const response = pushObjToNestedFile(
          'studyIn.db.json',
          'content',
          pageName,
          data,
          studyInDb,
        );
        return { ...response };
      }
      throw new InternalServerErrorException("Page doesn't exists");
    } catch (error) {
      throw error;
    }
  }
  async deletePageContent(pageName: string, id: string) {
    try {
      if (studyInDb[pageName]) {
        const response = deleteByIdInNestedValue(
          'studyIn.db.json',
          'content',
          id,
          pageName,
          studyInDb,
        );
        return { ...response };
      }
      throw new InternalServerErrorException("Page doesn't exists");
    } catch (error) {
      throw error;
    }
  }

  async updatePageContent(data: IPageContent, pageName: string, id: string) {
    try {
      if (studyInDb[pageName]) {
        const response = updateByIdInNestedValue(
          'studyIn.db.json',
          'content',
          id,
          data,
          pageName,
          studyInDb,
        );
        return { ...response };
      }
      throw new InternalServerErrorException("Page doesn't exists");
    } catch (error) {
      throw error;
    }
  }
}
