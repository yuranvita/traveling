export default  {
  "expo": {
    "name": "traveling",
    "slug": "traveling",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/travel.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FFF"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.traveling",
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "android": {
      "config" : {
        "googleMaps":{
          "apiKey" : process.env.googleMaps
        }
      },
      "package": "com.traveling",
      "versionCode" : 1
    }
  }
}
