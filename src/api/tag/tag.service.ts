import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  async createTag(tagName: string) {
    return Promise.resolve(undefined);
  }

  async updateTag(tagId: number, tagName: string) {
    return Promise.resolve(undefined);
  }

  deleteTag(tagName: number) {
    return Promise.resolve(undefined);
  }
}
