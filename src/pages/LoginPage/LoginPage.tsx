import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { IUser } from '../../interfaces/UserInterface';

export default function LoginPage() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
  useEffect(() => {
    cookies.token && navigate('/admin/dashboard');
  }, [cookies.token, navigate]);

  const [user, setUser] = useState<IUser>({
    username: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BE_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((rs) => {
      if (!rs.ok) {
        toast.error('login error');
        return;
      }
      rs.json().then((data) => {
        setCookie('token', data.data, { path: '/' });
        toast.success('login success');
      });
    });
  };
  return (
    <>
      <section className='ftco-section'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-7 col-lg-5'>
              <div className='wrap'>
                <div className='login-wrap p-4 p-md-5'>
                  <div className='d-flex'>
                    <div className='w-100'>
                      <h3 className='mb-4'>Sign In</h3>
                    </div>
                    <div className='w-100'>
                      <p className='social-media d-flex justify-content-end'></p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className='signin-form'>
                    <div className='form-group mt-3'>
                      <input
                        onChange={handleChange}
                        id='username'
                        type='text'
                        className='form-control'
                        placeholder='Username'
                        required
                      ></input>
                    </div>
                    <div className='form-group  mt-3'>
                      <input
                        id='password'
                        type='password'
                        className='form-control'
                        placeholder='Password'
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='form-group  mt-3'>
                      <button
                        type='submit'
                        className='form-control btn btn-primary rounded submit px-3'
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}
