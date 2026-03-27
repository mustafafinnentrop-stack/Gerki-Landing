interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-surface/50 sticky top-0 z-10">
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground leading-tight">Max Mustermann</p>
          <p className="text-xs text-muted">max@mustermann.de</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
          <span className="text-primary font-semibold text-sm">M</span>
        </div>
      </div>
    </header>
  );
}
