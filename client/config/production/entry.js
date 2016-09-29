import { createHistory, useQueries } from 'history';

import app from 'client/app';

app(useQueries(createHistory));
