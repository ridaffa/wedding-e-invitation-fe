export default function Span(props: {
  text: string;
  fontWeight?: number;
  fontSize?: string;
  id?: string;
}) {
  return (
    <span
      id={props.id}
      style={{ fontWeight: props.fontWeight, fontSize: props.fontSize }}
    >
      {props.text}
    </span>
  );
}
