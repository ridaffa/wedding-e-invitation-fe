import './style.scss';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { utils, writeFile } from 'xlsx';

import { ICreateGuest, IGuest } from '../../interfaces/GuestInterface';
import { useNavigate } from 'react-router-dom';
import editPng from '../../assets/edit.png';
import { toast, ToastContainer } from 'react-toastify';
import {
  IPagination,
  IPaginationRes,
} from '../../interfaces/PaginationInterface';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [guests, setGuests] = useState<IGuest[]>([]);
  const [guestReq, setGuestReq] = useState<IPagination>({
    page: 0,
    size: 10,
  } as IPagination);
  const [guestsPag, setGuestsPag] = useState<IPaginationRes>(
    {} as IPaginationRes
  );

  const handleChangePage = (page: number) => {
    setGuestReq({ ...guestReq, page: page });
  };

  const downloadExcel = () => {
    fetch(`${process.env.REACT_APP_BE_URL}guests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(async (rs) => {
        const d = await rs.json();
        const data = d?.data;
        const allData: IGuest[] = data.map((d: IGuest, i: number) => {
          return {
            no: i + 1,
            fullname: d.fullname,
            email: d.email,
            phone_number: d.phone_number,
            address: d.address,
            url: `${process.env.REACT_APP_FE_URL}landing-page/${d.uuid}`,
            visit: d.visit,
          };
        });
        const worksheet = utils.json_to_sheet(allData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        writeFile(workbook, 'guest_list.xlsx');
        return;
      })
      .catch(() => {
        toast.error('error downloading data');
        return;
      });
  };
  const [updateGuest, setUpdateGuest] = useState<IGuest>({} as IGuest);
  const [createGuest, setCreateGuest] = useState<ICreateGuest>(
    {} as ICreateGuest
  );

  const cookies = useCookies(['token'])[0];
  const removeCookie = useCookies(['token'])[2];
  const fetchGuest = () => {
    fetch(
      `${process.env.REACT_APP_BE_URL}guests/search?page=${guestReq.page}&size=${guestReq.size}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((rs) => {
        if (!rs.ok) {
          removeCookie('token', { path: '/' });
          navigate('/admin');
          return;
        }
        return rs?.json();
      })
      .then((data) => {
        setGuestsPag(data?.data);
        setGuests(data?.data?.items);
      });
  };
  useEffect(() => {
    fetchGuest();
  }, [cookies.token, guestReq]);
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
  const handleInputCreate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateGuest({ ...createGuest, [e.target.id]: e.target.value });
  };
  const handleCancelCreate = () => {
    setCreateGuest({} as ICreateGuest);
  };
  const handleCreateGuest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BE_URL}guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify(createGuest),
    })
      .then((rs) => {
        if (!rs.ok) {
          toast.error('create error');
          return;
        }
        toast.success('create success');
        setCreateGuest({} as ICreateGuest);
        fetchGuest();
        document
          .getElementById('createModal')
          ?.classList.remove('show', 'd-block');
        return;
      })
      .catch(() => {
        toast.error('create error');
        return;
      });
    e.currentTarget.reset();
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
          <div className='row justify-content-start'>
            <div className='col-md-6 text-start mb-5'>
              <button
                className='btn btn-danger'
                onClick={() => {
                  downloadExcel();
                }}
              >
                Download All Guest
              </button>
            </div>
          </div>
          <div className='row justify-content-start'>
            <div className='col-md-6 text-start mb-5'>
              <button
                className='btn btn-primary'
                data-bs-toggle='modal'
                data-bs-target='#createModal'
              >
                Create
              </button>
            </div>
          </div>
          <div id='createModal' className='modal'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Create Guest</h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <form onSubmit={handleCreateGuest}>
                  <div className='modal-body'>
                    <input
                      id='fullname'
                      type='text'
                      placeholder='Full Name'
                      className='form-control mb-2'
                      onChange={handleInputCreate}
                      defaultValue={createGuest.fullname}
                      required
                    />
                    <input
                      id='email'
                      type={'email'}
                      placeholder='Email'
                      onChange={handleInputCreate}
                      className='form-control mb-2'
                    />
                    <input
                      id='phone_number'
                      type='text'
                      placeholder='Phone Number'
                      onChange={handleInputCreate}
                      className='form-control mb-2'
                    />
                    <input
                      id='address'
                      type='text'
                      placeholder='Address'
                      onChange={handleInputCreate}
                      className='form-control'
                    />
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-bs-dismiss='modal'
                      onClick={handleCancelCreate}
                    >
                      Close
                    </button>
                    <button
                      data-bs-dismiss='modal'
                      type='submit'
                      className='btn btn-primary'
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
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
          <div className='row'>
            {guestsPag.visible ? (
              <div className='message__nav d-flex justify-content-center'>
                {!(guestsPag.page + 1 === 1) ? (
                  <span
                    onClick={() => {
                      handleChangePage(0);
                    }}
                  >{`<<`}</span>
                ) : null}
                {!(guestsPag.page + 1 === 1) ? (
                  <span
                    onClick={() => {
                      handleChangePage(guestsPag.page - 1);
                    }}
                  >
                    {guestsPag.page}
                  </span>
                ) : null}
                {<span>{guestsPag.page + 1}</span>}
                {!(guestsPag.page + 1 === guestsPag.total_pages) ? (
                  <span
                    onClick={() => {
                      handleChangePage(guestsPag.page + 1);
                    }}
                  >
                    {guestsPag.page + 2}
                  </span>
                ) : null}
                {!(guestsPag.page + 1 === guestsPag.total_pages) ? (
                  <span
                    onClick={() => {
                      handleChangePage(guestsPag.total_pages - 1);
                    }}
                  >{`>>`}</span>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
