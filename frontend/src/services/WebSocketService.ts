import { ChatMessage, Sender } from "@/types/ChatMessage";

export default class WebSocketService {
  private socket: WebSocket;
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.socket = new WebSocket(this.url);
  }

  connect(clientType: Sender): void {
    this.socket.onopen = () => {
      console.log("Connected to WebSocket server");

      // Отправляем сообщение для идентификации (клиент или админ)
      const identificationMessage = JSON.stringify({
        type: clientType,
      });
      this.socket.send(identificationMessage);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  onMessage(callback: (message: ChatMessage) => void): void {
    this.socket.onmessage = (event: MessageEvent) => {
      try {
        const data = event.data;
        const parsedMessage = JSON.parse(data);
        callback(parsedMessage);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };
  }

  sendMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else if (this.socket.readyState === WebSocket.CONNECTING) {
      this.socket.addEventListener("open", () => {
        this.socket.send(message);
      });
    } else {
      console.error(
        "WebSocket is not open. Ready state:",
        this.socket.readyState
      );
    }
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  private isJson(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
}
