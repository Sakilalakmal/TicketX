import { Stan } from "node-nats-streaming";
import type { Subjects } from "./subjects.js";

export interface NatsEvent {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends NatsEvent> {
  abstract subject: T["subject"];
  private client: Stan;
  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]) {
    this.client.publish(this.subject, JSON.stringify(data), () => {
      console.log("Event published");
    });
  }
}
