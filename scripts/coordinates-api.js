export class CoordinatesApi {
  constructor() {
    this.baseURL = "https://nominatim.openstreetmap.org";
  }

  async getCoords(city, country) {
    try {
      const request = `${this.baseURL}/search?q=${city},${country}&format=json`;
      const response = await axios.get(request);
      if (response.data.length == 0) {
        alert("Invalid Input, please try again");
        return "error";
      }
      return response.data;
    } catch (error) {
      alert("Invalid Input, please try again");
      console.error(error);
    }
  }
}
