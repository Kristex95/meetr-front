import axios, {isCancel, AxiosError, AxiosResponse} from 'axios';

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

  export declare type Pagable<T> = {
    content: T,
    pageable: {
      pageNumber: number,
      pageSize: number,
      sort: {
          empty: boolean,
          sorted: boolean,
          unsorted: boolean
      },
      offset: number,
      paged: boolean,
      unpaged: boolean
  },
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean
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
    description?: string,
    creatorId: number,
    chats: Chat[],
    participants: object,
    startDateTime: string,
    createdAt: string,
    updatedAt: string,
  }

  export declare type Message = {
    id: number,
    senderId: number,
    chatId: number,
    content: string,
    createdAt: string,
    updatedAt: string,
  }

  async function sendRequest(method: string, path: string, data: any): Promise<AxiosResponse> {
    try {
      const apiUrl = process.env.REACT_APP_MEETR_BACKEND_API_URL;
      const response = await axios({
        method: method.toLocaleLowerCase(),
        url: apiUrl + path,
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

  export async function getUsersFromEvent(id: number) : Promise<User[]> {
    const response: AxiosResponse<ServerResponse<User[]>> = await sendRequest("GET", `/api/events/${id}/users`, null);
    const users: User[] = response.data.body;
    return users;
  }

  export async function getUsers() : Promise<User[]> {
    const response: AxiosResponse<ServerResponse<User[]>> = await sendRequest("GET", `/api/users`, null);
    const users: User[] = response.data.body;
    return users;
  }

  export async function getFriends() : Promise<User[]> {
    const response: AxiosResponse<ServerResponse<User[]>> = await sendRequest("GET", `/api/users/friends`, null);
    const users: User[] = response.data.body;
    return users;
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

  export async function getEventMainChat(chatId: number) : Promise<Chat> {
    const response: AxiosResponse<ServerResponse<Chat>> = await sendRequest("GET", `/api/events/${chatId}/mainChat`, null);
    const chat: Chat = response.data.body;
    return chat; 
  };

  export async function getChatMessages(chatId: number) : Promise<Message[]> {
    const response: AxiosResponse<ServerResponse<Message[]>> = await sendRequest("GET", `/api/chats/${chatId}/messages`, null);
    const messages: Message[] = response.data.body;
    return messages; 
  };
  

  export async function createMessage(chatId: string, message: string) {
    // messages.push({
    //   id: `${messages.length}`,
    //   chatId: chatId,
    //   fromUserId: loggedInUserId,
    //   content: message
    // });
  }

  export async function createEventChat(event: Event) {
    return await sendRequest("POST", "/api/events", event);
  }

  export async function changeUserData(user: User) {
    return await sendRequest("PUT", `/api/users`, user);
  }

  export async function changePassword(oldPassword: string, newPassword: string) {
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    return await sendRequest("PUT", `/api/users`, data);
  }

  export async function addFriends(users: number[]) {
    return await sendRequest("POST", `/api/users/addFriends`, { newFriendsIds : users});
  }

  export async function addEventMembers(eventId: number, userId: number) {
    return await sendRequest("POST", `/api/events/${eventId}/adduser/${userId}`, null);
  }
}