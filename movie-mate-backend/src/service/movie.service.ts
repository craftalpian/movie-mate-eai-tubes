import { PrismaClient } from "@prisma/client";
import { id } from "../utils";

class MovieService {
  private prismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async allMovie({ city_id, nim }: { city_id?: any; nim?: string }) {
    let data: any[];
    if (city_id) {
      data = await this.prismaClient
        .$queryRaw`select distinct movie.movie_id movie_id, movie.type type, movie.title title, movie.image_url image_url, movie.synopsis synopsis, movie.cast cast from movie join movie_theater on movie_theater.movie_id = movie.movie_id join schedule on schedule.movie_theater_id = movie_theater.movie_theater_id join theater on theater.theater_id = movie_theater.theater_id where theater.city_id = ${city_id};`;
    } else {
      data = await this.prismaClient.movie.findMany({
        select: {
          title: true,
          image_url: true,
          synopsis: true,
          cast: true,
          movie_id: true,
          type: true,
        },
      });
    }

    const combineWithFavourite = await Promise.all(
      (data || [])?.map(async (movie) => {
        const totalFavourite = await this.prismaClient.favourite.count({
          where: {
            movie_id: movie?.movie_id,
          },
        });
        const favouriteByMe = await this.prismaClient.favourite.count({
          where: {
            movie_id: movie?.movie_id,
            nim,
          },
        });

        return {
          ...movie,
          total_favourite: totalFavourite,
          favourite_by_me: favouriteByMe > 0,
        };
      })
    );

    return combineWithFavourite;
  }

  async deleteFavourite({ movie_id, nim }: { movie_id: string; nim: string }) {
    const favourite = await this.prismaClient.favourite.findFirst({
      where: {
        movie_id,
        nim,
      },
    });

    if (favourite) {
      await this.prismaClient.favourite.delete({
        where: {
          favourite_id: favourite?.favourite_id,
        },
      });

      return true;
    }
    return false;
  }

  async addFavourite({ movie_id, nim }: { movie_id: string; nim: string }) {
    const countFavourite = await this.prismaClient.favourite.count({
      where: {
        movie_id,
        nim,
      },
    });

    if (countFavourite < 1) {
      await this.prismaClient.favourite.create({
        data: {
          favourite_id: id("fav"),
          movie_id,
          nim,
        },
      });

      return true;
    }
    return false;
  }

  async movieById(movie_id: string) {
    return await this.prismaClient.movie.findFirst({
      where: {
        movie_id,
      },
      select: {
        cast: true,
        category: true,
        category_url: true,
        director: true,
        image_url: true,
        title: true,
        synopsis: true,
        minute: true,
        producer: true,
        writer: true,
        movie_id: true,
        production: true,
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
