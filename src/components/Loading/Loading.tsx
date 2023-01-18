import './style.scss';

export default function Loading() {
  return (
    <div className='preloader'>
      <div className='loading'>
        <div className='spinner-border' role='status'></div>
      </div>
    </div>
  );
}
