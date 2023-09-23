import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Category from './models/Category';
import Product from './models/Product';

(async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('products');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user_1, user_2] = await User.create(
    {
      username: 'Okabe',
      password: 'el.psy.congroo',
      nickname: 'Oka_Rin',
      phone: '+996 777 371 978',
      token: crypto.randomUUID(),
    },
    {
      username: 'Kurisu',
      password: 'qqwndjkndljgojrgeg12131',
      nickname: 'Kurisu',
      phone: '+996 778 123 456',
      token: crypto.randomUUID(),
    },
  );

  const [computers, cars, other] = await Category.create(
    {
      name: 'computers',
      title: 'Computers',
    },
    {
      name: 'cars',
      title: 'Cars',
    },
    {
      name: 'other',
      title: 'Other',
    },
  );

  await Product.create(
    {
      user: user_1._id,
      category: computers._id,
      title: 'Computer monoblock',
      description: 'Computer monoblock i9 pc desktop all in one 23.8 27 32 inch curved screen i3 i5 i7 Independent graphics card gaming computer',
      price: 199.00,
      image: 'fixtures/computer_monoblock.png',
    },
    {
      user: user_1._id,
      category: computers._id,
      title: 'Tsinghua Tongfang Chaoxiang',
      description: 'Tsinghua Tongfang Chaoxiang TZ830-V3 domestic commercial desktop computer host (ZX-EKX-U6780A/8GB/256GB SSD/2G exclusive display',
      price: 922.45,
      image: 'fixtures/tsinghua_tongfang_chaoxiang.png',
    },
    {
      user: user_1._id,
      category: cars._id,
      title: '2020 Tesla Model 3',
      description: 'I\'d like to know if the Used 2020 Tesla Model 3 Performance you have listed on Cars.com for $38,978 is still available.',
      price: 38978,
      image: 'fixtures/2020_Tesla_Model_3.png',
    },
    {
      user: user_2._id,
      category: cars._id,
      title: '2015 Tesla Model S 85D',
      description: 'I\'d like to know if the Used 2015 Tesla Model S 85D you have listed on Cars.com for $22,995 is still available.',
      price: 22995,
      image: 'fixtures/2015_Tesla_Model_S_85D.png',
    },
    {
      user: user_2._id,
      category: other._id,
      title: 'Spoon/Fork/Knife Kit',
      description: 'Hot Sale Classical Style Royal Dinnerware set Good Quality 24pcs Cutlery set with Flower Engraving',
      price: 3377.04,
      image: 'fixtures/Spoon_Fork_Knife_Kit.jpg',
    },
    {
      user: user_1._id,
      category: other._id,
      title: 'Divergence Meter',
      description: '8 Tubes Divergence Meter World Line Change Rate Detector Analog Glow Tube Clock Steins\' Gate Hand-made Gift Animation Model',
      price: 14509.26,
      image: 'fixtures/divergence_meter.png',
    },
  );

  await db.close();
})().catch(console.error);