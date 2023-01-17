import { Fade } from 'react-awesome-reveal';
import './style.scss';

export default function Paragraph(props: {
  text: string;
  fontWeight?: number;
  fontSize?: string;
}) {
  return (
    <Fade key={props.text}>
      <p
        key={props.text}
        style={{
          fontWeight: props.fontWeight,
          fontSize: props.fontSize,
        }}
      >
        {props.text}
      </p>
    </Fade>
  );
}
