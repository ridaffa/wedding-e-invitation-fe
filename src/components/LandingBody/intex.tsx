import './style.css';
import LandingTitle from '../LandingTitle';
import LandingContent from '../LandingContent';
import LandingDate from '../LangingDate';
import LandingButton from '../LandingButton';
import LandingSeparator from '../LandingSeparatorMobile';
import LandingLogoMobile from '../LandingLogoMobile';
import LangIcon from '../LangIcon';
import MobileConsumer from '../../contexts/MobileContext';
import LangConsumer from '../../contexts/LangContexts';

export default function LandingBody() {
  const MobileContext = MobileConsumer();
  const LangContext = LangConsumer();

  return (
    <div className={`landing-body ${MobileContext.mobile ? 'mobile' : ''}`}>
      <LandingLogoMobile></LandingLogoMobile>
      <LandingTitle title={LangContext.lang.landing.title}></LandingTitle>
      <LandingContent></LandingContent>
      <div className={`landing-date ${MobileContext.mobile ? 'inactive' : ''}`}>
        <LandingDate></LandingDate>
      </div>
      <div className={MobileContext.mobile ? 'opacity-1' : 'opacity-0'}>
        <LandingSeparator height='4.4375rem'></LandingSeparator>
      </div>
      <LandingButton></LandingButton>
      <div
        className={`landing-body ${
          !MobileContext.mobile ? 'inactive-lang' : ''
        }`}
      >
        <LangIcon></LangIcon>
      </div>
    </div>
  );
}
