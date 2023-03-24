import { Fade } from 'react-awesome-reveal';

export default function Span(props: {
  text: string;
  fontWeight?: number;
  fontSize?: string;
  underline?: boolean;
  id?: string;
}) {
  return (
    <Fade key={props.text}>
      <span
        id={props.id}
        style={{
          fontWeight: props.fontWeight,
          fontSize: props.fontSize,
          textDecoration: props.underline ? 'underline' : 'none',
        }}
      >
        {props.text}
      </span>
    </Fade>
  );
}
