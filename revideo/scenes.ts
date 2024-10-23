import { DescriptionOf, makeProject, createRef, waitFor, ThreadGenerator } from '@revideo/core';
import { makeScene2D, Img, View2D, Scene2D, Audio, Rect, Txt } from '@revideo/2d';
import { SceneItem, Storyboard } from './types';
import storyboardProject from "../public/storyboard_project.json";

function createScene(item: SceneItem): DescriptionOf<Scene2D> {
  return makeScene2D(`Scene_${item.image}`, function* (view) {
    // Set the view size to 9:16 aspect ratio
    view.size(1080, 1920);  // This is correct for 9:16

    // Create refs for elements
    const imageRef = createRef<Img>();
    const audioRef = createRef<Audio>();
    const subtitleRef = createRef<Txt>();

    // Create a background rectangle to ensure 9:16 aspect ratio
    const background = new Rect({
      width: '100%',
      height: '100%',
      fill: '#000000',
    });

    // Create image element
    const image = new Img({
      ref: imageRef,
      src: item.image,
      width: 576,
      height: 1024,
    });

    // Create audio element
    const audio = new Audio({
      ref: audioRef,
      src: item.audio,
    });

    // Create subtitle element
    const subtitle = new Txt({
      ref: subtitleRef,
      text: item.subtitles,
      width: 900,
      fill: '#000000',
      fontSize: 32,
      fontWeight: 700,
      textAlign: 'center',
      y: 800,
    });

    // Add elements to the view
    view.add(background);
    view.add(image);
    view.add(audio);
    view.add(subtitle);

    // Wait for the audio to load
    yield audio.toPromise();

    // Get the audio duration after it's loaded
    const audioDuration = audio.getDuration();

    // Play audio
    audio.play();

    // Wait for the audio to finish
    yield* waitFor(audioDuration);
  });
}

const storyboard: Storyboard = { 
  scenes: storyboardProject.storyboards.map((scene) => ({
    image: scene.image,
    audio: scene.audio,
    transition: scene.transition_type,
    subtitles: scene.subtitles,
  })),
};

export function makeScenes() {
  return makeProject({
    name: 'Storyboard Video',
    scenes: storyboard.scenes.map(createScene),
  });
}
