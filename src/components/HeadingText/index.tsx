import { Fade } from 'react-awesome-reveal';

export default function HeadingText(props: {
  text: string;
  fontWeight?: number;
  fontSize?: string;
}) {
  return (
    <div>
      <Fade key={props.text}>
        <h1 style={{ fontWeight: props.fontWeight, fontSize: props.fontSize }}>
          {props.text}
        </h1>
      </Fade>
    </div>
  );
}
