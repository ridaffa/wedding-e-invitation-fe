import { Fade } from 'react-awesome-reveal';

export default function SubHeadingText(props: {
  text: string;
  fontWeight?: number;
  fontSize?: string;
}) {
  return (
    <div>
      <Fade key={props.text}>
        <p style={{ fontWeight: props.fontWeight, fontSize: props.fontSize }}>
          {props.text}
        </p>
      </Fade>
    </div>
  );
}
