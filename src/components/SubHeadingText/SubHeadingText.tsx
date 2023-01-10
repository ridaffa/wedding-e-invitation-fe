export default function SubHeadingText(props: {
  text: string;
  fontWeight?: number;
  fontSize?: string;
}) {
  return (
    <div>
      <h2 style={{ fontWeight: props.fontWeight, fontSize: props.fontSize }}>
        {props.text}
      </h2>
    </div>
  );
}
