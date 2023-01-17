import InvitationSection from '../../components/InvitationSection';
import LangIcon from '../../components/LangIcon';
import LangMusic from '../../components/LangMusic';
import MusicIcon from '../../components/MusicIcon';
import Navigation from '../../components/Navigation';
import { Fade } from 'react-awesome-reveal';

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

import 'react-h5-audio-player/lib/styles.css';

import { IGuest, IRsvp } from '../../interfaces/GuestInterface';
import { IMessage, IMessageRequest } from '../../interfaces/MessageInterface';
import {
  IPagination,
  IPaginationRes,
} from '../../interfaces/PaginationInterface';

export default function InvitationPage() {
  const [guest, setGuest] = useState<IGuest>({
    id: 0,
    uuid: '',
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    title: '',
    visit: false,
  });
  const [reqPagination, setReqPagination] = useState<IPagination>({
    page: 0,
    size: 10,
  });
  const [message, setMessage] = useState<IMessageRequest>({
    message: '',
    guest_uuid: guest.uuid,
    display_name: '',
  });
  const [messagesPag, setMessagesPag] = useState<IPaginationRes>(
    {} as IPaginationRes
  );
  const [messages, setMessages] = useState<IMessage[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const guest = localStorage?.getItem('guest');
    if (guest) {
      fetch(`${process.env.REACT_APP_BE_URL}guests/${JSON.parse(guest)?.uuid}`)
        .then((rs) => {
          if (!rs.ok) {
            toast.error('error');
            localStorage.removeItem('guest');
            navigate('/');
            return;
          }
          rs.json().then((data) => {
            setGuest(data.data);
            setMessage({ ...message, guest_uuid: data.data.uuid });
            localStorage.setItem('guest', JSON.stringify(data.data));
          });
        })
        .catch(() => {
          toast.error('error');
          localStorage.removeItem('guest');
          navigate('/');
        });
    } else {
      navigate('/');
    }
  }, []);
  const [rsvp, setRsvp] = useState({} as IRsvp);
  const MobileContext = MobileConsumer();
  const LangContext = LangConsumer();
  const LangContent = LangContext.lang;
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const handleInputMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage({ ...message, message: e.target.value });
  };
  const handleInputMessageName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({ ...message, display_name: e.target.value });
  };
  const fetchMessages = () => {
    fetch(
      `${process.env.REACT_APP_BE_URL}messages/search?page=${reqPagination.page}&size=${reqPagination.size}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((rs) => {
        if (!rs.ok) {
          toast.error('error');
          return;
        }
        rs.json().then((data) => {
          setMessages(data.data.items);
          setMessagesPag(data.data);
        });
      })
      .catch(() => {
        toast.error('error');
      });
  };
  useEffect(() => {
    fetchMessages();
  }, [reqPagination]);

  const handleChangePage = (page: number) => {
    setReqPagination({ ...reqPagination, page });
  };

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BE_URL}messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
      .then((res) => {
        if (!res.ok) {
          toast.error('error sending message');
        }
        return res.json();
      })
      .then(() => {
        toast.success('success');
        fetchMessages();
      })
      .catch(() => {
        toast.error('error sending message');
      });
  };
  const handleRsvp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BE_URL}guests/${guest.uuid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rsvp),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data === 'updated') {
          toast.success('RSVP Success');
        } else {
          toast.error('RSVP Failed');
        }
      })
      .catch(() => {
        toast.error('RSVP Failed');
      });
  };
  const handleInputRsvp = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.currentTarget.value) {
      case '1':
        setRsvp({ ...rsvp, visit: true });
        return;
      default:
        setRsvp({ ...rsvp, visit: false });
    }
  };
  const handleInputRsvpAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRsvp({ ...rsvp, address: e.currentTarget.value });
  };
  const handleCopy = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    toast.info('Copied to clipboard');
    switch (e.currentTarget.id) {
      case 'mandiri-copy':
        navigator.clipboard.writeText('1230007875349');
        break;
      case 'bni-copy':
        navigator.clipboard.writeText('1430292508');
        break;
      case 'address-copy':
        navigator.clipboard.writeText(
          'Jl. Setia Budi III No.10, RW.3, Kuningan, Setia Budi, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12910'
        );
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
      <Navigation landingPage={false}></Navigation>
      <section
        id='heading'
        className={`heading ${MobileContext.mobile ? 'mobile' : ''}`}
      >
        {!MobileContext.mobile ? (
          <div className='flower__top__left'>
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/flower-top-left.png`}
              alt=''
            />
          </div>
        ) : null}
        {!MobileContext.mobile ? (
          <img
            className='background-img'
            src={`${process.env.REACT_APP_FE_CDN}images/desktop-cover-invitation.png`}
            alt=''
          />
        ) : (
          <img
            className='background-img'
            src={`${process.env.REACT_APP_FE_CDN}images/mobile-cover.jpeg`}
            alt=''
          />
        )}
        <div className='container z-2'>
          <div className='heading__content d-flex justify-content-center align-items-center flex-column'>
            <Fade>
              {' '}
              <SubHeadingText
                fontSize={MobileContext.mobile ? '1rem' : '1.563vw'}
                text={LangContent.header.title}
                fontWeight={MobileContext.mobile ? 700 : 400}
              ></SubHeadingText>
            </Fade>
            <Fade>
              <HeadingText
                fontSize={MobileContext.mobile ? '1.25rem' : '6.25vw'}
                fontWeight={700}
                text={'UTI'}
              ></HeadingText>
            </Fade>
            <Fade>
              {' '}
              <HeadingText
                fontSize={MobileContext.mobile ? '1.25rem' : '4.167vw'}
                fontWeight={700}
                text={'&'}
              ></HeadingText>
            </Fade>

            <Fade>
              {' '}
              <HeadingText
                fontWeight={700}
                fontSize={MobileContext.mobile ? '1.25rem' : '6.25vw'}
                text={'FAISHAL'}
              ></HeadingText>
            </Fade>
            <div className={`${MobileContext.mobile ? 'mt-2' : 'mt-6'}`}>
              <SubHeadingText
                fontSize={MobileContext.mobile ? '0.75rem' : '1.563vw'}
                text={LangContent.header.date}
              ></SubHeadingText>
            </div>
          </div>
        </div>

        {!MobileContext.mobile ? (
          <div className='flower__bottom__right__header'>
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/flower-combined.png`}
              alt=''
            />
          </div>
        ) : (
          <div className='flower-mobile__bottom__header'>
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/mobile-header-bottom-left.png`}
              alt=''
            />
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/mobile-header-bottom-right.png`}
              alt=''
            />
          </div>
        )}
      </section>
      <section
        id='content'
        className={`inner-content ${MobileContext.mobile ? 'mobile' : ''}`}
      >
        <div className={`logo__uf ${MobileContext.mobile ? 'mobile' : ''}`}>
          <img
            src={`${process.env.REACT_APP_FE_CDN}images/landing-logo-mobile.png`}
            alt=''
          />
        </div>
        <Fade key={LangContent.innerContent.title}>
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
        </Fade>
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
            <Fade direction='left'>
              {' '}
              <img
                src={`${process.env.REACT_APP_FE_CDN}images/Uti.png`}
                alt=''
              />
            </Fade>
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
            <Fade direction='right'>
              {' '}
              <img
                src={`${process.env.REACT_APP_FE_CDN}images/Faishal.png`}
                alt=''
              />
            </Fade>
          </div>
        </div>
        {!MobileContext.mobile ? (
          <div className={`container-fluid people-description`}>
            <div className={`row row-cols-3`}>
              <div className='col-5 text-end'>
                <HeadingText fontSize='3.125vw' text='Rizky Ayu Ryani Putri' />
                <div className='w-50 mx-50'>
                  <SubHeadingText
                    fontSize='1.563vw'
                    text={LangContent.innerContent.womanDesc}
                  ></SubHeadingText>
                </div>
              </div>
              <div className='col-2 text-center'>
                <HeadingText text='&' />
              </div>
              <div className='col-5'>
                <HeadingText fontSize='3.125rem' text='Faishal Arif' />
                <div className='w-75'>
                  <SubHeadingText
                    fontSize='1.563vw'
                    text={LangContent.innerContent.manDesc}
                  ></SubHeadingText>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
      <section className={`separator ${MobileContext.mobile ? 'mobile' : ''}`}>
        {!MobileContext.mobile ? (
          <div className='flower__separator'>
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/flower-separator.png`}
              alt=''
            />
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
      <section id='story' className='story'>
        {!MobileContext.mobile ? (
          <div className='flower__story'>
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/flower-story.png`}
              alt=''
            />
          </div>
        ) : (
          <div className='flower-mobile__story'>
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/mobile-story-left.png`}
              alt=''
            />
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/mobile-story-right.png`}
              alt=''
            />
          </div>
        )}
        <div className='container'>
          <div
            className={`story__title d-flex justify-content-center flex-column text-center ${
              MobileContext.mobile ? 'mobile' : ''
            }`}
          >
            <Fade direction='left'>
              <HeadingText
                fontWeight={700}
                fontSize={`${MobileContext.mobile ? '1.25rem' : '3.125vw'}`}
                text={LangContent.story.title}
              />
              <div className='mx-auto'>
                <SubHeadingText
                  fontSize={`${MobileContext.mobile ? '0.75rem' : '1.563vw'}`}
                  text={LangContent.story.subtitle}
                />
              </div>
            </Fade>
          </div>
        </div>
        <div className='container-fluid'>
          <div
            className={`story__content ${MobileContext.mobile ? 'mobile' : ''}`}
          >
            {!MobileContext.mobile ? null : (
              <div className='flower-mobile__story__second'>
                <img
                  src={`${process.env.REACT_APP_FE_CDN}images/mobile-story-left.png`}
                  alt=''
                />
                <img
                  src={`${process.env.REACT_APP_FE_CDN}images/mobile-story-right.png`}
                  alt=''
                />
              </div>
            )}
            <div
              className={`story__content__first ${
                MobileContext.mobile ? 'mobile' : ''
              }`}
            >
              <Fade direction='left'>
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.75rem' : '1.563vw'}
                  text={LangContent.story.p1}
                />
                {MobileContext.mobile ? (
                  <img
                    src={`${process.env.REACT_APP_FE_CDN}images/mobile-love-story-1.png`}
                    alt=''
                  />
                ) : null}
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.75rem' : '1.563vw'}
                  text={LangContent.story.p2}
                />
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.75rem' : '1.563vw'}
                  text={LangContent.story.p3}
                />
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.75rem' : '1.563vw'}
                  text={LangContent.story.p4}
                />
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.75rem' : '1.563vw'}
                  text={LangContent.story.p5}
                />
              </Fade>
              {!MobileContext.mobile ? (
                <Fade direction='left'>
                  <div className='story__content__first__end'>
                    <img
                      src={`${process.env.REACT_APP_FE_CDN}images/love-story-2.png`}
                      alt=''
                    />
                    <div className='d-flex justify-content-end'>
                      {' '}
                      <LandingSeparator
                        height='20.5rem'
                        borderColor='#000000'
                      />
                    </div>
                  </div>
                </Fade>
              ) : null}
            </div>
            <div
              className={`story__content__second ${
                MobileContext.mobile ? 'mobile' : ''
              }`}
            >
              {MobileContext.mobile ? (
                <Fade direction='left'>
                  <img
                    src={`${process.env.REACT_APP_FE_CDN}images/mobile-love-story-2.png`}
                    alt=''
                  />
                </Fade>
              ) : null}

              {!MobileContext.mobile ? (
                <Fade direction='right'>
                  <img
                    src={`${process.env.REACT_APP_FE_CDN}images/love-story-1.jpeg`}
                    alt=''
                  />
                </Fade>
              ) : null}
              <Fade direction='right'>
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.75rem' : '1.563vw'}
                  text={LangContent.story.p6}
                />
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.75rem' : '1.563vw'}
                  text={LangContent.story.p7}
                />
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.75rem' : '1.563vw'}
                  text={LangContent.story.p8}
                />
              </Fade>
            </div>
          </div>
        </div>
      </section>
      <section id='date' className='date'>
        {!MobileContext.mobile ? (
          <div className='flower__date d-flex justify-content-between'>
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/flower-date-left.png`}
              alt=''
            />
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/flower-date-right.png`}
              alt=''
            />
          </div>
        ) : (
          <>
            <div className='flower-mobile__date__right d-flex justify-content-end'>
              <img
                src={`${process.env.REACT_APP_FE_CDN}images/mobile-date-right.png`}
                alt=''
              />
            </div>
            <div className='flower-mobile__date__left d-flex justify-content-start'>
              <img
                src={`${process.env.REACT_APP_FE_CDN}images/mobile-date-left.png`}
                alt=''
              />
            </div>
          </>
        )}
        <div className='container'>
          <div className='d-flex justify-content-center flex-column text-center'>
            <Fade direction='left'>
              <HeadingText
                fontSize={MobileContext.mobile ? '1.25rem' : '3.125vw'}
                text={LangContent.date.title}
                fontWeight={MobileContext.mobile ? 700 : 400}
              />
            </Fade>
          </div>
          <div className='mt-4 d-flex justify-content-center'>
            {' '}
            <LandingSeparator
              height={MobileContext.mobile ? '4rem' : '10.5rem'}
              borderColor='#000000'
            />
          </div>
          <div className='mt-4 d-flex justify-content-center'>
            <Fade direction='left'>
              <HeadingText
                fontSize={MobileContext.mobile ? '3.175rem' : '7.813vw'}
                text='28.01.2023'
              />
            </Fade>
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
              <Fade direction='left'>
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.9375rem' : '2.083vw'}
                  text={LangContent.date.session1}
                />
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.9375rem' : '2.083vw'}
                  text='07.00-10.00 WIB'
                />
              </Fade>
            </div>
            <div>
              <Fade direction='left'>
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.9375rem' : '2.083vw'}
                  text={LangContent.date.session2}
                />
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.9375rem' : '2.083vw'}
                  text='11.00 - 14.00 WIB'
                />
              </Fade>
            </div>
          </div>
        </div>{' '}
      </section>
      <section
        id='countdown'
        className={`countdown ${MobileContext.mobile ? 'mobile' : ''}`}
      >
        <div className='container-fluid countdown__container'>
          <Fade>
            <div className='d-flex justify-content-center text-center'>
              {' '}
              <img
                className='background-img'
                src={`${process.env.REACT_APP_FE_CDN}images/countdown.png`}
                alt=''
              />
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
          </Fade>
        </div>
      </section>
      <section
        id='map'
        className={`map ${MobileContext.mobile ? 'mobile' : ''}`}
      >
        {!MobileContext.mobile ? (
          <div className='flower__map__left'>
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/flower-map-left.png`}
              alt=''
            />
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
              <Fade direction='left'>
                <HeadingText
                  fontSize={MobileContext.mobile ? '0.875rem' : '2.083vw'}
                  text={LangContent.map.title}
                />
                <SubHeadingText
                  fontSize={MobileContext.mobile ? '1.25rem' : '3.125vw'}
                  text='Wisma Bungsuna Dewi'
                  fontWeight={MobileContext.mobile ? 700 : 400}
                />
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.75rem' : '1.563vw'}
                  text='Jl. Ibrahim Adjie No.13, Sekejati, Kec. Buahbatu, Kota Bandung, Jawa Barat'
                />
              </Fade>
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
                <img
                  src={`${process.env.REACT_APP_FE_CDN}images/flower-map.png`}
                  alt=''
                />
              </div>
            </div>
            {MobileContext.mobile ? (
              <button onClick={openLocation}>{LangContent.map.button}</button>
            ) : null}
          </div>
        </div>
      </section>
      <section id='rsvp' className='rsvp'>
        {MobileContext.mobile ? (
          <div className='flower-mobile__rsvp d-flex justify-content-start'>
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/mobile-rsvp-left.png`}
              alt=''
            />
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
              <Fade direction='left'>
                <HeadingText
                  fontSize={`${MobileContext.mobile ? '1.25rem' : '3.125vw'}`}
                  fontWeight={MobileContext.mobile ? 700 : 400}
                  text={LangContent.rsvp.title}
                />
                <Paragraph
                  fontSize={`${MobileContext.mobile ? '0.75rem' : '1.563vw'}`}
                  text={LangContent.rsvp.subtitle}
                />
              </Fade>
            </div>
            <div
              className={`rsvp__content__form ${
                MobileContext.mobile ? 'mobile' : ''
              }`}
            >
              <form
                className='d-flex justify-content-center flex-column'
                onSubmit={handleRsvp}
              >
                <div className='form-group'>
                  <input
                    type='text'
                    id='name'
                    placeholder={LangContent.rsvp.inputName}
                    value={guest.fullname}
                    readOnly
                    className='form-control'
                    disabled
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='address'
                    id='address'
                    className='form-control'
                    placeholder={LangContent.rsvp.inputAddress}
                    onChange={handleInputRsvpAddress}
                    defaultValue={guest.address}
                    required
                  />
                </div>
                <div className='form-group'>
                  <select
                    name='presence'
                    id='presence'
                    className='form-control'
                    onChange={handleInputRsvp}
                    required
                  >
                    <option value=''>{LangContent.rsvp.selectAddress}</option>
                    <option value='1'>{LangContent.rsvp.selectOption1}</option>
                    <option value='0'>{LangContent.rsvp.selectOption2}</option>
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
        id='healthProtocol'
        className={`health-protocol ${MobileContext.mobile ? 'mobile' : ''}`}
      >
        <div className='container'>
          <div className='health-protocol__content d-flex justify-content-center flex-column text-center'>
            <div className='health-protocol__title'>
              <Fade direction='left'>
                <HeadingText
                  fontSize={`${MobileContext.mobile ? '1.25rem' : '3.125vw'}`}
                  text={LangContent.healthProtocol.title}
                />
                <Paragraph
                  fontSize={`${MobileContext.mobile ? '0.75rem' : '1.563vw'}`}
                  text={LangContent.healthProtocol.subtitle}
                />
              </Fade>
            </div>
            <Fade direction='up'>
              <div className='health-protocol__content__img row row-cols-3'>
                <div className='health-protocol__content__item col-4'>
                  <img
                    src={`${process.env.REACT_APP_FE_CDN}images/LOGO2.png`}
                    alt=''
                  />
                  <Paragraph
                    fontSize={`${MobileContext.mobile ? '0.75rem' : '1.563vw'}`}
                    text={LangContent.healthProtocol.p1}
                  />
                </div>{' '}
                <div className='health-protocol__content__item col-4'>
                  <img
                    src={`${process.env.REACT_APP_FE_CDN}images/LOGO3.png`}
                    alt=''
                  />
                  <Paragraph
                    fontSize={`${MobileContext.mobile ? '0.75rem' : '1.563vw'}`}
                    text={LangContent.healthProtocol.p2}
                  />
                </div>{' '}
                <div className='health-protocol__content__item col-4'>
                  <img
                    src={`${process.env.REACT_APP_FE_CDN}images/LOGO4.png`}
                    alt=''
                  />
                  <Paragraph
                    fontSize={`${MobileContext.mobile ? '0.75rem' : '1.563vw'}`}
                    text={LangContent.healthProtocol.p3}
                  />
                </div>{' '}
              </div>
            </Fade>
          </div>
        </div>
      </section>
      <section
        id='weddingGift'
        className={`wedding-gift ${MobileContext.mobile && 'mobile'}`}
      >
        <div className='container'>
          <div className='wedding-gift__content d-flex justify-content-center flex-column text-center'>
            <div className='wedding-gift__title'>
              <Fade direction='left'>
                <HeadingText
                  fontSize={`${MobileContext.mobile ? '1.25rem' : '3.125vw'}`}
                  fontWeight={MobileContext.mobile ? 700 : 400}
                  text={LangContent.weddingGift.title}
                />
                <Paragraph
                  fontSize={`${MobileContext.mobile ? '0.75rem' : '1.563vw'}`}
                  text={LangContent.weddingGift.subtitle}
                />
              </Fade>
            </div>
            <div className='wedding-gift__content__body'>
              <div className='wedding-gift__content__title row row-cols-3'>
                <div className='col-5'>
                  <Fade direction='left'>
                    <Paragraph
                      fontSize={` ${
                        MobileContext.mobile ? '0.75rem' : '1.563vw'
                      }`}
                      fontWeight={700}
                      text={LangContent.weddingGift.p1}
                    />
                  </Fade>
                </div>
                <div className='col-2'>
                  {' '}
                  <Fade direction='up'>
                    <Paragraph
                      fontSize={` ${
                        MobileContext.mobile ? '0.75rem' : '1.563vw'
                      }`}
                      fontWeight={700}
                      text={`${LangContent.weddingGift.p2}`}
                    />
                  </Fade>
                </div>{' '}
                <div className='col-5'>
                  <Fade direction='right'>
                    <Paragraph
                      fontSize={` ${
                        MobileContext.mobile ? '0.75rem' : '1.563vw'
                      }`}
                      fontWeight={700}
                      text={LangContent.weddingGift.p3}
                    />
                  </Fade>
                </div>
              </div>
              <div className='wedding-gift__content__body__account row row-cols-2'>
                <div className='col-6'>
                  <div className='wedding-gift__content__body__account__container col-12 d-flex justify-content-center flex-column'>
                    <div className='wedding-gift__content__body__account__bank row row-cols-2'>
                      <div className='col-3 d-flex align-items-center justify-content-end'>
                        <img
                          className='img-mandiri-logo'
                          src={`${process.env.REACT_APP_FE_CDN}images/mandiri.png`}
                          alt=''
                        />
                      </div>
                      <div className='col-9 text-start'>
                        <Fade direction='left'>
                          <Paragraph
                            fontSize={` ${
                              MobileContext.mobile ? '0.75rem' : '1.563vw'
                            }`}
                            text={'BANK MANDIRI'}
                          />
                          <Span
                            fontSize={` ${
                              MobileContext.mobile ? '0.75rem' : '1.563vw'
                            }`}
                            text={`${LangContent.weddingGift.pAccNumber}`}
                          />
                          <div className='d-flex flex-row justify-content-start'>
                            <Span
                              fontSize={` ${
                                MobileContext.mobile ? '0.75rem' : '1.563vw'
                              }`}
                              text={`1230007875349`}
                            />
                            <span
                              id='mandiri-copy'
                              className='copy-icon'
                              onClick={handleCopy}
                            >
                              <img
                                src={`${process.env.REACT_APP_FE_CDN}images/copy.png`}
                                alt=''
                              />
                            </span>
                          </div>
                          <Paragraph
                            fontSize={` ${
                              MobileContext.mobile ? '0.75rem' : '1.563vw'
                            }`}
                            text={'a/n Rizky Ayu Ryani Putri'}
                          />
                        </Fade>
                      </div>
                    </div>
                    <div className='wedding-gift__content__body__account__bank row row-cols-2'>
                      <div className='col-3 d-flex align-items-center justify-content-end'>
                        <img
                          className='img-bni-logo'
                          src={`${process.env.REACT_APP_FE_CDN}images/bni.png`}
                          alt=''
                        />
                      </div>
                      <div className='col-9 text-start'>
                        <Fade direction='left'>
                          <Paragraph
                            fontSize={` ${
                              MobileContext.mobile ? '0.75rem' : '1.563vw'
                            }`}
                            text={'BNI'}
                          />
                          <Span
                            fontSize={` ${
                              MobileContext.mobile ? '0.75rem' : '1.563vw'
                            }`}
                            text={`${LangContent.weddingGift.pAccNumber}`}
                          ></Span>
                          <div className='d-flex flex-row justify-content-start'>
                            <Span
                              fontSize={` ${
                                MobileContext.mobile ? '0.75rem' : '1.563vw'
                              }`}
                              text={`1430292508`}
                            ></Span>
                            <span
                              onClick={handleCopy}
                              id='bni-copy'
                              className='copy-icon'
                            >
                              <img
                                src={`${process.env.REACT_APP_FE_CDN}images/copy.png`}
                                alt=''
                              />
                            </span>
                          </div>

                          <Paragraph
                            fontSize={` ${
                              MobileContext.mobile ? '0.75rem' : '1.563vw'
                            }`}
                            text={'a/n Rizky Ayu Ryani Putri'}
                          />
                        </Fade>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='wedding-gift__content__body__account__container border__cstm col-12 d-flex justify-content-center flex-column'>
                    <Fade direction='right'>
                      <div
                        className={`wedding-gift__content__body__account__address d-flex flex-column`}
                      >
                        <div className='d-flex align-items-center justify-content-center '>
                          <img
                            className='img-car-logo'
                            src={`${process.env.REACT_APP_FE_CDN}images/car.png`}
                            alt=''
                          />
                        </div>
                        <div className='text-start'>
                          <div className='note'>
                            <div className='d-flex justify-content-start'>
                              <Span
                                fontSize={` ${
                                  MobileContext.mobile ? '0.75rem' : '1.563vw'
                                }`}
                                underline={true}
                                text={`Avalon Residence`}
                              ></Span>
                              <span
                                id='address-copy'
                                className='copy-icon'
                                onClick={handleCopy}
                              >
                                <img
                                  src={`${process.env.REACT_APP_FE_CDN}images/copy.png`}
                                  alt=''
                                />
                              </span>
                            </div>

                            <Paragraph
                              fontSize={` ${
                                MobileContext.mobile ? '0.75rem' : '1.563vw'
                              }`}
                              text={`Jl. Setia Budi III No.10, RW.3, Kuningan, Setia Budi, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12910\n\n`}
                            ></Paragraph>

                            <Paragraph
                              fontWeight={700}
                              fontSize={` ${
                                MobileContext.mobile ? '0.75rem' : '1.563vw'
                              }`}
                              text={LangContent.weddingGift.pShippingDesc}
                            />
                          </div>
                          <Paragraph
                            fontSize={` ${
                              MobileContext.mobile ? '0.75rem' : '1.563vw'
                            }`}
                            text={LangContent.weddingGift.pShippingDesc2}
                          />
                        </div>
                      </div>
                    </Fade>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id='message'
        className={`message ${MobileContext.mobile && 'mobile'}`}
      >
        {!MobileContext.mobile ? (
          <div className='flower__message d-flex justify-content-between'>
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/flower-message-left.png`}
              alt=''
            />
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/flower-message-right.png`}
              alt=''
            />
          </div>
        ) : (
          <div className='flower-mobile__message d-flex justify-content-between'>
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/mobile-story-left.png`}
              alt=''
            />
            <img
              src={`${process.env.REACT_APP_FE_CDN}images/mobile-story-right.png`}
              alt=''
            />
          </div>
        )}
        <div className='container'>
          <div className='message__title d-flex justify-content-center flex-column text-center'>
            <Fade direction='left'>
              <HeadingText
                fontSize={`${MobileContext.mobile ? '1.25rem' : '3.125vw'}`}
                fontWeight={MobileContext.mobile ? 700 : 400}
                text={LangContent.message.title}
              />
              <Paragraph
                fontSize={` ${MobileContext.mobile ? '0.75rem' : '1.563vw'}`}
                text={LangContent.message.subtitle}
              />
            </Fade>
          </div>
          <div
            className={`message__container d-flex justify-content-center ${
              MobileContext.mobile ? 'flex-column' : 'flex-row'
            }`}
          >
            <div className='message__form'>
              <form onSubmit={handleSubmitMessage}>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    placeholder={LangContent.message.inputName}
                    onChange={handleInputMessageName}
                  />
                  <textarea
                    name='message'
                    id='message'
                    className='w-100'
                    rows={5}
                    placeholder={LangContent.message.inputMessage}
                    onChange={handleInputMessage}
                  ></textarea>
                </div>
                <button type='submit'>{LangContent.message.button}</button>
              </form>
            </div>
            <div className='d-flex flex-column messages-list'>
              <div className='message__list d-flex flex-column'>
                {messages?.map((message: IMessage, index) => (
                  <div className='msg d-flex flex-column' key={index}>
                    <div className='msg__title'>
                      <Span text={message.display_name} />
                    </div>
                    <div className='msg__body'>
                      <Span text={message.message} />
                    </div>
                    <div className='msg__date'>
                      <Span
                        text={new Intl.DateTimeFormat('id-ID', {
                          dateStyle: 'full',
                          timeStyle: 'long',
                        }).format(new Date(message.created_at))}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {messagesPag.visible ? (
                <div className='message__nav d-flex justify-content-center'>
                  {!(messagesPag.page + 1 === 1) ? (
                    <span
                      onClick={() => {
                        handleChangePage(0);
                      }}
                    >{`<<`}</span>
                  ) : null}
                  {!(messagesPag.page + 1 === 1) ? (
                    <span
                      onClick={() => {
                        handleChangePage(messagesPag.page - 1);
                      }}
                    >
                      {messagesPag.page}
                    </span>
                  ) : null}
                  {<span>{messagesPag.page + 1}</span>}
                  {!(messagesPag.page + 1 === messagesPag.total_pages) ? (
                    <span
                      onClick={() => {
                        handleChangePage(messagesPag.page + 1);
                      }}
                    >
                      {messagesPag.page + 2}
                    </span>
                  ) : null}
                  {!(messagesPag.page + 1 === messagesPag.total_pages) ? (
                    <span
                      onClick={() => {
                        handleChangePage(messagesPag.total_pages - 1);
                      }}
                    >{`>>`}</span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          <Fade>
            <div className='message__footer d-flex justify-content-center text-center flex-column'>
              <Paragraph
                fontSize={MobileContext.mobile ? '0.875rem' : '2.083vw'}
                text={LangContent.message.footerBody}
              />
              <Paragraph
                fontSize={MobileContext.mobile ? '0.875rem' : '2.083vw'}
                text={`Wassalamu ‘alaikum wr. wb.`}
              />
              <div className='d-flex flex-column'>
                <Paragraph
                  fontSize={MobileContext.mobile ? '0.875rem' : '2.083vw'}
                  text={LangContent.message.footerRegards}
                />
                <Paragraph
                  fontWeight={700}
                  fontSize={` ${MobileContext.mobile ? '2rem' : `5.208vw`}`}
                  text={`UTI & FAISHAL`}
                />
                <Paragraph
                  fontSize={` ${MobileContext.mobile ? '0.75rem' : '1.563vw'}`}
                  text={LangContent.message.footerFamily}
                />
                <div className='row'>
                  <div className='col-5 text-end'>
                    <Paragraph
                      fontSize={` ${
                        MobileContext.mobile ? '0.75rem' : '1.563vw'
                      }`}
                      text={LangContent.message.footerWoman}
                    />
                  </div>
                  <div className='col-2'>
                    <Paragraph
                      fontSize={` ${
                        MobileContext.mobile ? '0.75rem' : '1.563vw'
                      }`}
                      text={`&`}
                    />
                  </div>
                  <div className='col-5 text-start'>
                    <Paragraph
                      fontSize={` ${
                        MobileContext.mobile ? '0.75rem' : '1.563vw'
                      }`}
                      text={LangContent.message.footerMan}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>
      <section
        id='surah'
        className={`surah ${MobileContext.mobile && 'mobile'}`}
      >
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
            src={`${process.env.REACT_APP_FE_CDN}images/surah-background.png`}
            alt=''
          />
        </div>
      </section>
      <footer
        id='footer'
        className={`footer ${MobileContext.mobile && 'mobile'}`}
      >
        <div className='d-flex justify-content-center mb-3'>
          <span>Background Music : Maliq & D'essentials - Menari (2011)</span>
        </div>
        <div className='footer__content d-flex justify-content-center'>
          <span>Powered By</span>
          <span
            onClick={() => {
              window.location.href = 'https://linkedin.com/in/ridaffa';
            }}
          >
            @Ridaffa
          </span>
          <span>
            <img
              height={25}
              src={`${process.env.REACT_APP_FE_CDN}images/logo-kimal.png`}
              alt=''
            />
          </span>
        </div>
        <div className='flower__footer d-flex justify-content-between'>
          <img
            src={`${process.env.REACT_APP_FE_CDN}images/flower-bottom-left.png`}
            alt=''
          />
          <img
            src={`${process.env.REACT_APP_FE_CDN}images/flower-bottom-right.png`}
            alt=''
          />
        </div>
      </footer>
      <ToastContainer />
    </InvitationSection>
  );
}
