import CreditsWidget from '../CreditsWidget';

export default function CreditsWidgetExample() {
  return (
    <div className="p-8 max-w-md">
      <CreditsWidget
        currentCredits={12}
        onBuyCredits={() => console.log('Buy credits')}
        onSkipQueue={() => console.log('Skip queue')}
      />
    </div>
  );
}
