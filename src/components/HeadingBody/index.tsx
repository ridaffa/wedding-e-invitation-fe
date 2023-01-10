import './style.css';
import LandingTitle from '../LandingTitle';
import LandingContent from '../LandingContent';
import LandingDate from '../LangingDate';
import LandingLogoMobile from '../LandingLogoMobile';
import MobileConsumer from '../../contexts/MobileContext';
import LangConsumer from '../../contexts/LangContexts';

export default function HeadingBody() {
  const MobileContext = MobileConsumer();
  const LangContext = LangConsumer();
  return (
    <div className={`heading-body ${MobileContext.mobile ? 'mobile' : ''}`}>
      <LandingLogoMobile></LandingLogoMobile>
      <LandingTitle title={LangContext.lang.header.title}></LandingTitle>
      <LandingContent></LandingContent>
      <div className={`landing-date ${MobileContext.mobile ? 'inactive' : ''}`}>
        <LandingDate></LandingDate>
      </div>
    </div>
  );
}
