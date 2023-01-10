import './style.css';
import musicOn from '../../assets/music-on.png';
import musicOff from '../../assets/music-off.png';
import { useEffect, useState } from 'react';
import MobileConsumer from '../../contexts/MobileContext';

export default function MusicIcon() {
  const MobileContext = MobileConsumer();
  const [music, setMusic] = useState<string>(musicOff);
  useEffect(() => {
    setMusic(musicOn);
  }, []);

  const handleMusic = () => {
    if (music === musicOn) {
      setMusic(musicOff);
    } else {
      setMusic(musicOn);
    }
  };

  return (
    <div className={`music-icon ${MobileContext.mobile ? 'mobile' : ''}`}>
      <img src={music} alt='' onClick={handleMusic} />
    </div>
  );
}
