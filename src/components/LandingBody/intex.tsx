import './style.css';
import LandingTitle from '../LandingTitle';
import LandingContent from '../LandingContent';
import LandingDate from '../LangingDate';
import LandingButton from '../LandingButton';

export default function LandingBody() {
  return (
    <div className='landing-body'>
      <LandingTitle></LandingTitle>
      <LandingContent></LandingContent>
      <LandingDate></LandingDate>
      <LandingButton></LandingButton>
    </div>
  );
}
