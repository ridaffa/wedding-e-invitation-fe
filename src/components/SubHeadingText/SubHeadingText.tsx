export default function SubHeadingText(props: {
  text: string;
  fontWeight?: number;
  fontSize?: string;
}) {
  return (
    <div>
      <p style={{ fontWeight: props.fontWeight, fontSize: props.fontSize }}>
        {props.text}
      </p>
    </div>
  );
}
