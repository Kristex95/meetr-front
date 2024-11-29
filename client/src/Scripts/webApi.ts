import axios, {isCancel, AxiosError, AxiosResponse} from 'axios';

const messages = [
  {
    id: "1",
    chatId: "1",
    fromUserId: "1",
    content: "Hello",
  },
  {
    id: "2",
    chatId: "1",
    fromUserId: "1",
    content: "It's me",
  },
  {
    id: "3",
    chatId: "1",
    fromUserId: "2",
    content: "Hello",
  },
  {
    id: "5",
    chatId: "2",
    fromUserId: "1",
    content: "How are you?",
  },
];

const chats = [
  {
    id: "1",
    eventName: "Meeting",
    users: [
      "1",
      "2",
    ],
  },
  {
    id: "2",
    eventName: "Party",
    users: [
      "1",
      "2",
    ],
  },
  {
    id: "3",
    eventName: "Wedding",
    users: [
      "1",
    ],
  },
  {
    id: "4",
    eventName: "Buhich",
    users: [
      "1",
    ],
  },
];


const loggedInUserId = "1";

export namespace WebApi {

  export declare type LogInfo = {
    username: string,
    password: string,
  }

  export declare type RegisterInfo = LogInfo & {
    email: string,
  }

  export declare type ServerResponse<T> = {
    body: T,
    message: object,
  }

  export declare type Chat = {
    id: number,
    eventId: number,
    users: object,
    createdAt: string,
    updatedAt: string,
  }

  export declare type User = {
    id: number,
    username: string,
    email: string
  }

  export declare type Event = {
    id: number,
    name: string,
    creatorId: number,
    chats: Chat[],
    participants: object,
    startDateTime: string,
    createdAt: string,
    updatedAt: string,
  }

  async function sendRequest(method: string, path: string, data: any): Promise<AxiosResponse> {
    try {
      const response = await axios({
        method: method.toLocaleLowerCase(),
        url: 'http://localhost:8089' + path,
        data: data,
      });
      return response;
    } catch (error) {
      console.error('Request error:', error); // Log or handle error as needed
      throw error; // Rethrow error so the caller can handle it
    }
  }

  
  export function setAuthToken(token: string) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log("JWT token set seccusfully!")
    } else {
      delete axios.defaults.headers.common['Authorization']; // Remove it if no token is present
    }
  }

  export async function validateAuthToken(token: string) {
    return await sendRequest("POST", "/api/auth/validateToken", token);
  }

  export async function logUser(data: LogInfo) {
    return await sendRequest("POST", "/api/auth/login", data);
  }

  export async function registerUser(data: RegisterInfo) {
    return await sendRequest("POST", "/api/auth/register", data);
  }

  export async function getLoggedInUser() : Promise<User> {
    const response : AxiosResponse<ServerResponse<User>> =  await sendRequest("GET", "/api/users/token", null);
    const user : User = response.data.body;
    return user;
  }

  export async function getUsers() {
    return null;
  }

  export async function getCurrentUserChats() : Promise<Chat[]>{
    const response: AxiosResponse<ServerResponse<Chat[]>> = await sendRequest("GET", "/api/users/chats", null);
    const chats: Chat[] = response.data.body;
    return chats; 
  };

  export async function getCurrentUserEvents() : Promise<Event[]>{
    const response: AxiosResponse<ServerResponse<Event[]>> = await sendRequest("GET", "/api/users/events", null);
    const events: Event[] = response.data.body;
    return events; 
  };

  export async function getChatMessages(chatId: string) {
    return messages.filter(m => m.chatId === chatId);
  }

  export async function createMessage(chatId: string, message: string) {
    messages.push({
      id: `${messages.length}`,
      chatId: chatId,
      fromUserId: loggedInUserId,
      content: message
    });
  }
}