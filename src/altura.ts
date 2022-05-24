import { ApiCall } from './apiCall';
import { AlturaUser } from './types';
import { userFromJson } from './utils';

export class Altura {
  apiCall: ApiCall;

  constructor(apiKey: string, logger?: (arg: string) => void) {
    this.apiCall = new ApiCall({ apiKey }, logger || ((arg: string) => arg));
  }

  /**
   * Takes any query and returns an array of users that match that query
   * @param perPage The number of users to return in one page
   * @param page The offset for returned users. Calculated as (page - 1) * perpage
   * @param sortBy The field to sort the users by (any field in the user schema may be used)
   * @param sortDir Choose to sort in ascending(asc) or descending(desc) order
   * @returns An array of users
   */
  public async getUsers(
    perPage = 24,
    page = 1,
    sortBy = 'name',
    sortDir: 'desc' | 'asc' = 'desc',
  ): Promise<{ users: AlturaUser[]; count: number }> {
    const json = await this.apiCall.get<{ users: AlturaUser[]; count: number }>(
      'user',
      {
        perPage,
        page,
        sortBy,
        sortDir,
      },
    );

    return {
      users: json.users.map((j) => userFromJson(j)),
      count: json.count,
    };
  }
}
