export interface DrfError {
  response: {
    config: object;
    data: {
      non_field_errors?: string[];
      detail?: string;
    };
    headers: object;
    request: XMLHttpRequest;
    status: number;
    statusText: string;
  };
}
