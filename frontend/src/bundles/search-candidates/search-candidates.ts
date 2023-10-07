import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { SearchCandidatesApi } from './search-candidates-api.js';

const searchCandidatesApi = new SearchCandidatesApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { searchCandidatesApi };
