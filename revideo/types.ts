export interface SceneItem {
  image: string;
  audio: string;
  transition: string;
  subtitles: string;
}

export interface Storyboard {
  scenes: SceneItem[];
}

// export interface StoryboardProject {
//   project_info: {
//     title: string;
//     user: string;
//     timestamp: string;
//   };
//   storyboards: {
//     scene_number: string;
//     description: string;
//     subtitles: string;
//     image: string;
//     audio: string;
//     transition_type: string;
//   }[];
//   characters: {
//     name: string;
//     ethnicity: string;
//     gender: string;
//     age: string;
//     facial_features: string;
//     body_type: string;
//     hair_style: string;
//     accessories: string;
//   }[];
// }
