export interface FetchConfig {
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  params?: object,
  config?: object
}