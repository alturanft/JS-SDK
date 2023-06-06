import 'isomorphic-unfetch';
import * as QueryString from 'query-string';

export interface IApiCallConfig {
  apiKey?: string;
}

export class ApiCall {
  /**
   * Base URL for the API
   */
  private apiBaseUrl = 'https://app.alturanft.com/api/';
  /**
   * ApiKey generated from Developer portal
   */
  apiKey: string;
  /**
   * Logger function to use when debugging
   */
  private logger: (arg: string) => void;

  constructor(config: IApiCallConfig, logger?: (arg: string) => void) {
    this.apiKey = config.apiKey || '';

    this.logger = logger || ((arg: string) => arg);
  }

  /**
   * Get JSON data from API
   * @param apiPath Path to URL endpoint under API
   * @param query Data to send. Will be stringified using QueryString
   */
  public async get<T>(apiPath: string, query: object = {}): Promise<T> {
    let url = `${apiPath}`;
    if (Object.keys(query).length > 0) {
      const qs = QueryString.stringify(query);
      url = `${apiPath}?${qs}`;
    }

    const response = await this._fetch(url);
    return response.json();
  }
  /**
   * POST JSON data to API.
   * @param apiPath Path to URL endpoint under API
   * @param query Data for url query. Will be stringified using QueryString
   * @param body Data to send. Will be JSON.stringified
   * @param opts RequestInit opts, similar to Fetch API.
   */
  public async post<T>(apiPath: string, query: object = {}, body?: object, opts: RequestInit = {}): Promise<T> {
    let url = apiPath;
    if (Object.keys(query).length > 0) {
      const qs = QueryString.stringify(query);
      url = `${apiPath}?${qs}`;
    }

    const response = await this._fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      ...opts,
    });
    return response.json();
  }
  /**
   * Get from an API Endpoint
   * @param apiPah Path to URL endpoint under API
   * @param opts RequestInit options, similar to Fetch API
   */
  private async _fetch(apiPah: string, opts: RequestInit = {}) {
    const apiBase = this.apiBaseUrl;
    const apiKey = this.apiKey;
    const finalUrl = apiBase + apiPah;

    return fetch(finalUrl, opts).then(async (res) => {
      return this._handleApiResponse(res);
    });
  }

  private async _handleApiResponse(response: Response) {
    if (response.ok) {
      return response;
    }

    let result;
    let errorMessage;
    try {
      result = await response.text();
      result = JSON.parse(result);
    } catch {
      // Result will be undefined
    }

    this.logger(`Got error ${response.status}: ${JSON.stringify(result)}`);

    switch (response.status) {
      case 400:
        errorMessage =
          result && result.errors ? result.errors.join(', ') : `Invalid request: ${JSON.stringify(result)}`;
        break;

      case 401:
      case 403:
        errorMessage = `Unauthorized. ${JSON.stringify(result)}'`;
        break;

      case 404:
        errorMessage = `Not found. '${JSON.stringify(result)}'`;
        break;

      case 500:
        errorMessage = `Internal server error.'${JSON.stringify(result)}'`;
        break;

      case 503:
        errorMessage = `Service unavailable. '${JSON.stringify(result)}'`;
        break;

      default:
        errorMessage = `Message: ${JSON.stringify(result)}`;
        break;
    }

    throw new Error(`API Error ${response.status}: ${errorMessage}`);
  }
}
