declare module "node-nats-streaming" {
  // Stan client interface - the main connection object
  export interface Stan {
    // Event handlers
    on(event: "connect", callback: () => void): void;
    on(event: "close", callback: () => void): void;
    on(event: "error", callback: (err: Error) => void): void;
    on(event: "disconnect", callback: () => void): void;
    on(event: "reconnecting", callback: () => void): void;
    on(event: "reconnect", callback: (client: Stan) => void): void;
    on(event: "connection_lost", callback: (err: Error) => void): void;
    on(event: "permission_error", callback: (err: Error) => void): void;

    // Publish methods
    publish(
      subject: string,
      data: string | Buffer,
      callback?: (err: Error | undefined, guid: string) => void
    ): string;

    // Subscribe methods
    subscribe(subject: string, options?: SubscriptionOptions): Subscription;
    subscribe(
      subject: string,
      queueGroup: string,
      options?: SubscriptionOptions
    ): Subscription;

    // Subscription options factory
    subscriptionOptions(): SubscriptionOptions;

    // Connection management
    close(): void;
  }

  // Message interface - received in subscription callbacks
  export interface Message {
    getSubject(): string;
    getSequence(): number;
    getData(): string | Buffer;
    getRawData(): Buffer;
    getTimestamp(): Date;
    getTimestampRaw(): number;
    isRedelivered(): boolean;
    getCrc32(): number;
    ack(): void;
  }

  // Subscription interface - returned from subscribe()
  export interface Subscription {
    on(event: "message", callback: (msg: Message) => void): void;
    on(event: "error", callback: (err: Error) => void): void;
    on(event: "timeout", callback: (err: Error) => void): void;
    on(event: "close", callback: () => void): void;
    on(event: "ready", callback: () => void): void;
    on(event: "unsubscribed", callback: () => void): void;
    unsubscribe(): void;
    close(): void;
  }

  // Subscription options - chainable configuration
  export interface SubscriptionOptions {
    setManualAckMode(manual: boolean): SubscriptionOptions;
    setDeliverAllAvailable(): SubscriptionOptions;
    setStartAtSequence(seq: number): SubscriptionOptions;
    setStartTime(time: Date): SubscriptionOptions;
    setStartWithLastReceived(): SubscriptionOptions;
    setDurableName(name: string): SubscriptionOptions;
    setAckWait(millis: number): SubscriptionOptions;
    setMaxInFlight(n: number): SubscriptionOptions;
    setStartAtTimeDelta(delta: number): SubscriptionOptions;
  }

  // Connection options
  export interface StanOptions {
    url?: string;
    nc?: any;
    connectTimeout?: number;
    ackTimeout?: number;
    discoverPrefix?: string;
    maxPingOut?: number;
    maxPubAcksInflight?: number;
    stanEncoding?: string;
    stanMaxPingOut?: number;
    stanPingInterval?: number;
  }

  // Connect function - creates a Stan client
  export function connect(
    clusterId: string,
    clientId: string,
    options?: StanOptions
  ): Stan;

  // Default export
  const nats: {
    connect: typeof connect;
  };
  export default nats;
}
