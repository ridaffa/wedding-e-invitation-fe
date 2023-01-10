import InvitationSection from '../../components/InvitationSection';
import LangIcon from '../../components/LangIcon';
import LangMusic from '../../components/LangMusic';
import MusicIcon from '../../components/MusicIcon';
import Navigation from '../../components/Navigation';
import DesktopCover from '../../assets/desktop-cover-invitation.png';
import MobileCover from '../../assets/mobile-cover.jpeg';
import faishalPhoto from '../../assets/Faishal.png';
import utiPhoto from '../../assets/Uti.png';
import loveStory1 from '../../assets/love-story-1.jpeg';
import loveStory2 from '../../assets/love-story-2.png';
import countdownImg from '../../assets/countdown.png';
import protocolLogo1 from '../../assets/LOGO2.png';
import protocolLogo2 from '../../assets/LOGO3.png';
import protocolLogo3 from '../../assets/LOGO4.png';
import mandiriLogo from '../../assets/mandiri.png';
import bniLogo from '../../assets/bni.png';
import carLogo from '../../assets/car.png';
import copyIcon from '../../assets/copy.png';
import surahBackground from '../../assets/surah-background.png';
import flowerTopLeft from '../../assets/flower-top-left.png';
import flowerBottomLeft from '../../assets/flower-bottom-left.png';
import flowerBottomRight from '../../assets/flower-bottom-right.png';
import flowerMap from '../../assets/flower-map.png';
import flowerCombined from '../../assets/flower-combined.png';
import flowerSeparator from '../../assets/flower-separator.png';
import logoUf from '../../assets/landing-logo-mobile.png';
import flowerStory from '../../assets/flower-story.png';
import flowerDateLeft from '../../assets/flower-date-left.png';
import flowerDateRight from '../../assets/flower-date-right.png';
import flowerMapLeft from '../../assets/flower-map-left.png';
import flowerMessageLeft from '../../assets/flower-message-left.png';
import flowerMessageRight from '../../assets/flower-message-right.png';
import mobileLoveStory1 from '../../assets/mobile-love-story-1.png';
import mobileLoveStory2 from '../../assets/mobile-love-story-2.png';
import mobileHeaderBottomLeft from '../../assets/mobile-header-bottom-left.png';
import mobileHeaderBottomRight from '../../assets/mobile-header-bottom-right.png';
import mobileStoryLeft from '../../assets/mobile-story-left.png';
import mobileStoryRight from '../../assets/mobile-story-right.png';
import mobileDateRight from '../../assets/mobile-date-right.png';
import mobileDateLeft from '../../assets/mobile-date-left.png';
import mobileRsvpLeft from '../../assets/mobile-rsvp-left.png';

import './style.scss';
import LangConsumer from '../../contexts/LangContexts';
import HeadingText from '../../components/HeadingText';
import { useEffect, useState } from 'react';
import SubHeadingText from '../../components/SubHeadingText/SubHeadingText';
import MobileConsumer from '../../contexts/MobileContext';
import LandingSeparator from '../../components/LandingSeparatorMobile';
import Paragraph from '../../components/Paragraph';
import Span from '../../components/Span';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IGuest } from '../../interfaces/GuestInterface';

