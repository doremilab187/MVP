export interface Totem {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
  avatar: string; // Emoji character representation
  skill: string;
}

export type ScreenState = 'menu' | 'adventure';

export interface MomentDetails {
  id: number;
  title: string;
  videoUrl: string; // URL for the video portion of the story
  caption: string; // Visual caption of what is happening in the rabbit's story
  hasPopup: boolean;
  popupType?: 'pulse' | 'reaction';
}
