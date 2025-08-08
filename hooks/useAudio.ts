import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export function useAudio(source: string | null = null) {
  // Audio Player
  const [audioSource, setAudioSource] = useState<string | null>(source);
  const audioPlayer = useAudioPlayer(audioSource);
  const audioPlayerStatus = useAudioPlayerStatus(audioPlayer);

  // Audio Recording
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const audioRecorderState = useAudioRecorderState(audioRecorder);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert('Permission to access microphone was denied');
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });

      setIsReady(true);
    })();
  }, []);

  const startRecording = async () => {
    if (!isReady) return;
    console.log('here');
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    console.log('here');
    await audioRecorder.stop();
    setAudioSource(audioRecorder.uri);
    // audioPlayer.replace(audioRecorder.uri);
  };

  const play = () => audioPlayer.play();
  const pause = () => audioPlayer.pause();
  const seekTo = (number: number) => audioPlayer.seekTo(number);

  const replay = () => {
    seekTo(0);
    play();
  };

  const stop = () => {
    pause();
    seekTo(0);
  };

  const replaceSource = (audioSource: string | null) => {
    if (audioSource !== null) audioPlayer.replace(audioSource);
  };

  return {
    isRecording: audioRecorderState.isRecording,
    playerStatus: audioPlayerStatus,
    audioSource: audioSource ?? audioRecorder.uri,

    startRecording,
    stopRecording,
    play,
    pause,
    seekTo,
    stop,
    replay,
    setAudioSource: replaceSource,
  };
}
