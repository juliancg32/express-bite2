/**
 * @license
 * Infrastructure Layer: In-Memory EventBus Notification Service
 * 
 * Simulates real-time web socket broadcasting between the student client
 * and the cafeteria counter & kitchen KDS terminals.
 */

import { INotificationService, RealTimeListener, RealTimePayload } from '../../application/ports/INotificationService.ts';

export class EventBusNotificationService implements INotificationService {
  private listeners: Set<RealTimeListener> = new Set();

  public publish(event: RealTimePayload): void {
    // Deliver synchronously or microtask
    this.listeners.forEach(listener => {
      try {
        listener(event);
      } catch (err) {
        console.error('Error in real-time notification listener:', err);
      }
    });
  }

  public subscribe(listener: RealTimeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}
