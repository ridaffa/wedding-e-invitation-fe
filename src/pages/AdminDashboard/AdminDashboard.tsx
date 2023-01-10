import './style.scss';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { IGuest } from '../../interfaces/GuestInterface';
import { useNavigate } from 'react-router-dom';
import editPng from '../../assets/edit.png';
import { toast, ToastContainer } from 'react-toastify';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [guests, setGuests] = useState<IGuest[]>([]);
  const [updateGuest, setUpdateGuest] = useState<IGuest>({} as IGuest);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const fetchGuest = () => {
    fetch(`${process.env.REACT_APP_BE_URL}guests/search`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((rs) => {
        if (!rs.ok) {
          removeCookie('token', { path: '/' });
          navigate('/admin');
          return;
        }
        return rs?.json();
      })
      .then((data) => {
        setGuests(data?.data?.items);
      });
  };
  useEffect(() => {
    fetchGuest();
  }, [cookies.token]);
  const handleLogout = () => {
    removeCookie('token', { path: '/' });
    navigate('/admin');
  };
  const handleClickEdit = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const parentKey = e.currentTarget?.parentElement?.parentElement?.id;
    if (parentKey) {
      const guest = guests.find((guest) => guest.id === parseInt(parentKey));
      setUpdateGuest(guest as IGuest);
    }
  };
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateGuest({ ...updateGuest, [e.target.id]: e.target.value });
  };
  const handleUpdate = () => {
    fetch(`${process.env.REACT_APP_BE_URL}guests/${updateGuest.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify(updateGuest),
    })
      .then((rs) => {
        if (!rs.ok) {
          toast.error('update error');
          return;
        }
        toast.success('update success');
        setUpdateGuest({} as IGuest);
        return;
      })
      .catch(() => {
        toast.error('update error');
        return;
      });
  };
  const handleCancelUpdate = () => {
    setUpdateGuest({} as IGuest);
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const parentKey = e.currentTarget?.parentElement?.parentElement?.id;
    fetch(`${process.env.REACT_APP_BE_URL}guests/${parentKey}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((rs) => {
        if (!rs.ok) {
          toast.error('delete error');
          return;
        }
        toast.success('delete success');
        fetchGuest();
        return;
      })
      .catch(() => {
        toast.error('delete error');
        return;
      });
  };

  return (
    <div>
      <nav className='navbar navbar-expand-lg bg-light'>
        <div className='container-fluid'>
          <span className='navbar-brand'>Admin Page</span>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarText'
            aria-controls='navbarText'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarText'>
            <ul className='navbar-text navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item me-2'>
                <button className='btn btn-dark' onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className='ftco-section'>
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='col-md-6 text-center mb-5'>
              <h2 className='heading-section'>Guest List</h2>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className='table-wrap'>
                <table className='table table-responsive-xl'>
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                      <th>Visit</th>
                      <th>URL</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map((guest) => (
                      <tr id={String(guest.id)} key={guest.id}>
                        <td>
                          {updateGuest.id === guest.id ? (
                            <div className='d-flex flex-row'>
                              <button
                                className='btn btn-primary me-2'
                                onClick={handleUpdate}
                              >
                                Save
                              </button>
                              <button
                                className='btn btn-danger'
                                onClick={handleCancelUpdate}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <span
                              className='icon-edit'
                              onClick={handleClickEdit}
                            >
                              <img
                                width={15}
                                height={15}
                                src={editPng}
                                alt=''
                              />
                            </span>
                          )}
                        </td>
                        <td>
                          {updateGuest.id === guest.id ? (
                            <input
                              type='text'
                              value={updateGuest.fullname}
                              id='fullname'
                              onChange={changeInput}
                            ></input>
                          ) : (
                            <span>{guest.fullname}</span>
                          )}
                        </td>
                        <td>
                          {updateGuest.id === guest.id ? (
                            <input
                              type='text'
                              value={updateGuest.email}
                              id='email'
                              onChange={changeInput}
                            ></input>
                          ) : (
                            <span>{guest.email}</span>
                          )}
                        </td>
                        <td>
                          {updateGuest.id === guest.id ? (
                            <input
                              type='text'
                              value={updateGuest.phone_number}
                              id='phone_number'
                              onChange={changeInput}
                            ></input>
                          ) : (
                            <span>{guest.phone_number}</span>
                          )}
                        </td>
                        <td>
                          {updateGuest.id === guest.id ? (
                            <input
                              type='text'
                              value={updateGuest.address}
                              id='address'
                              onChange={changeInput}
                            ></input>
                          ) : (
                            <span>{guest.address}</span>
                          )}
                        </td>
                        <td className='status'>
                          <span className={guest.visit ? 'active' : 'inactive'}>
                            {guest.visit ? 'yes' : 'no'}
                          </span>
                        </td>
                        <td>
                          <span>
                            {process.env.REACT_APP_FE_URL}landing-page/
                            {guest.uuid}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={handleDelete}
                            className='btn btn-dark'
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
