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
        let favouriteByMe = 0;
        if (nim) {
          favouriteByMe = await this.prismaClient.favourite.count({
            where: {
              movie_id: movie?.movie_id,
              nim,
            },
          });
        }

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

  async movieById({ movie_id, nim }: { movie_id: string; nim?: string }) {
    const movie = await this.prismaClient.movie.findFirst({
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

    const totalFavourite = await this.prismaClient.favourite.count({
      where: {
        movie_id,
      },
    });
    let favouriteByMe = 0;
    if (nim) {
      favouriteByMe = await this.prismaClient.favourite.count({
        where: {
          movie_id: movie?.movie_id,
          nim,
        },
      });
    }

    return {
      ...movie,
      total_favourite: totalFavourite,
      favourite_by_me: favouriteByMe > 0,
    };
  }
}

export default MovieService;
