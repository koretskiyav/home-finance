import mongoose from 'mongoose';

import config from 'etc/config.json';

mongoose.connect(config.mongoose.uri);

import './User';
import './Rate';
import './Currency';
import './Account';
import './Budget';

export default mongoose;
