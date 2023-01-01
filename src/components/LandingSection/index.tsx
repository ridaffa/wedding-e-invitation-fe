import './style.css';
import cover from '../../assets/Foto/Cover.jpg';

export default function LandingSection(props: { children: React.ReactNode }) {
  return (
    <div className='landing-section'>
      <img className='background-img' src={cover} alt='Uti dan Faisal' />
      {props.children}
    </div>
  );
}
