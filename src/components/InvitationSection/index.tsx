import './style.css';

export default function InvitationSection(props: {
  children: React.ReactNode;
}) {
  return <div className='invitation-section'>{props.children}</div>;
}
