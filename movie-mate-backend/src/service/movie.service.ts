import { PrismaClient } from "@prisma/client";

class MovieService {
  private prismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async allMovie() {
    const movies = await this.prismaClient.movie.findMany({
      select: {
        title: true,
        image_url: true,
      },
    });

    return movies;
  }
}

export default MovieService;
