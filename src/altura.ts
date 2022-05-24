import { SortDirection } from './types';

export class Altura {
  private apiKey: string | undefined;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Check if server is running.
   * @returns Altura apiKey.
   */
  public ping(): string {
    return `${this.apiKey}`;
  }

  /**
   * Takes any query and returns an array of users that match that query
   * @param perPage The number of users to return in one page
   * @param page The offset for returned users. Calculated as (page - 1) * perpage
   * @param sortBy The field to sort the users by (any field in the user schema may be used)
   * @param sortDir Choose to sort in ascending(asc) or descending(desc) order
   * @returns An array of users
   */
  public getUsers(
    perPage: number = 24,
    page: number = 1,
    sortBy: String = 'name',
    sortDir: SortDirection = SortDirection.desc,
  ): string {
    return 'getUsers';
  }
}
