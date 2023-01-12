import { HashLink } from 'react-router-hash-link';
import heartIcon from '../../assets/heart.png';
import dateIcon from '../../assets/date.png';
import mapsIcon from '../../assets/maps.png';
import mailIcon from '../../assets/mail.png';
import giftIcon from '../../assets/gift.png';

import './style.css';
import MobileConsumer from '../../contexts/MobileContext';

export default function Navigation(props: { landingPage: boolean }) {
  const MobileContext = MobileConsumer();
  return (
    <div>
      <div className={`navigation-1 ${MobileContext.mobile ? 'inactive' : ''}`}>
        <ul>
          <li>
            <HashLink
              smooth
              to={props.landingPage ? '/invitation' : '#weddingGift'}
            >
              <div>
                <img src={giftIcon} alt='' />
              </div>
            </HashLink>
          </li>
        </ul>
      </div>
      <div className={`navigation ${MobileContext.mobile ? 'inactive' : ''}`}>
        <ul>
          <li>
            <HashLink smooth to={props.landingPage ? '/invitation' : '#story'}>
              <div>
                <img src={heartIcon} alt='' />
              </div>
            </HashLink>
          </li>
          <li>
            <HashLink smooth to={props.landingPage ? '/invitation' : '#date'}>
              {' '}
              <div>
                <img src={dateIcon} alt='' />
              </div>
            </HashLink>
          </li>{' '}
          <li>
            <HashLink smooth to={props.landingPage ? '/invitation' : '#map'}>
              {' '}
              <div>
                <span>
                  {' '}
                  <img src={mapsIcon} alt='' />
                </span>
              </div>
            </HashLink>
          </li>{' '}
          <li>
            <HashLink
              smooth
              to={props.landingPage ? '/invitation' : '#message'}
            >
              {' '}
              <div>
                <span>
                  {' '}
                  <img src={mailIcon} alt='' />
                </span>
              </div>
            </HashLink>
          </li>{' '}
        </ul>
      </div>
    </div>
  );
}
