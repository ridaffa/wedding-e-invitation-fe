import { NavLink } from 'react-router-dom';
import heartIcon from '../../assets/heart.png';
import dateIcon from '../../assets/date.png';
import mapsIcon from '../../assets/maps.png';
import mailIcon from '../../assets/mail.png';
import giftIcon from '../../assets/gift.png';

import './style.css';
import MobileConsumer from '../../contexts/MobileContext';

export default function Navigation() {
  const MobileContext = MobileConsumer();
  return (
    <div>
      <div className={`navigation-1 ${MobileContext.mobile ? 'inactive' : ''}`}>
        <ul>
          <li>
            <NavLink to={'/invitation'}>
              <div>
                <img src={giftIcon} alt='' />
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={`navigation ${MobileContext.mobile ? 'inactive' : ''}`}>
        <ul>
          <li>
            <NavLink to={'/invitation'}>
              <div>
                <img src={heartIcon} alt='' />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/invitation'}>
              {' '}
              <div>
                <img src={dateIcon} alt='' />
              </div>
            </NavLink>
          </li>{' '}
          <li>
            <NavLink to={'/invitation'}>
              {' '}
              <div>
                <span>
                  {' '}
                  <img src={mapsIcon} alt='' />
                </span>
              </div>
            </NavLink>
          </li>{' '}
          <li>
            <NavLink to={'/invitation'}>
              {' '}
              <div>
                <span>
                  {' '}
                  <img src={mailIcon} alt='' />
                </span>
              </div>
            </NavLink>
          </li>{' '}
        </ul>
      </div>
    </div>
  );
}
