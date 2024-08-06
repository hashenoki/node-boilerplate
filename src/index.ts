import 'dotenv/config';
import { startApp } from 'app';
import { logger } from 'utils/logger';

logger.info('Starting server...');
startApp();
