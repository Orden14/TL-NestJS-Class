import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @ApiOperation({ summary: 'Fetch movie list or search by keyword' })
    @UseGuards(JwtAuthGuard)
    @Get()
    async getMovies(@Query('keyword') keyword?: string) {
        if (keyword) {
            return this.movieService.findMoviesByKeyword(keyword);
        }
        return this.movieService.getMovies();
    }
}
