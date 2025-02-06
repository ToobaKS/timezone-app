export class TimeZoneApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "http://api.timezonedb.com/v2.1/get-time-zone";
  }

  async getTime(lat, lng) {
    try {
      const request = `${this.baseURL}?key=${this.apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
      const response = await axios.get(request);      
      return response.data;
    } catch (error) {
        console.error(error);
    }
  }
}
