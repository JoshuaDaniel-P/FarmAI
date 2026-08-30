import { WeatherData, WeatherRecommendation, LiveSensors, CropGrowthStage } from '../types/farm';

export class WeatherService {
  private weatherData: WeatherData = {
    currentTemp: 34,
    currentHumidity: 61,
    currentRainfallMm: 0,
    currentWindKmph: 12,
    condition: 'Partly Cloudy',
    icon: 'partly_cloudy_day',
    dailyForecast: [
      {
        dayLabel: 'Today',
        date: '30 Aug',
        tempMax: 34,
        tempMin: 24,
        humidity: 61,
        rainProbabilityPercent: 15,
        rainfallMm: 0,
        windKmph: 12,
        condition: 'Partly Cloudy',
        icon: 'partly_cloudy_day',
      },
      {
        dayLabel: 'Tomorrow',
        date: '31 Aug',
        tempMax: 33,
        tempMin: 23,
        humidity: 68,
        rainProbabilityPercent: 45,
        rainfallMm: 4.5,
        windKmph: 16,
        condition: 'Light Showers',
        icon: 'rainy',
      },
      {
        dayLabel: 'Tuesday',
        date: '01 Sep',
        tempMax: 31,
        tempMin: 22,
        humidity: 78,
        rainProbabilityPercent: 75,
        rainfallMm: 18.0,
        windKmph: 22,
        condition: 'Moderate Rain',
        icon: 'thunderstorm',
      },
      {
        dayLabel: 'Wednesday',
        date: '02 Sep',
        tempMax: 32,
        tempMin: 23,
        humidity: 72,
        rainProbabilityPercent: 30,
        rainfallMm: 2.0,
        windKmph: 14,
        condition: 'Passing Clouds',
        icon: 'cloud',
      },
      {
        dayLabel: 'Thursday',
        date: '03 Sep',
        tempMax: 35,
        tempMin: 25,
        humidity: 58,
        rainProbabilityPercent: 10,
        rainfallMm: 0,
        windKmph: 10,
        condition: 'Sunny & Warm',
        icon: 'wb_sunny',
      },
    ],
  };

  /**
   * Returns current weather and 5-day daily forecast (Separated service ready for external Weather API)
   */
  public getWeatherData(): WeatherData {
    return { ...this.weatherData };
  }
}

export const weatherService = new WeatherService();

/**
 * Transparent rule-based weather recommendation engine (Not an LLM)
 * Interprets weather forecast + active crop + growth stage + soil moisture to generate actionable farmer advice
 */
export class WeatherRecommendationService {
  public generateRecommendations(
    cropName: string,
    growthStage: CropGrowthStage,
    sensors: LiveSensors,
    weather: WeatherData
  ): WeatherRecommendation[] {
    const recommendations: WeatherRecommendation[] = [];
    const tomorrow = weather.dailyForecast[1];
    const dayAfter = weather.dailyForecast[2];

    // 1. Irrigation recommendation based on upcoming rainfall
    if (tomorrow.rainProbabilityPercent >= 40 || dayAfter.rainProbabilityPercent >= 60) {
      recommendations.push({
        id: 'rec-rain-irrigation',
        title: 'Rain Expected Soon',
        message: `Rainfall (${tomorrow.rainProbabilityPercent}% chance tomorrow, ${dayAfter.rainProbabilityPercent}% Tuesday) is forecast. Irrigation may not be necessary today except in extremely dry sectors.`,
        type: 'irrigation',
        severity: 'info',
        actionableTip: 'Hold off major canal or tube-well irrigation to conserve power and avoid standing water excess.',
      });
    }

    // 2. High humidity & disease risk recommendation
    if (weather.currentHumidity >= 60 || tomorrow.humidity >= 65) {
      recommendations.push({
        id: 'rec-disease-humidity',
        title: 'Elevated Humidity Disease Risk',
        message: `High humidity (${weather.currentHumidity}%) and cooler night temperatures increase the risk of fungal infections such as ${cropName.includes('Paddy') ? 'Paddy Blast and Brown Spot' : 'Leaf Spot'}.`,
        type: 'disease_risk',
        severity: 'warning',
        actionableTip: 'Inspect lower leaf canopies in the morning for fungal spots before morning dew dries.',
      });
    }

    // 3. High temperature stress monitoring
    if (weather.currentTemp >= 34 || weather.dailyForecast.some((d) => d.tempMax >= 35)) {
      recommendations.push({
        id: 'rec-heat-stress',
        title: 'Heat Stress Alert',
        message: `Daytime temperatures reaching ${weather.currentTemp}°C. Ensure adequate moisture is maintained in the root zone during ${growthStage.stageName}.`,
        type: 'heat_stress',
        severity: 'info',
        actionableTip: 'Water during cooler evening or early morning hours to minimize surface evaporation loss.',
      });
    }

    // 4. Drainage check for heavy rain days
    if (dayAfter.rainProbabilityPercent >= 70 && dayAfter.rainfallMm >= 15) {
      recommendations.push({
        id: 'rec-drainage',
        title: 'Heavy Rain Drainage Check',
        message: `Heavy showers (${dayAfter.rainfallMm}mm) expected on ${dayAfter.dayLabel}. Check bund outlets and field drainage channels to prevent waterlogging.`,
        type: 'drainage',
        severity: 'warning',
        actionableTip: 'Clear silt and weed blockages from field drainage trenches before Tuesday.',
      });
    }

    return recommendations;
  }
}

export const weatherRecommendationService = new WeatherRecommendationService();
