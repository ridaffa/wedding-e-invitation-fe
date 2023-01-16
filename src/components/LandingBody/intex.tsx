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
import SubHeadingText from '../SubHeadingText/SubHeadingText';
import { Fade } from 'react-awesome-reveal';

export default function LandingBody(props: { name: string; title: string }) {
  const MobileContext = MobileConsumer();
  const LangContext = LangConsumer();

  return (
    <div className={`landing-body ${MobileContext.mobile ? 'mobile' : ''}`}>
      <Fade>
        <LandingLogoMobile></LandingLogoMobile>
      </Fade>
      <Fade>
        <LandingTitle title={LangContext.lang.landing.title}></LandingTitle>
      </Fade>
      <Fade>
        <LandingContent></LandingContent>
      </Fade>
      <Fade>
        <div
          className={`landing-date ${MobileContext.mobile ? 'inactive' : ''}`}
        >
          <LandingDate></LandingDate>
        </div>
      </Fade>
      <Fade>
        <div className={MobileContext.mobile ? 'opacity-1' : 'opacity-0'}>
          <LandingSeparator height='4.4375rem'></LandingSeparator>
        </div>
      </Fade>
      <Fade>
        <div className='landing-greet'>
          <SubHeadingText
            fontSize={MobileContext.mobile ? '1.5rem' : '1.563vw'}
            text={LangContext.lang.landing.yth}
          ></SubHeadingText>
          <SubHeadingText
            fontSize={MobileContext.mobile ? '2.5rem' : '2.604vw'}
            text={props.name}
          ></SubHeadingText>
          <SubHeadingText
            fontSize={MobileContext.mobile ? '1.5rem' : '1.563vw'}
            text={props.title}
          ></SubHeadingText>
        </div>
      </Fade>
      <Fade>
        <LandingButton></LandingButton>
      </Fade>{' '}
      <Fade>
        <div
          className={`landing-body ${
            !MobileContext.mobile ? 'inactive-lang' : ''
          }`}
        >
          <LangIcon></LangIcon>
        </div>
      </Fade>
    </div>
  );
}
