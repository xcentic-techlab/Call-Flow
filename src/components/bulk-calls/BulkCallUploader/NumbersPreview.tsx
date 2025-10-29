interface NumbersPreviewProps {
  phoneNumbers: string[];
}

export const NumbersPreview = ({ phoneNumbers }: NumbersPreviewProps) => {
  if (phoneNumbers.length === 0) return null;

  return (
    <div className="text-sm text-muted-foreground">
      <p>Numbers loaded: {phoneNumbers.length}</p>
      <p className="text-xs mt-1">First number: +91{phoneNumbers[0]}</p>
    </div>
  );
};
