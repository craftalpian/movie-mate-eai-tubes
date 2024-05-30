import { PrismaClient } from "@prisma/client";

class CityService {
  private prismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async allCity() {
    const cities = await this.prismaClient.city.findMany({
      select: {
        city: true,
        city_id: true,
        name: true,
      },
    });

    return cities;
  }
}

export default CityService;
