export default function Paragraph(props: {
  text: string;
  fontWeight?: number;
  fontSize?: string;
}) {
  return (
    <p style={{ fontWeight: props.fontWeight, fontSize: props.fontSize }}>
      {props.text}
    </p>
  );
}
