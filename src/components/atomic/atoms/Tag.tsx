interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
}

export function Tag({
  children,
  className = '',
  variant = 'default',
}: TagProps) {
  const baseStyles =
    'inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium transition-colors';
  
  const variants = {
    default:
      'bg-slate-100 text-slate-900 dark:bg-gray-800 dark:text-gray-200',
    primary:
      'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-200',
    secondary:
      'bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

