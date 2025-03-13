## React Native Embed SDK Example

**The @thoughtspot/react-native-embed-sdk provides a React Native component for embedding ThoughtSpot Liveboards into your React Native applications.**

### Installation

```bash
npm install @thoughtspot/react-native-embed-sdk
```

or

```bash
yarn add @thoughtspot/react-native-embed-sdk
```

or

```bash
pnpm add @thoughtspot/react-native-embed-sdk
```

### Quick Start

#### Embedding a Liveboard

Here's how to embed a Liveboard in your React Native app:

```javascript
import { init, AuthType, LiveboardEmbed } from '@thoughtspot/react-native-embed-sdk';

init({
  thoughtSpotHost: 'your-ts-host',
  authType: AuthType.TrustedAuthTokenCookieless,
  getAuthToken: async () => { // provide function to get auth token
    return "TOKEN";
  }
});

export default function App() {
  return (
      <LiveboardEmbed liveboardId="your-liveboard-id" />
  );
}
```

#### Expo Snack

[Expo Snack Link]()

#### Authentication

[//]: # (Authentication)

#### Customization

[//]: # (Customization)

#### Additional Resources

* **npm Package:** [https://www.npmjs.com/package/@thoughtspot/react-native-embed-sdk](https://www.npmjs.com/package/@thoughtspot/react-native-embed-sdk)
* **GitHub Repository:** [https://github.com/@thoughtspot/react-native-embed-sdk](https://github.com/@thoughtspot/react-native-embed-sdk)
* **ThoughtSpot Documentation:** [https://developers.thoughtspot.com/](https://developers.thoughtspot.com/)

