export default function HeadingText(props: {
  text: string;
  fontWeight?: number;
  fontSize?: string;
}) {
  return (
    <div>
      <h1 style={{ fontWeight: props.fontWeight, fontSize: props.fontSize }}>
        {props.text}
      </h1>
    </div>
  );
}
