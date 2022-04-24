import { Body, Injectable } from '@nestjs/common';
import fs from 'fs';
import { dbPathResolver } from 'src/util/common.util';
import { deleteById, pushObjToFile, updateById } from 'src/util/file.util';
import homeDb from '../db/home.db.json';
import {
  IAchievements,
  IStudyCarousel,
  ITestomonialCarousel,
  IUpdateTitleRequestBody,
} from './dto/home.dto';

@Injectable()
export class HomeService {
  async updateTitle(data: IUpdateTitleRequestBody) {
    try {
      const dbData = {
        ...homeDb,
        title: {
          ...data,
        },
      };
      fs.writeFileSync(dbPathResolver('home.db.json'), JSON.stringify(dbData));
      return { ...data };
    } catch (error) {
      throw error;
    }
  }

  async addStudyCarousel(data: IStudyCarousel) {
    try {
      const response = pushObjToFile(
        'home.db.json',
        'studyAbroadSummary',
        data,
      );
      return { ...response };
    } catch (error) {
      throw error;
    }
  }

  async deleteStudyCarousel(id: string) {
    try {
      const response = deleteById('home.db.json', 'studyAbroadSummary', id);
      return { ...response };
    } catch (error) {
      throw error;
    }
  }

  async updateStudyCarousel(id: string, data: IStudyCarousel) {
    try {
      const response = updateById(
        'home.db.json',
        'studyAbroadSummary',
        id,
        data,
      );
      return { ...response };
    } catch (error) {
      throw error;
    }
  }

  async addTestomonialCarousel(data: ITestomonialCarousel) {
    try {
      const response = pushObjToFile('home.db.json', 'testomonials', data);
      return { ...response };
    } catch (error) {
      return error;
    }
  }

  async deleteTestomonialCarousel(id: string) {
    try {
      const response = deleteById('home.db.json', 'testomonials', id);
      return { ...response };
    } catch (error) {
      return error;
    }
  }

  async updateTestomonialCarousel(id: string, data: ITestomonialCarousel) {
    try {
      const response = updateById('home.db.json', 'testomonials', id, data);
      return { ...response };
    } catch (error) {
      return error;
    }
  }

  async updateAchiements(id: string, body: IAchievements) {
    try {
      const response = updateById('home.db.json', 'achievements', id, body);
      return { ...response };
    } catch (error) {
      return error;
    }
  }

  async getHomeContent() {
    try {
      return { ...homeDb };
    } catch (error) {
      return error;
    }
  }
}
