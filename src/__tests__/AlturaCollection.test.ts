import { ConsoleHandler, Logger, LogLevel } from 'logging-library';
import { Altura } from '../index';

require('dotenv').config();

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));
const COLLECTION_ADDRESS = process.env.COLLECTION_ADDRESS || '';
const API_KEY = process.env.API_KEY || '';

const altura = new Altura(API_KEY, (arg: string) => logger.debug(arg));
test('Altura Collection Get', async () => {
  const alturaCollection = await altura.getCollection(COLLECTION_ADDRESS);

  expect(alturaCollection).toHaveProperty('address');
  expect(alturaCollection).toHaveProperty('volume_1d');
  expect(alturaCollection).toHaveProperty('volume_1w');
  expect(alturaCollection).toHaveProperty('volume_30d');
  expect(alturaCollection).toHaveProperty('volume_all');
}, 60000);

test('Altura Collection Update', async () => {
  const alturaCollection = await altura.getCollection(COLLECTION_ADDRESS);

  const description = 'This is a test description';
  const data = await alturaCollection.update({
    description: description,
  });

  expect(data).toHaveProperty('collection');
  expect(data.collection).toHaveProperty('address');
  expect(data.collection.description).toBe(description);
}, 60000);
