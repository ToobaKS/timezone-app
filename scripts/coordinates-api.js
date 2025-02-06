export class CoordinatesApi {
  constructor() {
    this.baseURL = "https://nominatim.openstreetmap.org";
  }

  async getCoords(city, country) {
    try {
      const request = `${this.baseURL}/search?q=${city},${country}&format=json`;
      const response = await axios.get(request);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
