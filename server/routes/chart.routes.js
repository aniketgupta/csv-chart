import { Router } from 'express';
import * as ChartController from '../controllers/chart.controller';
const router = new Router();

// Save chart data
router.route('/save-chart-data').post(ChartController.saveChartData);

// Get chart data
router.route('/get-chart-data').get(ChartController.getChartData);

export default router;
