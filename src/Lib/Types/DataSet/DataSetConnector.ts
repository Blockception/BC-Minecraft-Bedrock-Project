/** */
export interface DataSetConnector<T> {
  /**
   *
   * @param id
   */
  get(id: string): T | undefined;

  /**
   *
   * @param id
   */
  has(id: string): boolean;
}

/**
 *
 */
export namespace DataSetConnector {
  /**
   *
   * @param call
   * @returns
   */
  export function create<T>(call: (id: string) => T | undefined): DataSetConnector<T> {
    return {
      get: call,
      has: (id: string) => call(id) !== undefined,
    };
  }
}
