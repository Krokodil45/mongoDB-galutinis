const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const mongoDbClient = new MongoClient(process.env.MONGODB_URI);

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send({ msg: 'Server is running' });
});

app.get('/memberships', async (req, res) => {
  await mongoDbClient.connect();
  const allmemberships = await mongoDbClient
    .db('nd12')
    .collection('services')
    .find()
    .toArray();
  res.send(allmemberships);
  await mongoDbClient.close();
});

app.post('/memberships', async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.description) {
    return res.status(400).send({ error: 'Incorrect data passed' });
  }
  const membership = {
    name: req.body.name,
    description: req.body.description,
    price: Number(req.body.price),
  };
  await mongoDbClient.connect();
  await mongoDbClient.db('nd12').collection('services').insertOne(membership);
  await mongoDbClient.close();
  return res.send({ msg: 'Membership added' });
});

app.delete('/memberships/:id', async (req, res) => {
  const serviceId = req.params.id;
  await mongoDbClient.connect();

  const result = await mongoDbClient
    .db('nd12')
    .collection('services')
    .deleteOne({ _id: ObjectId(serviceId) });

  await mongoDbClient.close();
  if (result.deletedCount === 0) {
    res.status(404).send({ msg: 'membership not found' });
  } else {
    res.send({ msg: 'membership deleted' });
  }
});

app.get('/users/:order', async (req, res) => {
  const { order } = req.params;
  console.log('requested order: ', order);
  await mongoDbClient.connect();
  const nameDirection = order === 'desc' ? -1 : 1;
  const users = await mongoDbClient
    .db('nd12')
    .collection('users')
    .aggregate([
      {
        $lookup: {
          from: 'services',
          localField: 'service_id',
          foreignField: '_id',
          as: 'service',
        },
      },
      { $set: { service: { $arrayElemAt: ['$service', 0] } } },
      {
        $sort: {
          name: nameDirection,
        },
      },
    ])
    .toArray();
  await mongoDbClient.close();
  res.send(users);
});

app.post('/users', async (req, res) => {
  if (
    !req.body.name ||
    !req.body.surname ||
    !req.body.email ||
    !req.body.service_id
  ) {
    return res.status(400).send({ error: 'Missing user information' });
  }
  const user = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    service_id: ObjectId(req.body.service_id),
  };
  await mongoDbClient.connect();
  await mongoDbClient.db('nd12').collection('users').insertOne(user);
  await mongoDbClient.close();
  return res.send({ msg: 'User added' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
