const SollotoGradient = ({ addedBy }: { addedBy: string }): JSX.Element => {
  return (
    <div style={{ width: "fit-content" }}>
      <span className="gradientBg gradientBorder">
        <p>{addedBy}</p>
      </span>
    </div>
  );
};

export default SollotoGradient;
