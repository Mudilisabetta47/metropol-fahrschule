import { useState, useEffect, useCallback } from "react";

function generateChallenge() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { a, b, answer: a + b };
}

interface MathCaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

const MathCaptcha = ({ onVerify, onExpire }: MathCaptchaProps) => {
  const [challenge, setChallenge] = useState(generateChallenge);
  const [input, setInput] = useState("");
  const [verified, setVerified] = useState(false);

  const refresh = useCallback(() => {
    setChallenge(generateChallenge());
    setInput("");
    setVerified(false);
    onExpire?.();
  }, [onExpire]);

  useEffect(() => {
    if (input && parseInt(input, 10) === challenge.answer) {
      setVerified(true);
      // Simple token: base64 of answer + timestamp to verify server-side
      const token = btoa(JSON.stringify({ a: challenge.a, b: challenge.b, answer: challenge.answer, t: Date.now() }));
      onVerify(token);
    } else if (verified) {
      setVerified(false);
      onExpire?.();
    }
  }, [input, challenge, onVerify, onExpire, verified]);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-accent/30 px-4 py-3">
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        Was ist {challenge.a} + {challenge.b}?
      </span>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-16 rounded-lg border border-border bg-background px-3 py-1.5 text-center text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-primary/30"
        placeholder="?"
      />
      {verified && <span className="text-primary text-sm font-bold">✓</span>}
      {!verified && input && parseInt(input, 10) !== challenge.answer && (
        <span className="text-destructive text-xs">Falsch</span>
      )}
      <button type="button" onClick={refresh} className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors" title="Neue Aufgabe">
        ↻
      </button>
    </div>
  );
};

export default MathCaptcha;
