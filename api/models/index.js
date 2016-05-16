import mongoose from 'mongoose';

import config from 'etc/config.json';

mongoose.connect(config.mongoose.uri);

import './User';

export default mongoose;
