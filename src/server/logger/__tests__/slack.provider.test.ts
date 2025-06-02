jest.mock('server-only', () => {});
import { SlackNotificationProvider } from '../providers/slack.provider';
import { LogLevel } from '../types';

jest.mock('@slack/webhook', () => {
  return {
    IncomingWebhook: jest.fn().mockImplementation(() => ({
      send: jest.fn(),
    })),
  };
});

const baseParams = {
  level: LogLevel.ERROR,
  message: 'Mensagem de erro',
  context: 'TestContext',
  metadata: { errorName: 'Error', errorMessage: 'Falha', code: 500 },
  timestamp: new Date(),
};

describe('SlackNotificationProvider', () => {
  const webhookUrl = 'https://hooks.slack.com/services/test/test/test';
  const channel = 'monitoringtest';
  const username = 'Logger Bot';
  const iconEmoji = ':robot_face:';
  const environment = 'production';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve instanciar corretamente', () => {
    const provider = new SlackNotificationProvider(
      webhookUrl,
      channel,
      username,
      iconEmoji,
      environment,
    );
    expect(provider).toBeDefined();
  });

  it('envia notificação com sucesso', async () => {
    const provider = new SlackNotificationProvider(
      webhookUrl,
      channel,
      username,
      iconEmoji,
      environment,
    );
    const sendSpy = jest.spyOn(provider['webhook'], 'send').mockResolvedValueOnce(undefined as any);
    await expect(provider.notify(baseParams)).resolves.not.toThrow();
    expect(sendSpy).toHaveBeenCalled();
  });

  it('trata erro ao enviar notificação', async () => {
    const provider = new SlackNotificationProvider(
      webhookUrl,
      channel,
      username,
      iconEmoji,
      environment,
    );
    const sendSpy = jest
      .spyOn(provider['webhook'], 'send')
      .mockRejectedValueOnce(new Error('Slack error'));
    await expect(provider.notify(baseParams)).resolves.not.toThrow();
    expect(sendSpy).toHaveBeenCalled();
  });

  it('envia payload correto', async () => {
    const provider = new SlackNotificationProvider(
      webhookUrl,
      channel,
      username,
      iconEmoji,
      environment,
    );
    const sendSpy = jest.spyOn(provider['webhook'], 'send').mockResolvedValue(undefined as any);
    await provider.notify(baseParams);
    const call = sendSpy.mock.calls[0][0];
    expect(call).toHaveProperty('text');
    expect(call).toHaveProperty('blocks');
    expect(call).toHaveProperty('icon_emoji', iconEmoji);
    expect(call).toHaveProperty('username', username);
  });

  it('não envia notificação em ambiente de teste', async () => {
    const provider = new SlackNotificationProvider(
      webhookUrl,
      channel,
      username,
      iconEmoji,
      'test',
    );
    const sendSpy = jest.spyOn(provider['webhook'], 'send');
    await provider.notify(baseParams);
    expect(sendSpy).not.toHaveBeenCalled();
  });
});
