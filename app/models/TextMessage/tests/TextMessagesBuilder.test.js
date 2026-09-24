import { TextMessagesBuilder } from '../TextMessagesBuilder';
import { TextMessageType } from '../TextMessageType';

describe('TextMessagesBuilder.buildNewTextMessage', () => {
  it('defaults the type to NORMAL when none is provided', () => {
    const message = new TextMessagesBuilder().buildNewTextMessage(
      'Plan name',
      'session-1',
    );

    expect(message.type).toBe(TextMessageType.NORMAL);
    expect(message.name).toBe('Plan name');
    expect(message.sessionId).toBe('session-1');
  });

  it('honors the provided type (e.g. ALERT for RA sessions)', () => {
    const message = new TextMessagesBuilder().buildNewTextMessage(
      'Plan name',
      'session-1',
      TextMessageType.ALERT,
    );

    expect(message.type).toBe(TextMessageType.ALERT);
  });
});
