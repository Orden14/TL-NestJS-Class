import { Controller, Get, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @ApiOperation({ summary: 'Fetch movie list' })
    @UseGuards(JwtAuthGuard)
    @Get()
    async getMovies() {
        return this.movieService.getMovies();
    }
}
