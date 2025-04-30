# 3D Avatar Speaker

A React application that creates animated 3D avatars using audio input and the NVIDIA Audio2Face API.

> **Note:** This is a research project. For initial 3D avatar creation, we used Character Creator and then imported the model to Audio2Face where we mapped all the facial shapes and prepared it for this project. The final avatar was then imported into this project, and by using the A2F API, we are getting live animation data for audio and rendering a 3D avatar that talks.

## Avatar Creation Process

The 3D avatar in this project was created through a multi-stage process:

1. **Initial Creation**: The base avatar was designed in Reallusion Character Creator, which provides powerful tools for creating realistic 3D human models with high-quality geometry, textures, and rigging.

2. **Audio2Face Integration**: The Character Creator model was then imported into NVIDIA's Audio2Face (A2F) application. In A2F, we:
   - Mapped all facial shapes to A2F's blendshape system
   - Fine-tuned the facial expressions and mouth movements for natural speech
   - Created a compatible rig that responds to audio input
   - Exported the model with all blendshapes properly configured

3. **Project Implementation**: The final prepared avatar was imported into this project as a GLB file (located in `src/assets/Ntest.glb`). Our application communicates with the A2F API to:
   - Send audio data (either from text-to-speech or microphone input)
   - Receive real-time animation data as blendshape values
   - Apply these values to the 3D model to create the illusion of synchronized speech

This workflow enables our application to produce highly realistic facial animations driven by audio input without requiring complex animation rigging within the web application itself.

## Future Scope

While we've made good progress with our 3D avatar speaker, there's so much more we want to do:

1. **Automated Avatar Creation Pipeline** - We're looking into building a Python-based automation pipeline that can:
   - Take a single photo or multiple photos of a person
   - Generate a complete 3D head model using AI reconstruction techniques
   - Automatically rig and map the facial features to A2F-compatible blendshapes
   - Create personalized avatars without requiring manual modeling expertise

2. **Improved Emotional Expressions** - We'd like to enhance the range of emotions by:
   - Implementing sentiment analysis on input text
   - Mapping detected emotions to appropriate facial expressions
   - Creating more natural transitions between emotional states

3. **Body Animation** - Expanding beyond just facial animation to include:
   - Upper body movements synchronized with speech patterns
   - Hand gestures to emphasize speech points
   - Natural idle animations when not speaking

We're constantly experimenting and would love to hear your ideas on how we can make this project even better!

## Features

- 3D avatar visualization with Three.js
- Text-to-speech animation: Enter text to make the avatar speak
- Microphone recording: Capture your voice to animate the avatar
- Real-time facial animation using Audio2Face
- Fallback to mock animation when A2F is unavailable

## Technology Stack

- React with TypeScript
- Three.js for 3D rendering
- NVIDIA Audio2Face API integration
- Web Audio API for recording
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js 16+
- NVIDIA Omniverse Audio2Face (optional, for full animation features)

### Installation

1. Clone this repository
```bash
git clone https://github.com/your-username/3d-avatar-speaker.git
cd 3d-avatar-speaker
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

## NVIDIA Audio2Face Integration

This project can connect to NVIDIA's Audio2Face API to generate realistic facial animations from audio or text. 

### Setup

1. Install [NVIDIA Omniverse](https://www.nvidia.com/en-us/omniverse/)
2. Install the Audio2Face extension
3. Start the Audio2Face app and ensure the REST API is enabled
4. By default, the API runs at `http://localhost:8011/api`

### Configuration

The A2F API endpoint is configured in `src/utils/audioProcessing.ts`. Modify `A2F_API_URL` if your setup differs:

```typescript
// Audio2Face API endpoint - replace with your actual A2F server URL
const A2F_API_URL = 'http://localhost:8011/api';
```

## Usage

### Text Input
1. Type text in the input field
2. Click the send button
3. The avatar will animate according to the speech generated from your text

### Voice Recording
1. Click "Start Recording"
2. Speak into your microphone
3. Click "Stop Recording" (or it will automatically stop after 30 seconds)
4. The avatar will animate according to your speech

## Project Structure

- `src/components/` - React components
  - `Avatar.tsx` - 3D avatar model and animation
  - `AvatarScene.tsx` - Three.js scene setup
  - `InputControls.tsx` - Text input and audio recording UI
  - `StatusIndicator.tsx` - Shows avatar status (idle, thinking, speaking)
- `src/utils/` - Utility functions
  - `audioProcessing.ts` - Audio2Face API integration and audio processing
  - `animationUtils.ts` - Animation helpers and loaders
- `src/assets/` - Static assets like 3D models

## Customization

### Using Your Own 3D Model

1. Place your glTF/GLB file in the `src/assets/` folder
2. Update the model path in `Avatar.tsx`
3. Ensure your model has morph targets (blendshapes) for facial animation

## License

[MIT](LICENSE)

## Acknowledgments

- NVIDIA for the Audio2Face technology
- Three.js and React Three Fiber for 3D rendering capabilities
- All the open-source libraries used in this project