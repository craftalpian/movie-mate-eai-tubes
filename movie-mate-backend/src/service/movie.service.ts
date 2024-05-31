import { PrismaClient } from "@prisma/client";

class MovieService {
  private prismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async allMovie() {
    return await this.prismaClient.movie.findMany({
      select: {
        title: true,
        image_url: true,
        synopsis: true,
        cast: true,
      },
    });
  }

  async theaterByCity(city_id: string) {
    const theaters = await this.prismaClient.theater.findMany({
      select: {
        theater_id: true,
        name: true,
        address: true,
      },
      where: {
        city_id,
      },
    });

    console.log({ theaters });

    const theaterIds = theaters?.map(({ theater_id }) => theater_id);

    console.log({ theaterIds });

    const movieTheater = await this.prismaClient.movie_theater.findMany({
      select: {
        movie_id: true,
        movie_theater_id: true,
        weekday_price: true,
        weekend_price: true,
        theater_id: true,
      },
      where: {
        theater_id: {
          in: theaterIds,
        },
      },
    });

    console.log({ movieTheater });

    let movieIds = movieTheater?.map(({ movie_id }) => movie_id);
    movieIds = [...new Set(movieIds)];

    const dateToSearch = new Date("2023-05-30"); // Ganti dengan tanggal yang Anda inginkan

    const startOfDay = new Date(dateToSearch);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(dateToSearch);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const schedule = await this.prismaClient.schedule.findMany({
      select: {
        movie_theater_id: true,
        schedule_id: true,
        start_timestamp: true,
      },
      where: {
        movie_theater_id: {
          in: movieTheater?.map(({ movie_theater_id }) => movie_theater_id),
        },
        // start_timestamp: {
        //   gte: startOfDay,
        //   lte: endOfDay,
        // },
      },
    });

    console.log({ schedule });

    // await this.prismaClient.
  }
}

export default MovieService;
