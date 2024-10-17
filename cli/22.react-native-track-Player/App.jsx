import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Button, StyleSheet, ActivityIndicator } from 'react-native';
import TrackPlayer, { Capability, State, usePlaybackState, useProgress, } from 'react-native-track-player';

const App = () => {
  const [isBuffering, setIsBuffering] = useState(false);
  const playbackState = usePlaybackState();
  const progress = useProgress();

  useEffect(() => {
    set_track_player();

    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  const set_track_player = async () => {
    try {
      await TrackPlayer.setupPlayer();

      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      const track1 = {
        url: 'https://file-examples.com/storage/feb05093336710053a32bc1/2017/11/file_example_MP3_700KB.mp3',
        title: 'Native Sound',
        artist: 'react-native',
        album: 'react-264',
        genre: 'MERN',
        date: '2014-05-20T07:00:00+00:00',
        artwork: 'https://avatars.githubusercontent.com/u/120649081?s=400&u=cff00a0b3520ed2fbb5c859964c77241ece5a515&v=4',
        duration: 402,
      };

      await TrackPlayer.add([track1]);

      TrackPlayer.play();
    } catch (error) {
      console.error('Error setting up track player:', error);
    }
  };

  const togglePlayback = async () => {
    const currentState = await TrackPlayer.getPlaybackState();
    if (currentState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.playerContainer}>
        <Text style={styles.title}>Audio Player Example</Text>
        {isBuffering && <ActivityIndicator size="large" color="#fff" />}
        <View style={styles.controls}>
          <Button
            title={playbackState === State.Playing ? 'Pause' : 'Play'}
            onPress={togglePlayback}
          />
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {formatTime(progress.position)}
          </Text>
          <Text style={styles.progressText}>
            {formatTime(progress.duration)}
          </Text>
        </View>
        <Text style={styles.bufferingText}>
          {isBuffering ? 'Buffering...' : ''}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerContainer: {
    width: '90%',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  progressText: {
    color: 'white',
    marginHorizontal: 10,
  },
  slider: {
    flex: 1,
  },
  bufferingText: {
    color: 'white',
    marginTop: 10,
  },
});

export default App;