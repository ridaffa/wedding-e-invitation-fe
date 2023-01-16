import './style.css';
import LandingSection from '../../components/LandingSection';
import LandingBody from '../../components/LandingBody/intex';
import LangMusic from '../../components/LangMusic';
import LangIcon from '../../components/LangIcon';
import MusicIcon from '../../components/MusicIcon';
import MobileConsumer from '../../contexts/MobileContext';
import Navigation from '../../components/Navigation';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IGuest } from '../../interfaces/GuestInterface';
export default function LandingPage() {
  const MobileContext = MobileConsumer();
  const navigate = useNavigate();

  const { uuid } = useParams();
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
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BE_URL}guests/${uuid}`)
      .then((rs) => {
        if (!rs.ok) {
          navigate('/');
          return;
        }
        rs.json().then((data) => {
          setGuest(data.data);
          localStorage.setItem('guest', JSON.stringify(data.data));
        });
      })
      .catch(() => {
        navigate('/');
        return;
      });
  }, [uuid]);
  return (
    <LandingSection>
      <div
        className={`${
          MobileContext.mobile ? 'landing-components-inactive' : ''
        }`}
      >
        <LangMusic>
          <LangIcon></LangIcon>
          <MusicIcon></MusicIcon>
        </LangMusic>
      </div>
      <LandingBody></LandingBody>
      <Navigation landingPage={true}></Navigation>
    </LandingSection>
  );
}
