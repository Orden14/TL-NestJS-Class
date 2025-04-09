import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MovieService {
    private readonly apiUrl: string |undefined;
    private readonly apiKey: string | undefined;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.apiUrl = this.configService.get<string>('API_URL');
        this.apiKey = this.configService.get<string>('API_KEY');
    }

    async getMovies(): Promise<any> {
        const response = await firstValueFrom(
            this.httpService.get(`${this.apiUrl}/movie/popular`, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                },
            }),
        );

        return response.data.results;
    }

    async findMoviesByKeyword(keyword: string): Promise<any> {
        const response = await firstValueFrom(
            this.httpService.get(`${this.apiUrl}/search/movie`, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                },
                params: {
                    query: keyword,
                },
            }),
        );

        return response.data.results;
    }
}
