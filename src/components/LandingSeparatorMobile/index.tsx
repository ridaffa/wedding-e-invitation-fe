import './style.css';

export default function LandingSeparator(props: {
  height?: string;
  borderColor?: string;
}) {
  return (
    <div
      style={{ height: props.height, borderColor: props.borderColor }}
      className={`landing-separator`}
    />
  );
}
