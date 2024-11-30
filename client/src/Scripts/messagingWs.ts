export namespace WsTypes {

  export declare type WsMessage = {
    data : {
      chatId: number,
      content: string
    },
    channel: string,
    type: string
  }
}