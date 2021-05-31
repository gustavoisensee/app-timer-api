import { Router } from 'express';
import initUserRouter from './user';
import initAccountRouter from './account';
import initMonthRouter from './month';
import initVerifyValidToken from './verifyValidToken';

const router = Router();

// Check the API status router
router.get('/status', (req, res) => {
  res.send('API is running!');
});

// Routes without authorization
initAccountRouter(router);

// Set up a verify bearer token
initVerifyValidToken(router);

// Routes with authorization
initMonthRouter(router);
initUserRouter(router);

export default router;
