import { LogLevel } from "@/server/logger/types";

export interface LoggerConfig {
  defaultContext?: string;
  enableAudit?: boolean;
  notificationLevels?: LogLevel[];
  defaultAudit?: boolean;
}

export const defaultLoggerConfig: LoggerConfig = {
  defaultContext: 'Application',
  enableAudit: false,
  notificationLevels: [LogLevel.ERROR, LogLevel.WARN],
  defaultAudit: true,
};
