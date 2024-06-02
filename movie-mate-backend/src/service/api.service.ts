import { PrismaClient } from "@prisma/client";

class ApiService {
  private prismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async apiDetail(client_id: string) {
    return await this.prismaClient.api.findFirst({
      where: {
        client_id,
      },
      select: {
        api_id: true,
        client_id: true,
        client_secret: true,
        owner_name: true,
      },
    });
  }
}

export default ApiService;
