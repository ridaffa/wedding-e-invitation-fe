import { createRef, useEffect } from 'react';
import MusicConsumer from '../../contexts/MusicContexts';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Outlet } from 'react-router-dom';

export default function Music(props: { src: string }) {
  const MusicContext = MusicConsumer();

  const player = createRef<AudioPlayer>();

  const handlePlay = () => {
    if (player.current !== null) {
      if (player.current.audio.current !== null) {
        player.current.audio.current.play();
      }
    }
  };

  const handlePause = () => {
    if (player.current !== null) {
      if (player.current.audio.current !== null) {
        player.current.audio.current.pause();
      }
    }
  };

  useEffect(() => {
    if (MusicContext.music) {
      handlePlay();
    } else {
      handlePause();
    }
  }, [MusicContext.music]);
  return (
    <div>
      {' '}
      <div style={{ display: 'none' }}>
        <AudioPlayer autoPlay src={props.src} ref={player} />
      </div>
      <Outlet />
    </div>
  );
}