export default function InvitationPage() {
  const [guest, setGuest] = useState<IGuest>({
    id: 0,
    uuid: '',
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    visit: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const guest = localStorage?.getItem('guest');
    if (guest) {
      setGuest(JSON.parse(guest));
    } else {
      navigate('/');
    }
  }, []);
  const MobileContext = MobileConsumer();
  const LangContext = LangConsumer();
  const LangContent = LangContext.lang;
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const handleCopy = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    toast.info('Copied to clipboard');
    switch (e.currentTarget.id) {
      case 'mandiri-copy':
        navigator.clipboard.writeText('1230007875349');
        break;
      case 'bni-copy':
        navigator.clipboard.writeText('1430292508');
        break;
      default:
        break;
    }
  };
  const openLocation = () => {
    window.open('https://goo.gl/maps/p6wHNrFgyXqPuKmc6');
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const weddingDate = new Date('January 28, 2023 10:00:00').getTime();
      const now = new Date().getTime();
      const distance = weddingDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setDay(days);
      setHour(hours);
      setMinute(minutes);
      setSecond(seconds);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <InvitationSection>
      <LangMusic>
        {MobileContext.mobile ? <MusicIcon></MusicIcon> : null}
        <LangIcon></LangIcon>
        {!MobileContext.mobile ? <MusicIcon></MusicIcon> : null}
      </LangMusic>
      <Navigation></Navigation>
      <section className={`heading ${MobileContext.mobile ? 'mobile' : ''}`}>
        {!MobileContext.mobile ? (
          <div className='flower__top__left'>
            <img src={flowerTopLeft} alt='' />
          </div>
        ) : null}
        {!MobileContext.mobile ? (
          <img className='background-img' src={DesktopCover} alt='' />
        ) : (
          <img className='background-img' src={MobileCover} alt='' />
        )}
        <div className='container z-2'>
          <div className='heading__content d-flex justify-content-center align-items-center flex-column'>
            <SubHeadingText
              fontSize={MobileContext.mobile ? '0.875rem' : '1.875rem'}
              text={LangContent.header.title}
              fontWeight={MobileContext.mobile ? 700 : 400}
            ></SubHeadingText>
            <HeadingText
              fontSize={MobileContext.mobile ? '2.5rem' : '7.5rem'}
              fontWeight={700}
              text={'UTI'}
            ></HeadingText>
            <HeadingText
              fontSize={MobileContext.mobile ? '1.25rem' : '5rem'}
              fontWeight={700}
              text={'&'}
            ></HeadingText>
            <HeadingText
              fontWeight={700}
              fontSize={MobileContext.mobile ? '2.5rem' : '7.5rem'}
              text={'FAISAL'}
            ></HeadingText>
            <div className={`${MobileContext.mobile ? 'mt-2' : 'mt-6'}`}>
              <SubHeadingText
                fontSize={MobileContext.mobile ? '0.75rem' : '1.875rem'}
                text={LangContent.header.date}
              ></SubHeadingText>
            </div>
          </div>
        </div>
        {!MobileContext.mobile ? (
          <div className='flower__bottom__right__header'>
            <img src={flowerCombined} alt='' />
          </div>
        ) : (
          <div className='flower-mobile__bottom__header'>
            <img src={mobileHeaderBottomLeft} alt='' />
            <img src={mobileHeaderBottomRight} alt='' />
          </div>
        )}
      </section>
      <section
        className={`inner-content ${MobileContext.mobile ? 'mobile' : ''}`}
      >
        <div className={`logo__uf ${MobileContext.mobile ? 'mobile' : ''}`}>
          <img src={logoUf} alt='' />
        </div>
        <div className='container content-first'>
          <div className={`content ${MobileContext.mobile ? 'mobile' : ''}`}>
            <p>Assalamu ‘alaikum wr. wb.</p>
            <p>{LangContent.innerContent.title}</p>
          </div>
          <div
            className={`content ${MobileContext.mobile ? 'mobile' : 'mt-5'} `}
          >
            <p>{LangContent.innerContent.body}</p>
          </div>
        </div>
        <div
          className={`container people-photo ${
            MobileContext.mobile ? 'mobile' : ''
          }`}
        >
          <div
            className={`d-flex justify-content-center align-items-center ${
              MobileContext.mobile ? 'flex-column' : 'flex-row'
            }`}
          >
            <img src={utiPhoto} alt='' />
            {MobileContext.mobile ? (
              <div className='poeple-description-mobile row row-cols-3'>
                <div className='col-5 text-end'>
                  <Paragraph
                    fontSize={'1.25rem'}
                    text='Rizky Ayu Ryani Putri'
                  />
                  <Paragraph
                    fontSize={'0.75rem'}
                    text={LangContent.innerContent.womanDesc}
                  />
                </div>
                <div className='col-2 d-flex flex-column justify-content-center text-center'>
                  &
                </div>
                <div className='col-5 d-flex flex-column justify-content-end text-left'>
                  <Paragraph fontSize={'1.25rem'} text='Faishal Arif' />
                  <Paragraph
                    fontSize={'0.75rem'}
                    text={LangContent.innerContent.manDesc}
                  />
                </div>
              </div>
            ) : null}
            <img src={faishalPhoto} alt='' />
          </div>
        </div>
        {!MobileContext.mobile ? (
          <div className={`container-fluid people-description`}>
            <div className={`row row-cols-3`}>
              <div className='col-5 text-end'>
                <HeadingText fontSize='3.75rem' text='Rizky Ayu Ryani Putri' />
                <div className='w-50 mx-50'>
                  <SubHeadingText
                    fontSize='1.875rem'
                    text={LangContent.innerContent.womanDesc}
                  ></SubHeadingText>
                </div>
              </div>
              <div className='col-2 text-center'>
                <HeadingText text='&' />
              </div>
              <div className='col-5'>
                <HeadingText fontSize='3.75rem' text='Faishal Arif' />
                <div className='w-50'>
                  <SubHeadingText
                    fontSize='1.875rem'
                    text={LangContent.innerContent.manDesc}
                  ></SubHeadingText>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className='container content-second'>
          {' '}
          <div
            className={`content ${MobileContext.mobile ? 'mobile' : 'mt-5'} `}
          >
            <p>{LangContent.innerContent.footerBody}</p>
          </div>
        </div>
      </section>
      <section className={`separator ${MobileContext.mobile ? 'mobile' : ''}`}>
        {!MobileContext.mobile ? (
          <div className='flower__separator'>
            <img src={flowerSeparator} alt='' />
          </div>
        ) : null}
        <div className='container'>
          <div className='d-flex justify-content-center'>
            {' '}
            <LandingSeparator
              height={`${MobileContext.mobile ? '5rem' : '20.5rem'}`}
              borderColor='#000000'
            />
          </div>
        </div>
      </section>
      <section className='story'>
        {!MobileContext.mobile ? (
          <div className='flower__story'>
            <img src={flowerStory} alt='' />
          </div>
        ) : (
          <div className='flower-mobile__story'>
            <img src={mobileStoryLeft} alt='' />
            <img src={mobileStoryRight} alt='' />
          </div>
        )}
        <div className='story__title d-flex justify-content-center flex-column text-center'>
          <HeadingText
            fontWeight={700}
            fontSize={`${MobileContext.mobile ? '1.25rem' : '3.75rem'}`}
            text={LangContent.story.title}
          />
          <div className='w-50 mx-auto'>
            <SubHeadingText
              fontSize={`${MobileContext.mobile ? '0.75rem' : '1.875rem'}`}
              text={LangContent.story.subtitle}
            />
          </div>
        </div>
        <div className='container-fluid'>
          <div
            className={`story__content ${MobileContext.mobile ? 'mobile' : ''}`}
          >
            <div
              className={`story__content__first ${
                MobileContext.mobile ? 'mobile' : ''
              }`}
            >
              {!MobileContext.mobile ? null : (
                <div className='flower-mobile__story__second'>
                  <img src={mobileStoryLeft} alt='' />
                  <img src={mobileStoryRight} alt='' />
                </div>
              )}
              <Paragraph
                fontSize={MobileContext.mobile ? '0.75rem' : '1.875rem'}
                text={LangContent.story.p1}
              />
              {MobileContext.mobile ? (
                <img src={mobileLoveStory1} alt='' />
              ) : null}
              <Paragraph
                fontSize={MobileContext.mobile ? '0.75rem' : '1.875rem'}
                text={LangContent.story.p2}
              />
              <Paragraph
                fontSize={MobileContext.mobile ? '0.75rem' : '1.875rem'}
                text={LangContent.story.p3}
              />
              <Paragraph
                fontSize={MobileContext.mobile ? '0.75rem' : '1.875rem'}
                text={LangContent.story.p4}
              />
              <Paragraph
                fontSize={MobileContext.mobile ? '0.75rem' : '1.875rem'}
                text={LangContent.story.p5}
              />
              {!MobileContext.mobile ? (
                <div className='story__content__first__end'>
                  <img src={loveStory2} alt='' />
                  <div className='d-flex justify-content-end'>
                    {' '}
                    <LandingSeparator height='20.5rem' borderColor='#000000' />
                  </div>
                </div>
              ) : null}
            </div>
            <div
              className={`story__content__second ${
                MobileContext.mobile ? 'mobile' : ''
              }`}
            >
              {MobileContext.mobile ? (
                <img src={mobileLoveStory2} alt='' />
              ) : null}

              {!MobileContext.mobile ? <img src={loveStory1} alt='' /> : null}
              <Paragraph
                fontSize={MobileContext.mobile ? '0.75rem' : '1.875rem'}
                text={LangContent.story.p6}
              />
              <Paragraph
                fontSize={MobileContext.mobile ? '0.75rem' : '1.875rem'}
                text={LangContent.story.p7}
              />
              <Paragraph
                fontSize={MobileContext.mobile ? '0.75rem' : '1.875rem'}
                text={LangContent.story.p8}
              />
            </div>
          </div>
        </div>
      </section>
      <section className='date'>
        {!MobileContext.mobile ? (
          <div className='flower__date d-flex justify-content-between'>
            <img src={flowerDateLeft} alt='' />
            <img src={flowerDateRight} alt='' />
          </div>
        ) : (
          <>
            <div className='flower-mobile__date__right d-flex justify-content-end'>
              <img src={mobileDateRight} alt='' />
            </div>
            <div className='flower-mobile__date__left d-flex justify-content-start'>
              <img src={mobileDateLeft} alt='' />
            </div>
          </>
        )}
        <div className='container'>
          <div className='d-flex justify-content-center flex-column text-center'>
            <HeadingText
              fontSize={MobileContext.mobile ? '1.25rem' : '3.75rem'}
              text={LangContent.date.title}
              fontWeight={MobileContext.mobile ? 700 : 400}
            />
          </div>
          <div className='mt-4 d-flex justify-content-center'>
            {' '}
            <LandingSeparator
              height={MobileContext.mobile ? '4rem' : '10.5rem'}
              borderColor='#000000'
            />
          </div>
          <div className='mt-4 d-flex justify-content-center'>
            <HeadingText
              fontSize={MobileContext.mobile ? '3.175rem' : '9.375rem'}
              text='28.01.2023'
            />
          </div>
          <div className='mt-4 d-flex justify-content-center'>
            <LandingSeparator
              height={MobileContext.mobile ? '4rem' : '10.5rem'}
              borderColor='#000000'
            />{' '}
          </div>{' '}
          <div
            className={`date__place mt-4 d-flex justify-content-center text-center ${
              MobileContext.mobile ? 'flex-column mobile' : 'flex-row'
            }`}
          >
            <div>
              <Paragraph
                fontSize={MobileContext.mobile ? '0.9375rem' : '2.5rem'}
                text={LangContent.date.session1}
              />
              <Paragraph
                fontSize={MobileContext.mobile ? '0.9375rem' : '2.5rem'}
                text='07.00-10.00 WIB'
              />
            </div>
            <div>
              <Paragraph
                fontSize={MobileContext.mobile ? '0.9375rem' : '2.5rem'}
                text={LangContent.date.session2}
              />
              <Paragraph
                fontSize={MobileContext.mobile ? '0.9375rem' : '2.5rem'}
                text='11.00 - 14.00 WIB'
              />
            </div>
          </div>
        </div>{' '}
      </section>
      <section className={`countdown ${MobileContext.mobile ? 'mobile' : ''}`}>
        <div className='container-fluid countdown__container'>
          <div className='d-flex justify-content-center text-center'>
            {' '}
            <img className='background-img' src={countdownImg} alt='' />
            <div className='countdown__container__counter'>
              <SubHeadingText
                fontSize='3.125vw'
                text={LangContent.countdown.title}
              />
              <div className='countdown__container__counter__timer'>
                <div>
                  <Paragraph fontSize='9.375vw' text={`${day}`} />
                  <Paragraph
                    fontSize='3.125vw'
                    text={LangContent.countdown.day}
                  />
                </div>
                <div>
                  <Paragraph fontSize='9.375vw' text={`${hour}`} />
                  <Paragraph
                    fontSize='3.125vw'
                    text={LangContent.countdown.hour}
                  />
                </div>
                <div>
                  <Paragraph fontSize='9.375vw' text={`${minute}`} />
                  <Paragraph
                    fontSize='3.125vw'
                    text={LangContent.countdown.minute}
                  />
                </div>
                <div>
                  <Paragraph fontSize='9.375vw' text={`${second}`} />
                  <Paragraph
                    fontSize='3.125vw'
                    text={LangContent.countdown.second}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`map ${MobileContext.mobile ? 'mobile' : ''}`}>
        {!MobileContext.mobile ? (
          <div className='flower__map__left'>
            <img src={flowerMapLeft} alt='' />
          </div>
        ) : null}
        <div className='container'>
          <div
            className={`map__content d-flex justify-content-center text-center ${
              MobileContext.mobile ? 'flex-column mobile' : 'flex-row'
            }`}
          >
            <div
              className={`map__content__detail ${
                MobileContext.mobile ? 'mobile' : ''
              }`}
            >
              <HeadingText
                fontSize={MobileContext.mobile ? '0.875rem' : '2.5rem'}
                text={LangContent.map.title}
              />
              <SubHeadingText
                fontSize={MobileContext.mobile ? '1.25rem' : '3.126rem'}
                text='Wisma Bungsuna Dewi'
                fontWeight={MobileContext.mobile ? 700 : 400}
              />
              <Paragraph
                fontSize={MobileContext.mobile ? '0.75rem' : '1.875rem'}
                text='Jl. Ibrahim Adjie No.13, Sekejati, Kec. Buahbatu, Kota Bandung, Jawa Barat'
              />
              {!MobileContext.mobile ? (
                <button onClick={openLocation}>{LangContent.map.button}</button>
              ) : null}
            </div>
            <div className='map__content__iframe'>
              <iframe
                title='map'
                id='gmap_canvas'
                src='https://maps.google.com/maps?q=Wisma%20Bungsuna%20Dewi&t=&z=13&ie=UTF8&iwloc=&output=embed'
              ></iframe>
              <div
                className={`flower__map ${
                  MobileContext.mobile ? 'mobile' : ''
                }`}
              >
                <img src={flowerMap} alt='' />
              </div>
            </div>
            {MobileContext.mobile ? (
              <button onClick={openLocation}>{LangContent.map.button}</button>
            ) : null}
          </div>
        </div>
      </section>
      <section className='rsvp'>
        {MobileContext.mobile ? (
          <div className='flower-mobile__rsvp d-flex justify-content-start'>
            <img src={mobileRsvpLeft} alt='' />
          </div>
        ) : null}
        <div className='container'>
          <div
            className={`rsvp__content d-flex justify-content-center flex-column text-center ${
              MobileContext.mobile ? 'mobile' : ''
            }`}
          >
            <div
              className={`rsvp__title ${MobileContext.mobile ? 'mobile' : ''}`}
            >
              <HeadingText
                fontSize={`${MobileContext.mobile ? '1.25rem' : '3.75rem'}`}
                fontWeight={MobileContext.mobile ? 700 : 400}
                text={LangContent.rsvp.title}
              />
              <Paragraph
                fontSize={`${MobileContext.mobile ? '0.75rem' : '1.875rem'}`}
                text={LangContent.rsvp.subtitle}
              />
            </div>
            <div
              className={`rsvp__content__form ${
                MobileContext.mobile ? 'mobile' : ''
              }`}
            >
              <form className='d-flex justify-content-center flex-column'>
                <div className='form-group'>
                  <input
                    type='text'
                    id='name'
                    placeholder={LangContent.rsvp.inputName}
                    value={guest.fullname}
                    readOnly
                    disabled
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='address'
                    id='address'
                    placeholder={LangContent.rsvp.inputAddress}
                    defaultValue={guest.address}
                    required
                  />
                </div>
                <div className='form-group'>
                  <select name='presence' id='sendgift' required>
                    <option value=''>{LangContent.rsvp.selectAddress}</option>
                    <option value='sendgift'>
                      {LangContent.rsvp.selectOption1}
                    </option>
                    <option value='sendgift'>
                      {LangContent.rsvp.selectOption2}
                    </option>
                  </select>
                </div>
                <div className='form-group btn-container'>
                  <button type='submit' className='btn-submit'>
                    {LangContent.rsvp.button}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`health-protocol ${MobileContext.mobile ? 'mobile' : ''}`}
      >
        <div className='container'>
          <div className='health-protocol__content d-flex justify-content-center flex-column text-center'>
            <div className='health-protocol__title'>
              <HeadingText
                fontSize={`${MobileContext.mobile ? '1.25rem' : '3.75rem'}`}
                text={LangContent.healthProtocol.title}
              />
              <Paragraph
                fontSize={`${MobileContext.mobile ? '0.75rem' : '1.875rem'}`}
                text={LangContent.healthProtocol.subtitle}
              />
            </div>
            <div className='health-protocol__content__img row row-cols-3'>
              <div className='health-protocol__content__item col-4'>
                <img src={protocolLogo1} alt='' />
                <Paragraph
                  fontSize={`${MobileContext.mobile ? '0.75rem' : '1.875rem'}`}
                  text={LangContent.healthProtocol.p1}
                />
              </div>{' '}
              <div className='health-protocol__content__item col-4'>
                <img src={protocolLogo2} alt='' />
                <Paragraph
                  fontSize={`${MobileContext.mobile ? '0.75rem' : '1.875rem'}`}
                  text={LangContent.healthProtocol.p2}
                />
              </div>{' '}
              <div className='health-protocol__content__item col-4'>
                <img src={protocolLogo3} alt='' />
                <Paragraph
                  fontSize={`${MobileContext.mobile ? '0.75rem' : '1.875rem'}`}
                  text={LangContent.healthProtocol.p3}
                />
              </div>{' '}
            </div>
          </div>
        </div>
      </section>
      <section className={`wedding-gift ${MobileContext.mobile && 'mobile'}`}>
        <div className='container'>
          <div className='wedding-gift__content d-flex justify-content-center flex-column text-center'>
            <div className='wedding-gift__title'>
              <HeadingText
                fontSize={`${MobileContext.mobile ? '1.25rem' : '3.75rem'}`}
                fontWeight={MobileContext.mobile ? 700 : 400}
                text={LangContent.weddingGift.title}
              />
              <Paragraph
                fontSize={`${MobileContext.mobile ? '0.75rem' : '1.875rem'}`}
                text={LangContent.weddingGift.subtitle}
              />
            </div>
            <div className='wedding-gift__content__body'>
              <div className='wedding-gift__content__title row row-cols-3'>
                <div className='col-5'>
                  <Paragraph
                    fontSize={` ${
                      MobileContext.mobile ? '0.75rem' : '1.5625rem'
                    }`}
                    fontWeight={700}
                    text={LangContent.weddingGift.p1}
                  />
                </div>
                <div className='col-2'>
                  {' '}
                  <Paragraph
                    fontSize={` ${
                      MobileContext.mobile ? '0.75rem' : '1.5625rem'
                    }`}
                    fontWeight={700}
                    text={`${LangContent.weddingGift.p2}`}
                  />
                </div>{' '}
                <div className='col-5'>
                  <Paragraph
                    fontSize={` ${
                      MobileContext.mobile ? '0.75rem' : '1.5625rem'
                    }`}
                    fontWeight={700}
                    text={LangContent.weddingGift.p3}
                  />
                </div>
              </div>
              <div className='wedding-gift__content__body__account row row-cols-2'>
                <div className='col-6'>
                  <div className='wedding-gift__content__body__account__container col-12 d-flex justify-content-center flex-column'>
                    <div className='wedding-gift__content__body__account__bank row row-cols-2'>
                      <div className='col-3 d-flex align-items-center justify-content-end'>
                        <img
                          className='img-mandiri-logo'
                          src={mandiriLogo}
                          alt=''
                        />
                      </div>
                      <div className='col-9 text-start'>
                        <Paragraph
                          fontSize={` ${
                            MobileContext.mobile ? '0.75rem' : '1.5625rem'
                          }`}
                          text={'BANK MANDIRI'}
                        />
                        <Span
                          fontSize={` ${
                            MobileContext.mobile ? '0.75rem' : '1.5625rem'
                          }`}
                          text={`${LangContent.weddingGift.pAccNumber} : 1230007875349`}
                        />
                        <span
                          id='mandiri-copy'
                          className='copy-icon'
                          onClick={handleCopy}
                        >
                          <img src={copyIcon} alt='' />
                        </span>
                        <Paragraph
                          fontSize={` ${
                            MobileContext.mobile ? '0.75rem' : '1.5625rem'
                          }`}
                          text={'a/n Rizky Ayu Ryani Putri'}
                        />
                      </div>
                    </div>
                    <div className='wedding-gift__content__body__account__bank row row-cols-2'>
                      <div className='col-3 d-flex align-items-center justify-content-end'>
                        <img className='img-bni-logo' src={bniLogo} alt='' />
                      </div>
                      <div className='col-9 text-start'>
                        <Paragraph fontSize={'1.5625rem'} text={'BNI'} />
                        <Span
                          fontSize={` ${
                            MobileContext.mobile ? '0.75rem' : '1.5625rem'
                          }`}
                          text={`${LangContent.weddingGift.pAccNumber} : 1430292508`}
                        ></Span>
                        <span
                          onClick={handleCopy}
                          id='bni-copy'
                          className='copy-icon'
                        >
                          <img src={copyIcon} alt='' />
                        </span>
                        <Paragraph
                          fontSize={` ${
                            MobileContext.mobile ? '0.75rem' : '1.5625rem'
                          }`}
                          text={'a/n Rizky Ayu Ryani Putri'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='wedding-gift__content__body__account__container border__cstm col-12 d-flex justify-content-center flex-column'>
                    <div className='wedding-gift__content__body__account__address row row-cols-2'>
                      <div className='col-4 d-flex align-items-center justify-content-end'>
                        <img
                          className='img-mandiri-logo'
                          src={carLogo}
                          alt=''
                        />
                      </div>
                      <div className='col-8 text-start'>
                        <button>Shipping Address</button>
                        <div className='note'>
                          <Paragraph
                            fontSize={` ${
                              MobileContext.mobile ? '0.75rem' : '1.5625rem'
                            }`}
                            text={LangContent.weddingGift.pShippingDesc}
                          />
                        </div>
                        <Paragraph
                          fontSize={` ${
                            MobileContext.mobile ? '0.75rem' : '1.5625rem'
                          }`}
                          text={LangContent.weddingGift.pShippingDesc2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`message ${MobileContext.mobile && 'mobile'}`}>
        {!MobileContext.mobile ? (
          <div className='flower__message d-flex justify-content-between'>
            <img src={flowerMessageLeft} alt='' />
            <img src={flowerMessageRight} alt='' />
          </div>
        ) : (
          <div className='flower-mobile__message d-flex justify-content-between'>
            <img src={mobileStoryLeft} alt='' />
            <img src={mobileStoryRight} alt='' />
          </div>
        )}
        <div className='container'>
          <div className='message__title d-flex justify-content-center flex-column text-center'>
            <HeadingText
              fontSize={`${MobileContext.mobile ? '1.25rem' : '3.75rem'}`}
              fontWeight={MobileContext.mobile ? 700 : 400}
              text={LangContent.message.title}
            />
            <Paragraph
              fontSize={` ${MobileContext.mobile ? '0.75rem' : '1.875rem'}`}
              text={LangContent.message.subtitle}
            />
          </div>
          <div
            className={`message__container d-flex justify-content-center ${
              MobileContext.mobile ? 'flex-column' : 'flex-row'
            }`}
          >
            <div className='message__form'>
              <form action=''>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    placeholder={LangContent.message.inputName}
                  />
                  <textarea
                    name='message'
                    id=''
                    className='w-100'
                    rows={5}
                    placeholder={LangContent.message.inputMessage}
                  ></textarea>
                </div>
                <button>{LangContent.message.button}</button>
              </form>
            </div>
            <div className='message__list d-flex flex-column'>
              <div className='msg d-flex flex-column'>
                <div className='msg__title'>
                  <Span text='Nama Pengirim' />
                </div>
                <div className='msg__body'>
                  <Span text='Pesan dari pengirim, selamat ya semoga sakinah mawaddah warrahmah aamiin cihuy maaf kalo kepanjangan.' />
                </div>
                <div className='msg__date'>
                  <Span text='27 May 2022, 12:05' />
                </div>
              </div>
              <div className='msg d-flex flex-column'>
                <div className='msg__title'>
                  <Span text='Nama Pengirim' />
                </div>
                <div className='msg__body'>
                  <Span text='Pesan dari pengirim, selamat ya semoga sakinah mawaddah warrahmah aamiin cihuy maaf kalo kepanjangan.' />
                </div>
                <div className='msg__date'>
                  <Span text='27 May 2022, 12:05' />
                </div>
              </div>
              <div className='msg d-flex flex-column'>
                <div className='msg__title'>
                  <Span text='Nama Pengirim' />
                </div>
                <div className='msg__body'>
                  <Span text='Pesan dari pengirim, selamat ya semoga sakinah mawaddah warrahmah aamiin cihuy maaf kalo kepanjangan.' />
                </div>
                <div className='msg__date'>
                  <Span text='27 May 2022, 12:05' />
                </div>
              </div>
              <div className='msg d-flex flex-column'>
                <div className='msg__title'>
                  <Span text='Nama Pengirim' />
                </div>
                <div className='msg__body'>
                  <Span text='Pesan dari pengirim, selamat ya semoga sakinah mawaddah warrahmah aamiin cihuy maaf kalo kepanjangan.' />
                </div>
                <div className='msg__date'>
                  <Span text='27 May 2022, 12:05' />
                </div>
              </div>
              <div className='msg d-flex flex-column'>
                <div className='msg__title'>
                  <Span text='Nama Pengirim' />
                </div>
                <div className='msg__body'>
                  <Span text='Pesan dari pengirim, selamat ya semoga sakinah mawaddah warrahmah aamiin cihuy maaf kalo kepanjangan.' />
                </div>
                <div className='msg__date'>
                  <Span text='27 May 2022, 12:05' />
                </div>
              </div>
              <div className='msg d-flex flex-column'>
                <div className='msg__title'>
                  <Span text='Nama Pengirim' />
                </div>
                <div className='msg__body'>
                  <Span text='Pesan dari pengirim, selamat ya semoga sakinah mawaddah warrahmah aamiin cihuy maaf kalo kepanjangan.' />
                </div>
                <div className='msg__date'>
                  <Span text='27 May 2022, 12:05' />
                </div>
              </div>
              <div className='msg d-flex flex-column'>
                <div className='msg__title'>
                  <Span text='Nama Pengirim' />
                </div>
                <div className='msg__body'>
                  <Span text='Pesan dari pengirim, selamat ya semoga sakinah mawaddah warrahmah aamiin cihuy maaf kalo kepanjangan.' />
                </div>
                <div className='msg__date'>
                  <Span text='27 May 2022, 12:05' />
                </div>
              </div>
              <div className='msg d-flex flex-column'>
                <div className='msg__title'>
                  <Span text='Nama Pengirim' />
                </div>
                <div className='msg__body'>
                  <Span text='Pesan dari pengirim, selamat ya semoga sakinah mawaddah warrahmah aamiin cihuy maaf kalo kepanjangan.' />
                </div>
                <div className='msg__date'>
                  <Span text='27 May 2022, 12:05' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`surah ${MobileContext.mobile && 'mobile'}`}>
        <div className='container-fluid surah__container'>
          <div className='surah__text d-flex position-absolute flex-column'>
            <Paragraph
              fontSize={MobileContext.mobile ? '0.75rem' : '1.5vw'}
              text={LangContent.surah.title}
            />
            <Paragraph
              fontSize={MobileContext.mobile ? '0.75rem' : '1.5vw'}
              text={LangContent.surah.subtitle}
            />
          </div>
          <img
            className='surah__container__background'
            src={surahBackground}
            alt=''
          />
        </div>
      </section>
      <footer className={`footer ${MobileContext.mobile && 'mobile'}`}>
        <div className='footer__content d-flex justify-content-center'>
          <span>Powered By</span>
          <span
            onClick={() => {
              window.location.href = 'https://linkedin.com/in/ridaffa';
            }}
          >
            @Ridaffa
          </span>
          <span>KimalLogo</span>
        </div>
        <div className='flower__footer d-flex justify-content-between'>
          <img src={flowerBottomLeft} alt='' />
          <img src={flowerBottomRight} alt='' />
        </div>
      </footer>
      <ToastContainer />
    </InvitationSection>
  );
}
