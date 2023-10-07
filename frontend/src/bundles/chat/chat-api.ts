import {
    ApiPath,
    ChatMessagesApiPath,
    ContentType,
} from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import {
    type ChatMessagesCreateRequestDto,
    type ChatMessagesPatchDto,
    type ChatResponseDto,
    type MessageResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class ChatApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.CHAT_MESSAGES, baseUrl, http, storage });
    }

    public async getAllMessages(): Promise<{
        items: MessageResponseDto[];
    }> {
        const response = await this.load(
            this.getFullEndpoint(ChatMessagesApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<{
            items: MessageResponseDto[];
        }>();
    }

    public async getAllChatsByUserId(payload: string): Promise<{
        items: ChatResponseDto[];
    }> {
        const path = ChatMessagesApiPath.CHATS_$USER_ID.replace(
            ':userId',
            payload,
        );
        const response = await this.load(this.getFullEndpoint(path, {}), {
            method: 'GET',
            contentType: ContentType.JSON,
            hasAuth: true,
        });
        return response.json<{
            items: ChatResponseDto[];
        }>();
    }

    public async getAllMessagesByChatId(payload: string): Promise<{
        items: MessageResponseDto[];
    }> {
        const response = await this.load(
            this.getFullEndpoint(ChatMessagesApiPath.ROOT, payload, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<{
            items: MessageResponseDto[];
        }>();
    }

    public async createMessage(
        payload: ChatMessagesCreateRequestDto,
    ): Promise<MessageResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ChatMessagesApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return response.json<MessageResponseDto>();
    }

    public async readMessage(
        payload: ChatMessagesPatchDto,
    ): Promise<MessageResponseDto> {
        const path = ChatMessagesApiPath.READ_$MESSAGE_ID.replace(
            ':messageId',
            payload.id,
        );

        const response = await this.load(this.getFullEndpoint(path, {}), {
            method: 'PATCH',
            contentType: ContentType.JSON,
            payload: JSON.stringify(payload),
            hasAuth: true,
        });
        return response.json<MessageResponseDto>();
    }
}

export { ChatApi };
