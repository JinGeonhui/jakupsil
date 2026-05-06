interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({
  children,
  className = '',
}: PageContainerProps) {
  return (
    <div
      className={`max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8 ${className}`}
    >
      {children}
    </div>
  );
}
