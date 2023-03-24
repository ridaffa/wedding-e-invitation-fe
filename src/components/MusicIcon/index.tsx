import './style.css';
import musicOn from '../../assets/music-on.png';
import musicOff from '../../assets/music-off.png';
import MobileConsumer from '../../contexts/MobileContext';
import MusicConsumer from '../../contexts/MusicContexts';

export default function MusicIcon() {
  const MobileContext = MobileConsumer();
  const MusicContext = MusicConsumer();
  const handleMusic = () => {
    MusicContext.setMusic?.(!MusicContext.music);
  };

  return (
    <div className={`music-icon ${MobileContext.mobile ? 'mobile' : ''}`}>
      <img
        src={MusicContext?.music ? musicOn : musicOff}
        alt=''
        onClick={handleMusic}
      />
    </div>
  );
}
