import {
    ApiPath,
    ContentType,
    HiringInfoApiPath,
} from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import {
    type HiringInfoCreateRequestDto,
    type HiringInfoFindAllRequestDto,
    type HiringInfoFindRequestDto,
    type HiringInfoResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class HiringInfoApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.HIRING_INFO, baseUrl, http, storage });
    }

    public async getAllHiringInfo(): Promise<HiringInfoFindAllRequestDto> {
        const response = await this.load(
            this.getFullEndpoint(HiringInfoApiPath.ALL, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<HiringInfoFindAllRequestDto>();
    }

    public async getHiringInfo(
        payload: HiringInfoFindRequestDto,
    ): Promise<boolean> {
        const queryParameters = Object.keys(payload).map((key) => `?${key}`);

        const response = await this.load(
            this.getFullEndpoint(
                HiringInfoApiPath.ROOT,
                ...queryParameters,
                payload,
            ),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<boolean>();
    }

    public async createHiringInfo(
        payload: HiringInfoCreateRequestDto,
    ): Promise<HiringInfoResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(HiringInfoApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return response.json<HiringInfoResponseDto>();
    }
}

export { HiringInfoApi };
